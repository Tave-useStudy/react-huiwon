import { useBoard } from '../context/BoardContext'
import AddCardForm from './AddCardForm'
import Column from './Column'
import KanbanCard from './KanbanCard'

function KanbanColumn({ column }) {
  const { addCard, getCardsByStatus } = useBoard()
  const cards = getCardsByStatus(column.id)

  return (
    <Column>
      <Column.Header title={column.title} count={cards.length} />

      {cards.length === 0 ? (
        <Column.Empty />
      ) : (
        <Column.List>
          {cards.map((card) => (
            <KanbanCard key={card.id} card={card} />
          ))}
        </Column.List>
      )}

      <AddCardForm onAdd={(title) => addCard(column.id, title)} />
    </Column>
  )
}

export default KanbanColumn
