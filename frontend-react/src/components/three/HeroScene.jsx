import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

// Abstract wireframe accent — two nested icosahedra slowly counter-rotating,
// with a soft mouse-parallax tilt. Purely decorative brand texture behind the
// hero card; no interaction target, no text, nothing a screen reader needs.
function RotatingShape() {
  const groupRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return
    g.rotation.y += delta * 0.18
    g.rotation.x += delta * 0.06

    target.current.x = (state.pointer.y * 0.15)
    target.current.y = (state.pointer.x * 0.2)
    g.rotation.x += (target.current.x - g.rotation.x) * 0.02
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color="#FE7F2D" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[0.4, 0.4, 0]} scale={0.55}>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color="#FE9957" wireframe transparent opacity={0.4} />
      </mesh>
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
        <RotatingShape />
      </Suspense>
    </Canvas>
  )
}
