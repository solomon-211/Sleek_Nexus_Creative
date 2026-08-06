import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 32
const RADIUS = 1.8
const CONNECT_DIST = 1.1

// Random point inside a sphere, uniformly distributed by volume (not just on
// the surface) — cube-root of a random radius avoids the center-clustering
// bias a naive `Math.random() * RADIUS` would produce.
function randomPointInSphere(radius) {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  const r = radius * Math.cbrt(Math.random())
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi)
  )
}

// Connected node network — literally visualizes "Nexus" (connection, ecosystem)
// as a set of glowing nodes joined by lines wherever two nodes land close
// enough together, slowly rotating with a soft mouse-parallax tilt. Node
// positions are generated once (useMemo); only the rigid group rotates per
// frame, so this stays cheap regardless of node count.
function NetworkField() {
  const groupRef = useRef(null)

  const { pointsGeometry, linesGeometry } = useMemo(() => {
    const nodes = Array.from({ length: NODE_COUNT }, () => randomPointInSphere(RADIUS))

    const pointsGeometry = new THREE.BufferGeometry().setFromPoints(nodes)

    const linePositions = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECT_DIST) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }
    const linesGeometry = new THREE.BufferGeometry()
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

    return { pointsGeometry, linesGeometry }
  }, [])

  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return
    g.rotation.y += delta * 0.09
    g.rotation.x += (state.pointer.y * 0.2 - g.rotation.x) * 0.02
    g.rotation.z += (state.pointer.x * 0.1 - g.rotation.z) * 0.02
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="#FE7F2D" transparent opacity={0.35} />
      </lineSegments>
      <points geometry={pointsGeometry}>
        <pointsMaterial color="#FE7F2D" size={0.06} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <NetworkField />
      </Suspense>
    </Canvas>
  )
}
