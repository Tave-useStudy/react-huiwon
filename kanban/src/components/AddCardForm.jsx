import { useState } from 'react'
import { Plus } from 'lucide-react'
import './AddCardForm.css'

function AddCardForm({ onAdd }) {
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
}

export default AddCardForm
