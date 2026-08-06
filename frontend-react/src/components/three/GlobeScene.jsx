import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GLOBE_RADIUS = 1.6

// Juba first (the highlighted hub), then a handful of other African cities —
// purely illustrative reach markers, not a claim of physical offices there.
const CITIES = [
  { name: 'Juba', lat: 4.85, lon: 31.6, hub: true },
  { name: 'Nairobi', lat: -1.29, lon: 36.8 },
  { name: 'Kampala', lat: 0.35, lon: 32.6 },
  { name: 'Addis Ababa', lat: 9.03, lon: 38.7 },
  { name: 'Kinshasa', lat: -4.32, lon: 15.3 },
  { name: 'Cairo', lat: 30.04, lon: 31.2 },
]

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

// A great-circle-ish arc between two points on the globe's surface, lifted
// outward at its midpoint so it reads as a "flight path" rather than a chord
// cutting through the sphere's interior.
function arcPoints(a, b, segments = 48) {
  const mid = a.clone().add(b).multiplyScalar(0.5)
  mid.normalize().multiplyScalar(GLOBE_RADIUS * 1.35)
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
  return curve.getPoints(segments)
}

function Globe() {
  const groupRef = useRef(null)

  const { hubVec, markers, arcs } = useMemo(() => {
    const positioned = CITIES.map(c => ({ ...c, vec: latLonToVector3(c.lat, c.lon, GLOBE_RADIUS) }))
    const hub = positioned.find(c => c.hub)
    const arcs = positioned.filter(c => !c.hub).map(c => arcPoints(hub.vec, c.vec))
    return { hubVec: hub.vec, markers: positioned, arcs }
  }, [])

  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return
    g.rotation.y += delta * 0.12
    g.rotation.x += (state.pointer.y * 0.15 - g.rotation.x) * 0.02
  })

  return (
    <group ref={groupRef}>
      {/* Wireframe globe */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 24, 18]} />
        <meshBasicMaterial color="#233D4D" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Reach arcs from Juba to each marker city */}
      {arcs.map((points, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#233D4D" transparent opacity={0.55} />
        </line>
      ))}

      {/* City markers */}
      {markers.map(({ name, vec, hub }) => (
        <mesh key={name} position={vec}>
          <sphereGeometry args={[hub ? 0.05 : 0.03, 12, 12]} />
          <meshBasicMaterial color={hub ? '#FE7F2D' : '#233D4D'} />
        </mesh>
      ))}

      {/* Juba glow halo */}
      <mesh position={hubVec}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color="#FE7F2D" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <Globe />
      </Suspense>
    </Canvas>
  )
}
