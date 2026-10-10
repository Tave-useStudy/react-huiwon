import { COLUMNS } from '../constants/columns'
import { useBoard } from '../context/BoardContext'
import './StatsPage.css'

function StatsPage() {
  const { cards, getCardsByStatus } = useBoard()
  const total = cards.length
  const doneCount = getCardsByStatus('done').length
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
            <strong className="stats-item-count">{getCardsByStatus(column.id).length}</strong>
          </li>
        ))}
      </ul>
    </>
  )
}

export default StatsPage
