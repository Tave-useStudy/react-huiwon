import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { useBoard } from '../context/BoardContext'
import { COLUMNS } from '../constants/columns'
import Card from './Card'

// 필요한 함수를 props가 아닌 Context에서 직접 꺼내 씀
function KanbanCard({ card }) {
  const { moveCard, deleteCard, openCard } = useBoard()
  const columnIndex = COLUMNS.findIndex((column) => column.id === card.status)

  return (
    <Card onClick={() => openCard(card.id)}>
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
