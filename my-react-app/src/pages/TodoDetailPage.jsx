import { useParams, useNavigate } from 'react-router-dom'
import { useTodos } from '../context/TodoContext'
import { CATEGORIES, CATEGORY_STYLE } from '../constants/categories'
import { PRIORITIES, PRIORITY_COLOR } from '../constants/priorities'
import { ChevronLeft, CheckCircle2, Circle } from 'lucide-react'
import './TodoDetailPage.css'

function TodoDetailPage() {
  // useParams: URL의 :id 파라미터를 추출
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTodoById, toggleTodo, deleteTodo } = useTodos()

  const todo = getTodoById(id)

  if (!todo) {
    return (
      <div className="app-container">
        <div className="detail-not-found">
          <p>할 일을 찾을 수 없습니다.</p>
          <button onClick={() => navigate('/')} className="back-btn">홈으로</button>
        </div>
      </div>
    )
  }

  const categoryLabel = CATEGORIES.find(c => c.value === todo.category)?.label
  const categoryStyle = CATEGORY_STYLE[todo.category]
  const priorityLabel = PRIORITIES.find(p => p.value === todo.priority)?.label
  const priorityColor = PRIORITY_COLOR[todo.priority]

  const handleDelete = () => {
    deleteTodo(todo.id)
    navigate('/')
  }

  return (
    <div className="app-container">
      <div className="detail-card">
        {/* 뒤로가기 */}
        <button className="detail-back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={18} />
          목록으로
        </button>

        {/* 상태 & 텍스트 */}
        <div className="detail-header">
          <button
            className={`check-btn${todo.done ? ' checked' : ''}`}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.done ? <CheckCircle2 size={28} /> : <Circle size={28} />}
          </button>
          <h2 className={`detail-text${todo.done ? ' done' : ''}`}>{todo.text}</h2>
        </div>

        <div className="detail-divider" />

        {/* 메타 정보 */}
        <div className="detail-meta">
          <div className="detail-meta-row">
            <span className="detail-meta-label">카테고리</span>
            <span
              className="category-badge"
              style={{ background: categoryStyle?.bg, color: categoryStyle?.text }}
            >
              {categoryLabel}
            </span>
          </div>
          <div className="detail-meta-row">
            <span className="detail-meta-label">우선순위</span>
            <span className="detail-priority" style={{ color: priorityColor }}>
              ● {priorityLabel}
            </span>
          </div>
          <div className="detail-meta-row">
            <span className="detail-meta-label">상태</span>
            <span className={`detail-status${todo.done ? ' done' : ''}`}>
              {todo.done ? '완료' : '미완료'}
            </span>
          </div>
        </div>

        {/* 삭제 */}
        <button className="detail-delete-btn" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  )
}

export default TodoDetailPage
