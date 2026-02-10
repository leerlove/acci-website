import { useRef, useState, useCallback, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { getNodeColor, getNodeSize, lerp, NODE_TYPES } from '../../utils/threeHelpers'

// 개별 노드 컴포넌트
function Node({ node, scrollProgress, onHover }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const color = useMemo(() => new THREE.Color(getNodeColor(node.type)), [node.type])
  const baseSize = useMemo(() => getNodeSize(node.type), [node.type])

  // 스크롤에 따른 위치 변화
  const targetPosition = useMemo(() => {
    const factor = scrollProgress
    // 스크롤 시 중앙으로 응집
    return [
      lerp(node.position[0], node.position[0] * 0.3, factor),
      lerp(node.position[1], node.position[1] * 0.3, factor),
      lerp(node.position[2], node.position[2] * 0.3, factor),
    ]
  }, [node.position, scrollProgress])

  useFrame((state) => {
    if (!meshRef.current) return

    // 부드러운 위치 이동
    meshRef.current.position.x = lerp(meshRef.current.position.x, targetPosition[0], 0.05)
    meshRef.current.position.y = lerp(meshRef.current.position.y, targetPosition[1], 0.05)
    meshRef.current.position.z = lerp(meshRef.current.position.z, targetPosition[2], 0.05)

    // 호버 시 크기 변화
    const targetScale = hovered ? 1.5 : 1
    meshRef.current.scale.x = lerp(meshRef.current.scale.x, targetScale, 0.1)
    meshRef.current.scale.y = lerp(meshRef.current.scale.y, targetScale, 0.1)
    meshRef.current.scale.z = lerp(meshRef.current.scale.z, targetScale, 0.1)

    // 미세한 부유 애니메이션
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime + node.id) * 0.002

    // 프레임 레이트 요청
    state.invalidate()
  })

  const handlePointerOver = useCallback((e) => {
    e.stopPropagation()
    setHovered(true)
    onHover?.(node)
    document.body.style.cursor = 'pointer'
  }, [node, onHover])

  const handlePointerOut = useCallback(() => {
    setHovered(false)
    onHover?.(null)
    document.body.style.cursor = 'auto'
  }, [onHover])

  return (
    <group ref={meshRef} position={node.position}>
      {/* 메인 구체 */}
      <Sphere args={[baseSize, 32, 32]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          roughness={0.3}
          metalness={node.type === NODE_TYPES.ROBOT ? 0.8 : 0.1}
        />
      </Sphere>

      {/* 글로우 효과 */}
      <Sphere args={[baseSize * 1.2, 16, 16]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.3 : 0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* 호버 인터랙션 영역 */}
      <Sphere
        args={[baseSize * 1.5, 8, 8]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => {
          e.stopPropagation()
          setClicked(!clicked)
        }}
      >
        <meshBasicMaterial visible={false} />
      </Sphere>

      {/* 툴팁 */}
      {hovered && (
        <Html
          position={[0, baseSize + 0.5, 0]}
          center
          distanceFactor={10}
          style={{
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#6B2D4A',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {node.label}
          </div>
        </Html>
      )}
    </group>
  )
}

// 노드 컨테이너
export default function Nodes({ nodes, scrollProgress }) {
  const [HoveredNode, setHoveredNode] = useState(null)
  // HoveredNode can be used for future tooltip/highlight features
  void HoveredNode

  return (
    <group>
      {nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          scrollProgress={scrollProgress}
          onHover={setHoveredNode}
        />
      ))}
    </group>
  )
}
