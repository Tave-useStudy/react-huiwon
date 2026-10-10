import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { COLUMNS } from '../constants/columns'
import { useBoardStore } from '../store/useBoardStore'
import Modal from './Modal'
import './CardDetailModal.css'

// /cards/:id 라우트에서 렌더링 — 어떤 카드를 열지는 URL이 결정
function CardDetailModal() {
  const { id } = useParams()
  const navigate = useNavigate()
  // useParams는 항상 문자열을 주므로 숫자 id(더미 데이터)와도 비교되게 문자열로 맞춤
  const selectedCard = useBoardStore((state) => state.cards.find((card) => String(card.id) === id))
  const updateCard = useBoardStore((state) => state.updateCard)
  const deleteCard = useBoardStore((state) => state.deleteCard)
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState({ title: '', description: '' })

  // 없는 카드(잘못된 주소, 삭제된 카드)면 보드로 돌려보냄
  if (!selectedCard) return <Navigate to="/" replace />

  const statusTitle = COLUMNS.find((column) => column.id === selectedCard.status)?.title

  // URL이 바뀌면 이 컴포넌트가 언마운트되므로 isEditing은 따로 초기화하지 않아도 됨
  const handleClose = () => navigate('/')

  // 수정 시작할 때 현재 값으로 입력창을 채움
  const handleEdit = () => {
    setDraft({ title: selectedCard.title, description: selectedCard.description })
    setIsEditing(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const title = draft.title.trim()
    if (title === '') return
    updateCard(selectedCard.id, { title, description: draft.description.trim() })
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteCard(selectedCard.id)
    handleClose()
  }

  if (isEditing) {
    return (
      <Modal onClose={handleClose}>
        <form onSubmit={handleSave}>
          <Modal.Header>
            <span className="detail-label">카드 수정</span>
          </Modal.Header>
          <Modal.Body>
            <label className="detail-field">
              <span className="detail-label">제목</span>
              <input
                className="detail-input"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                autoFocus
              />
            </label>
            <label className="detail-field">
              <span className="detail-label">설명</span>
              <textarea
                className="detail-input"
                rows={4}
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="text-btn" onClick={() => setIsEditing(false)}>
              취소
            </button>
            <button type="submit" className="text-btn primary">
              저장
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }

  return (
    <Modal onClose={handleClose}>
      <Modal.Header>
        <span className="detail-status">{statusTitle}</span>
        <h2 className="detail-title">{selectedCard.title}</h2>
      </Modal.Header>
      <Modal.Body>
        <p className={`detail-description${selectedCard.description ? '' : ' empty'}`}>
          {selectedCard.description || '설명이 없습니다'}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="text-btn danger" onClick={handleDelete}>
          삭제
        </button>
        <button className="text-btn primary" onClick={handleEdit}>
          수정
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default CardDetailModal
