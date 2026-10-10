import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { COLUMNS } from '../constants/columns'
import './Card.css'

function Card({ card, onDelete, onMove }) {
  const columnIndex = COLUMNS.findIndex((column) => column.id === card.status)
  const isFirst = columnIndex === 0
  const isLast = columnIndex === COLUMNS.length - 1

  return (
    <li className="card">
      <h3 className="card-title">{card.title}</h3>
      {card.description && <p className="card-description">{card.description}</p>}

      <div className="card-actions">
        <button
          className="icon-btn"
          onClick={() => onMove(card.id, -1)}
          disabled={isFirst}
          aria-label="이전 단계로 이동"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          className="icon-btn"
          onClick={() => onMove(card.id, 1)}
          disabled={isLast}
          aria-label="다음 단계로 이동"
        >
          <ChevronRight size={16} />
        </button>
        <button
          className="icon-btn danger"
          onClick={() => onDelete(card.id)}
          aria-label="카드 삭제"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  )
}

export default Card
