import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Line } from '@react-three/drei'
import { COLORS, lerp, quadraticBezierPoint } from '../../utils/threeHelpers'

// 베지어 커브 포인트 생성
function createCurvePoints(start, end, segments = 32) {
  const points = []
  // 중간점 (곡선 정도 조절)
  const mid = [
    (start[0] + end[0]) / 2 + (Math.random() - 0.5) * 1.5,
    (start[1] + end[1]) / 2 + (Math.random() - 0.5) * 1.5,
    (start[2] + end[2]) / 2 + (Math.random() - 0.5) * 1.5,
  ]

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const point = quadraticBezierPoint(t, start, mid, end)
    points.push(new THREE.Vector3(...point))
  }

  return points
}

// 개별 연결선 컴포넌트
function Edge({ edge, scrollProgress }) {
  const lineRef = useRef()
  const particleRef = useRef()

  // 커브 포인트 생성
  const curvePoints = useMemo(() => {
    return createCurvePoints(edge.start, edge.end, edge.isHubConnection ? 48 : 32)
  }, [edge.start, edge.end, edge.isHubConnection])

  // 색상 결정
  const color = useMemo(() => {
    if (edge.isHubConnection) {
      return '#D98BA3' // Secondary 색상
    }
    return '#6B2D4A' // Primary 색상
  }, [edge.isHubConnection])

  // 파티클 위치 (연결선 위를 움직이는 데이터 흐름)
  const particlePosition = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    if (particleRef.current && curvePoints.length > 0) {
      // 파티클이 라인을 따라 이동
      const time = state.clock.elapsedTime
      const speed = edge.isHubConnection ? 0.3 : 0.5
      const t = ((time * speed) % 1)
      const index = Math.floor(t * (curvePoints.length - 1))
      const nextIndex = Math.min(index + 1, curvePoints.length - 1)
      const localT = (t * (curvePoints.length - 1)) % 1

      particlePosition.lerpVectors(curvePoints[index], curvePoints[nextIndex], localT)
      particleRef.current.position.copy(particlePosition)

      state.invalidate()
    }
  })

  // 스크롤에 따른 투명도
  const opacity = useMemo(() => {
    return lerp(0.6, 0.2, scrollProgress)
  }, [scrollProgress])

  return (
    <group>
      {/* 메인 연결선 */}
      <Line
        ref={lineRef}
        points={curvePoints}
        color={color}
        lineWidth={edge.isHubConnection ? 1.5 : 1}
        transparent
        opacity={opacity}
      />

      {/* 글로우 연결선 */}
      <Line
        points={curvePoints}
        color={color}
        lineWidth={edge.isHubConnection ? 4 : 3}
        transparent
        opacity={opacity * 0.3}
      />

      {/* 데이터 흐름 파티클 */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial
          color={edge.isHubConnection ? COLORS.accent : COLORS.secondary}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}

// 연결선 컨테이너
export default function Edges({ edges, scrollProgress }) {
  return (
    <group>
      {edges.map((edge) => (
        <Edge
          key={edge.id}
          edge={edge}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  )
}
