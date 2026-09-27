import { useTodos } from '../context/TodoContext'
import './SettingsPage.css'

function SettingsPage() {
  const { todos, deleteTodo } = useTodos()

  const clearAll = () => {
    todos.forEach(todo => deleteTodo(todo.id))
  }

  return (
    <div className="app-container">
      <h1 className="app-title">설정</h1>

      <div className="settings-card">
        <h2 className="settings-section-title">데이터 관리</h2>

        <div className="settings-row">
          <div>
            <p className="settings-row-label">전체 삭제</p>
            <p className="settings-row-desc">등록된 할 일 {todos.length}개를 모두 삭제합니다.</p>
          </div>
          <button
            className="settings-danger-btn"
            onClick={clearAll}
            disabled={todos.length === 0}
          >
            전체 삭제
          </button>
        </div>
      </div>

      <div className="settings-card">
        <h2 className="settings-section-title">앱 정보</h2>
        <div className="settings-info-row">
          <span className="settings-row-label">버전</span>
          <span className="settings-row-value">1.0.0</span>
        </div>
        <div className="settings-info-row">
          <span className="settings-row-label">등록된 할 일</span>
          <span className="settings-row-value">{todos.length}개</span>
        </div>
        <div className="settings-info-row">
          <span className="settings-row-label">완료된 할 일</span>
          <span className="settings-row-value">{todos.filter(t => t.done).length}개</span>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
