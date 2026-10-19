// React <Profiler> onRender 콜백
// phase: 'mount' | 'update' | 'nested-update'
// actualDuration: 이번 렌더에 실제로 걸린 시간 (ms)
// baseDuration:   메모화 없이 전체를 렌더했다면 걸릴 시간 (ms) — 최적화 여지 기준선
export function onRenderCallback(id, phase, actualDuration, baseDuration) {
  console.log(
    `%c[Profiler] ${id}`,
    'color: #6366f1; font-weight: bold',
    `| ${phase} | actual: ${actualDuration.toFixed(1)}ms | base: ${baseDuration.toFixed(1)}ms`,
  )
}
