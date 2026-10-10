import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COLUMNS } from '../constants/columns'
import { useBoardStore } from '../store/useBoardStore'
import Card from './Card'

// 필요한 함수만 store에서 골라 씀 — 함수는 바뀌지 않으므로 이 구독 때문에 리렌더되지 않음
function KanbanCard({ card }) {
  const navigate = useNavigate()
  const moveCard = useBoardStore((state) => state.moveCard)
  const deleteCard = useBoardStore((state) => state.deleteCard)
  const columnIndex = COLUMNS.findIndex((column) => column.id === card.status)

  return (
    <Card onClick={() => navigate(`/cards/${card.id}`)}>
      <Card.Title>{card.title}</Card.Title>
      <Card.Description>{card.description}</Card.Description>
      <Card.Actions>
        <Card.Action
          label="이전 단계로 이동"
          onClick={() => moveCard(card.id, -1)}
          disabled={columnIndex === 0}
        >
          <ChevronLeft size={16} />
        </Card.Action>
        <Card.Action
          label="다음 단계로 이동"
          onClick={() => moveCard(card.id, 1)}
          disabled={columnIndex === COLUMNS.length - 1}
        >
          <ChevronRight size={16} />
        </Card.Action>
        <Card.Action label="카드 삭제" variant="danger" onClick={() => deleteCard(card.id)}>
          <Trash2 size={16} />
        </Card.Action>
      </Card.Actions>
    </Card>
  )
}

export default KanbanCard
