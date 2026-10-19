import { memo } from 'react'
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COLUMNS } from '../constants/columns'
import { useRenderCount } from '../hooks/useRenderCount'
import { useBoardStore } from '../store/useBoardStore'
import Card from './Card'

// memo: card prop이 같으면 리렌더 건너뜀
// Zustand는 변경되지 않은 카드 객체의 참조를 유지하므로 얕은 비교만으로 충분
const KanbanCard = memo(function KanbanCard({ card }) {
  const renderCount = useRenderCount()
  const navigate = useNavigate()
  const moveCard = useBoardStore((state) => state.moveCard)
  const deleteCard = useBoardStore((state) => state.deleteCard)
  const columnIndex = COLUMNS.findIndex((column) => column.id === card.status)

  return (
    <Card onClick={() => navigate(`/cards/${card.id}`)}>
      <Card.Title>
        {card.title}
        {import.meta.env.DEV && <span className="render-badge">{renderCount}</span>}
      </Card.Title>
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
})

export default KanbanCard
