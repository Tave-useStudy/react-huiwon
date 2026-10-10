import { useShallow } from 'zustand/react/shallow'
import { useBoardStore } from '../store/useBoardStore'
import AddCardForm from './AddCardForm'
import Column from './Column'
import KanbanCard from './KanbanCard'

function KanbanColumn({ column }) {
  // filter는 매번 새 배열을 만들므로 useShallow로 "안의 카드들이 같으면 같은 값"으로 비교
  // → 다른 컬럼의 카드가 바뀌어도 이 컬럼은 리렌더되지 않음
  const cards = useBoardStore(
    useShallow((state) => state.cards.filter((card) => card.status === column.id)),
  )
  const addCard = useBoardStore((state) => state.addCard)

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
