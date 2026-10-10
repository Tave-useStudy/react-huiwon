import { useState } from 'react'
import { COLUMNS } from '../constants/columns'
import { useBoard } from '../context/BoardContext'
import Modal from './Modal'
import './CardDetailModal.css'

function CardDetailModal() {
  const { selectedCard, closeCard, updateCard, deleteCard } = useBoard()
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState({ title: '', description: '' })

  if (!selectedCard) return null

  const statusTitle = COLUMNS.find((column) => column.id === selectedCard.status)?.title

  const handleClose = () => {
    setIsEditing(false)
    closeCard()
  }

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
