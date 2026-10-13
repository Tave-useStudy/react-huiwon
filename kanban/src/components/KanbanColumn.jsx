import { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useRenderCount } from '../hooks/useRenderCount'
import { useBoardStore } from '../store/useBoardStore'
import AddCardForm from './AddCardForm'
import Column from './Column'
import KanbanCard from './KanbanCard'

function KanbanColumn({ column }) {
  const renderCount = useRenderCount()
  // filter는 매번 새 배열을 만들므로 useShallow로 "안의 카드들이 같으면 같은 값"으로 비교
  // → 다른 컬럼의 카드가 바뀌어도 이 컬럼은 리렌더되지 않음
  const cards = useBoardStore(
    useShallow((state) => state.cards.filter((card) => card.status === column.id)),
  )
  const addCard = useBoardStore((state) => state.addCard)

  // useCallback: column.id / addCard가 바뀌지 않으면 같은 함수 참조 유지
  // → memo(AddCardForm)이 onAdd 참조 변화에 반응하지 않도록 방지
  const handleAdd = useCallback(
    (title) => addCard(column.id, title),
    [addCard, column.id],
  )

  return (
    <Column>
      <Column.Header title={column.title} count={cards.length}>
        {import.meta.env.DEV && <span className="render-badge column-render-badge">{renderCount}</span>}
      </Column.Header>

      {cards.length === 0 ? (
        <Column.Empty />
      ) : (
        <Column.List>
          {cards.map((card) => (
            <KanbanCard key={card.id} card={card} />
          ))}
        </Column.List>
      )}

      <AddCardForm onAdd={handleAdd} />
    </Column>
  )
}

export default KanbanColumn
