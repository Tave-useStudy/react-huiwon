import { COLUMNS } from '../constants/columns'
import Column from './Column'
import './Board.css'

// onDelete, onMove는 Board에서 쓰지 않고 Column으로 전달만 함 (props drilling)
function Board({ cards, onAdd, onDelete, onMove }) {
  return (
    <div className="board">
      {COLUMNS.map((column) => (
        <Column
          key={column.id}
          title={column.title}
          cards={cards.filter((card) => card.status === column.id)}
          onAdd={(title) => onAdd(column.id, title)}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </div>
  )
}

export default Board
