import { useRef } from 'react'

// 컴포넌트가 몇 번 렌더됐는지 추적 — 개발 환경 전용
export function useRenderCount() {
  const count = useRef(0)
  count.current += 1
  return count.current
}
