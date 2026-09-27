import { useState, useRef, useEffect } from 'react'
import { CheckCircle2, Circle, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import './TodoItem.css'

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    if (!isMenuOpen) return
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const handleSave = () => {
    const trimmed = editText.trim()
    if (trimmed === '') return
    onUpdate(todo.id, trimmed)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') handleCancel()
  }

  const handleEdit = () => {
    setIsMenuOpen(false)
    setIsEditing(true)
  }

  const handleDelete = () => {
    setIsMenuOpen(false)
    onDelete(todo.id)
  }

  return (
    <li className="todo-item">
      {isEditing ? (
        <input
          className="todo-edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className={`todo-text${todo.done ? ' done' : ''}`}>
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <>
          <button onClick={handleSave} className="save-btn">저장</button>
          <button onClick={handleCancel} className="cancel-btn">취소</button>
        </>
      ) : (
        <>
          {/* 완료 체크 아이콘 버튼 */}
          <button onClick={() => onToggle(todo.id)} className={`check-btn${todo.done ? ' checked' : ''}`}>
            {todo.done
              ? <CheckCircle2 size={22} />
              : <Circle size={22} />
            }
          </button>

          {/* 더보기 아이콘 버튼 + 드롭다운 메뉴 */}
          <div className="menu-wrapper" ref={menuRef}>
            <button onClick={() => setIsMenuOpen(v => !v)} className="more-btn">
              <MoreVertical size={20} />
            </button>

            {isMenuOpen && (
              <div className="dropdown-menu">
                <button onClick={handleEdit} className="dropdown-item">
                  <Pencil size={14} />
                  수정
                </button>
                <button onClick={handleDelete} className="dropdown-item danger">
                  <Trash2 size={14} />
                  삭제
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </li>
  )
}

export default TodoItem
