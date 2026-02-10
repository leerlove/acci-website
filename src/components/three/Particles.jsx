import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COLORS } from '../../utils/threeHelpers'

// 시드 기반 난수 생성기
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// 컴포넌트 외부에서 초기 데이터 생성
function createParticleData(count, seed = 12345) {
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  const colorPalette = [
    new THREE.Color(COLORS.primary),
    new THREE.Color(COLORS.secondary),
    new THREE.Color(COLORS.accent),
    new THREE.Color(COLORS.white),
  ]

  for (let i = 0; i < count; i++) {
    const s = seed + i * 7
    const radius = 8 + seededRandom(s) * 12
    const theta = seededRandom(s + 1) * Math.PI * 2
    const phi = Math.acos(2 * seededRandom(s + 2) - 1)

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    velocities[i * 3] = (seededRandom(s + 3) - 0.5) * 0.01
    velocities[i * 3 + 1] = (seededRandom(s + 4) - 0.5) * 0.01
    velocities[i * 3 + 2] = (seededRandom(s + 5) - 0.5) * 0.01

    const color = colorPalette[Math.floor(seededRandom(s + 6) * colorPalette.length)]
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    sizes[i] = seededRandom(s + 7) * 3 + 1
  }

  return { positions, velocities, colors, sizes }
}

export default function Particles({ count = 500, mousePosition = { x: 0, y: 0 } }) {
  const pointsRef = useRef()

  // useMemo를 사용하여 초기 데이터 생성 (순수 함수 사용)
  const particleData = useMemo(() => createParticleData(count), [count])
  const velocitiesRef = useRef(particleData.velocities)

  useFrame((state) => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const idx = i * 3

      positions[idx] += velocitiesRef.current[idx]
      positions[idx + 1] += velocitiesRef.current[idx + 1]
      positions[idx + 2] += velocitiesRef.current[idx + 2]

      positions[idx] += mousePosition.x * 0.001
      positions[idx + 1] += mousePosition.y * 0.001

      positions[idx + 1] += Math.sin(time * 0.5 + i * 0.1) * 0.002

      const dist = Math.sqrt(
        positions[idx] ** 2 +
        positions[idx + 1] ** 2 +
        positions[idx + 2] ** 2
      )

      if (dist > 20 || dist < 3) {
        velocitiesRef.current[idx] *= -1
        velocitiesRef.current[idx + 1] *= -1
        velocitiesRef.current[idx + 2] *= -1
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    state.invalidate()
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particleData.positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particleData.colors}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={particleData.sizes}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
