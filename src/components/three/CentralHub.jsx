import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Text, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { COLORS, lerp } from '../../utils/threeHelpers'

export default function CentralHub({ scrollProgress = 0 }) {
  const groupRef = useRef()
  const innerSphereRef = useRef()
  const outerSphereRef = useRef()
  const pulseRef = useRef()

  // 색상
  const primaryColor = useMemo(() => new THREE.Color(COLORS.primary), [])
  const secondaryColor = useMemo(() => new THREE.Color(COLORS.secondary), [])
  const accentColor = useMemo(() => new THREE.Color(COLORS.accent), [])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // 전체 그룹 회전
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
    }

    // 내부 구체 회전
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y += 0.01
      innerSphereRef.current.rotation.z += 0.005
    }

    // 펄스 애니메이션 (심장박동 효과)
    if (pulseRef.current) {
      const pulse = 1 + Math.sin(time * 2) * 0.1
      pulseRef.current.scale.setScalar(pulse)
    }

    // 스크롤에 따른 스케일
    if (groupRef.current) {
      const targetScale = lerp(1, 1.5, scrollProgress)
      groupRef.current.scale.x = lerp(groupRef.current.scale.x, targetScale, 0.05)
      groupRef.current.scale.y = lerp(groupRef.current.scale.y, targetScale, 0.05)
      groupRef.current.scale.z = lerp(groupRef.current.scale.z, targetScale, 0.05)
    }

    state.invalidate()
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 외부 투명 구체 */}
      <Sphere ref={outerSphereRef} args={[1.2, 64, 64]}>
        <meshPhysicalMaterial
          color={primaryColor}
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* 중간 와이어프레임 */}
      <Sphere args={[1, 32, 32]}>
        <meshBasicMaterial
          color={secondaryColor}
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* 내부 핵심 구체 */}
      <Sphere ref={innerSphereRef} args={[0.6, 32, 32]}>
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.3}
        />
      </Sphere>

      {/* 펄스 글로우 */}
      <group ref={pulseRef}>
        <Sphere args={[0.8, 16, 16]}>
          <meshBasicMaterial
            color={secondaryColor}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </Sphere>
      </group>

      {/* 궤도 링 1 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshBasicMaterial
          color={primaryColor}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* 궤도 링 2 */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.3, 0.015, 16, 64]} />
        <meshBasicMaterial
          color={secondaryColor}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* 궤도 링 3 */}
      <mesh rotation={[Math.PI / 4, -Math.PI / 3, 0]}>
        <torusGeometry args={[1.1, 0.01, 16, 64]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 중앙 텍스트 "공존" - 시스템 폰트 사용 */}
      <Text
        position={[0, 0, 0.65]}
        fontSize={0.25}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#6B2D4A"
      >
        공존
      </Text>

      {/* 4개의 가치 마커 */}
      {[
        { angle: 0, label: '연결', color: COLORS.primary },
        { angle: Math.PI / 2, label: '공존', color: COLORS.secondary },
        { angle: Math.PI, label: '소통', color: COLORS.accent },
        { angle: (3 * Math.PI) / 2, label: '포용', color: COLORS.primary },
      ].map((marker, i) => (
        <group
          key={i}
          position={[
            Math.cos(marker.angle) * 1.5,
            0,
            Math.sin(marker.angle) * 1.5,
          ]}
        >
          <RoundedBox args={[0.15, 0.15, 0.15]} radius={0.03} smoothness={4}>
            <meshStandardMaterial
              color={marker.color}
              emissive={marker.color}
              emissiveIntensity={0.3}
            />
          </RoundedBox>
        </group>
      ))}
    </group>
  )
}
