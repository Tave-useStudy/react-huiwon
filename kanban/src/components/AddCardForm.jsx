import { memo, useState } from 'react'
import { Plus } from 'lucide-react'
import './AddCardForm.css'

// memo: useCallback으로 안정화된 onAdd 참조 덕분에 카드 추가/이동 시 리렌더 건너뜀
const AddCardForm = memo(function AddCardForm({ onAdd }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (trimmed === '') return
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <form className="add-card-form" onSubmit={handleSubmit}>
      <input
        className="add-card-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="새 카드 제목"
      />
      <button type="submit" className="icon-btn" aria-label="카드 추가">
        <Plus size={16} />
      </button>
    </form>
  )
})

export default AddCardForm
