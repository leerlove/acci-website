// 브랜드 컬러 (Three.js용 hex number)
export const COLORS = {
  primary: 0x6B2D4A,      // 버건디
  primaryLight: 0xF9F0F4, // 라이트 핑크
  secondary: 0xD98BA3,    // 핑크
  accent: 0xF2C4D0,       // 라이트 핑크
  robot: 0x9CA3AF,        // 메탈릭 그레이
  dark: 0x1F2937,         // 다크 배경
  white: 0xFFFFFF,
}

// CSS 컬러 문자열
export const CSS_COLORS = {
  primary: '#6B2D4A',
  primaryLight: '#F9F0F4',
  secondary: '#D98BA3',
  accent: '#F2C4D0',
  robot: '#9CA3AF',
  dark: '#1F2937',
}

// 노드 타입 정의
export const NODE_TYPES = {
  HUMAN: 'human',
  ANIMAL: 'animal',
  PLANT: 'plant',
  ROBOT: 'robot',
}

// 노드 타입별 색상
export const getNodeColor = (type) => {
  switch (type) {
    case NODE_TYPES.HUMAN:
      return COLORS.primary
    case NODE_TYPES.ANIMAL:
      return COLORS.secondary
    case NODE_TYPES.PLANT:
      return COLORS.accent
    case NODE_TYPES.ROBOT:
      return COLORS.robot
    default:
      return COLORS.primary
  }
}

// 노드 타입별 크기
export const getNodeSize = (type) => {
  switch (type) {
    case NODE_TYPES.HUMAN:
      return 0.5
    case NODE_TYPES.ANIMAL:
      return 0.4
    case NODE_TYPES.PLANT:
      return 0.35
    case NODE_TYPES.ROBOT:
      return 0.38
    default:
      return 0.4
  }
}

// 랜덤 위치 생성 (구형 분포)
export const randomSpherePoint = (radius) => {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)

  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi),
  ]
}

// 부드러운 보간
export const lerp = (start, end, factor) => {
  return start + (end - start) * factor
}

// 3D 벡터 거리 계산
export const distance3D = (p1, p2) => {
  return Math.sqrt(
    Math.pow(p2[0] - p1[0], 2) +
    Math.pow(p2[1] - p1[1], 2) +
    Math.pow(p2[2] - p1[2], 2)
  )
}

// 베지어 커브 포인트 계산
export const quadraticBezierPoint = (t, p0, p1, p2) => {
  const oneMinusT = 1 - t
  return [
    oneMinusT * oneMinusT * p0[0] + 2 * oneMinusT * t * p1[0] + t * t * p2[0],
    oneMinusT * oneMinusT * p0[1] + 2 * oneMinusT * t * p1[1] + t * t * p2[1],
    oneMinusT * oneMinusT * p0[2] + 2 * oneMinusT * t * p1[2] + t * t * p2[2],
  ]
}

// 모바일 감지
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}
