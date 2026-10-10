import { COLUMNS } from '../constants/columns'
import Column from './Column'
import './Board.css'

function Board({ cards }) {
  return (
    <div className="board">
      {COLUMNS.map((column) => (
        <Column
          key={column.id}
          title={column.title}
          cards={cards.filter((card) => card.status === column.id)}
        />
      ))}
    </div>
  )
}

export default Board
