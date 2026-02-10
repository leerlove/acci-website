import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useMemo, useState, useEffect } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Nodes from './Nodes'
import Edges from './Edges'
import CentralHub from './CentralHub'
import Particles from './Particles'
import { NODE_TYPES, randomSpherePoint, isMobile } from '../../utils/threeHelpers'

// 노드 데이터 생성
const generateNodes = (count) => {
  const types = [NODE_TYPES.HUMAN, NODE_TYPES.ANIMAL, NODE_TYPES.PLANT, NODE_TYPES.ROBOT]
  const nodes = []

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const position = randomSpherePoint(4 + Math.random() * 2)

    nodes.push({
      id: i,
      type,
      position,
      label: getLabel(type, i),
    })
  }

  return nodes
}

// 노드 라벨 생성
const getLabel = (type, index) => {
  const labels = {
    [NODE_TYPES.HUMAN]: ['연구자', '시민', '전문가', '교육자', '정책담당자'],
    [NODE_TYPES.ANIMAL]: ['반려견', '반려묘', '반려조류', '반려어류', '반려토끼'],
    [NODE_TYPES.PLANT]: ['반려식물', '정원', '실내화초', '허브', '다육식물'],
    [NODE_TYPES.ROBOT]: ['반려로봇', 'AI친구', '케어봇', '교감로봇', '서비스봇'],
  }

  return labels[type][index % labels[type].length]
}

// 연결선 데이터 생성 (가까운 노드끼리 연결)
const generateEdges = (nodes, maxDistance = 4) => {
  const edges = []

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.sqrt(
        Math.pow(nodes[i].position[0] - nodes[j].position[0], 2) +
        Math.pow(nodes[i].position[1] - nodes[j].position[1], 2) +
        Math.pow(nodes[i].position[2] - nodes[j].position[2], 2)
      )

      if (dist < maxDistance && Math.random() > 0.5) {
        edges.push({
          id: `${i}-${j}`,
          start: nodes[i].position,
          end: nodes[j].position,
          startType: nodes[i].type,
          endType: nodes[j].type,
        })
      }
    }
  }

  // 중앙 허브와 연결 (일부 노드만)
  nodes.forEach((node, i) => {
    if (Math.random() > 0.6) {
      edges.push({
        id: `hub-${i}`,
        start: [0, 0, 0],
        end: node.position,
        startType: 'hub',
        endType: node.type,
        isHubConnection: true,
      })
    }
  })

  return edges
}

function Scene({ scrollProgress = 0, mousePosition = { x: 0, y: 0 } }) {
  const mobile = useMemo(() => isMobile(), [])
  const nodeCount = mobile ? 15 : 25

  const nodes = useMemo(() => generateNodes(nodeCount), [nodeCount])
  const edges = useMemo(() => generateEdges(nodes), [nodes])

  return (
    <>
      {/* 조명 */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#D98BA3" />

      {/* 중앙 허브 */}
      <CentralHub scrollProgress={scrollProgress} />

      {/* 노드들 */}
      <Nodes
        nodes={nodes}
        scrollProgress={scrollProgress}
        mousePosition={mousePosition}
      />

      {/* 연결선 */}
      <Edges
        edges={edges}
        scrollProgress={scrollProgress}
      />

      {/* 배경 파티클 */}
      <Particles
        count={mobile ? 200 : 500}
        mousePosition={mousePosition}
      />
    </>
  )
}

export default function NetworkScene({ scrollProgress = 0 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mobile = useMemo(() => isMobile(), [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, mobile ? 1.5 : 2]}
      frameloop="demand"
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 12]}
        fov={60}
        near={0.1}
        far={100}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />

      <Suspense fallback={null}>
        <Scene
          scrollProgress={scrollProgress}
          mousePosition={mousePosition}
        />

        {/* 포스트 프로세싱 (모바일 제외) */}
        {!mobile && (
          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              radius={0.8}
            />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  )
}
