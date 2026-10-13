import { useMemo } from 'react'
import { COLUMNS } from '../constants/columns'
import { useBoardStore } from '../store/useBoardStore'
import './StatsPage.css'

function StatsPage() {
  const cards = useBoardStore((state) => state.cards)

  // cards 배열이 바뀔 때만 재계산 — 렌더마다 filter를 컬럼 수만큼 반복하지 않도록
  const counts = useMemo(
    () => Object.fromEntries(COLUMNS.map((col) => [col.id, cards.filter((c) => c.status === col.id).length])),
    [cards],
  )

  const total = cards.length
  const doneCount = counts['done'] ?? 0
  const progress = total === 0 ? 0 : Math.round((doneCount / total) * 100)

  return (
    <>
      <h1 className="page-title">통계</h1>

      <section className="stats-panel">
        <div className="stats-progress-header">
          <span>진행률</span>
          <strong>{progress}%</strong>
        </div>
        <div className="stats-progress-track">
          <div className="stats-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="stats-progress-caption">
          전체 {total}개 중 {doneCount}개 완료
        </p>
      </section>

      <ul className="stats-list">
        {COLUMNS.map((column) => (
          <li key={column.id} className="stats-item">
            <span className="stats-item-label">{column.title}</span>
            <strong className="stats-item-count">{counts[column.id] ?? 0}</strong>
          </li>
        ))}
      </ul>
    </>
  )
}

export default StatsPage
