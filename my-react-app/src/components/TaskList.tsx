import type { Todo } from '../types'
import './TaskList.css'

interface TaskListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

// 이론 1챕터 구조 분해 할당: props를 { todos, onToggle, onDelete }로 바로 꺼냄
function TaskList({ todos, onToggle, onDelete }: TaskListProps) {
  if (todos.length === 0) {
    return (
      <div className="todo-list-card">
        <p className="todo-empty">할 일이 없습니다. 추가해보세요! 🎉</p>
      </div>
    )
  }

  return (
    <div className="todo-list-card">
      <ul className="todo-list">
        {/* 이론 2챕터 리스트와 Key: map()으로 배열 → JSX 변환, key는 고유한 id 사용 */}
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            {/* 이론 2챕터 조건부 렌더링: done이면 취소선 스타일 적용 */}
            <span className={`todo-text${todo.done ? ' done' : ''}`}>
              {todo.text}
            </span>

            {/* 완료 버튼: 클릭 시 부모의 toggleTodo 호출 → 이벤트가 위로 올라감 */}
            <button onClick={() => onToggle(todo.id)} className="toggle-btn">
              {todo.done ? '되돌리기' : '완료'}
            </button>

            {/* 삭제 버튼: 클릭 시 부모의 deleteTodo 호출 */}
            <button onClick={() => onDelete(todo.id)} className="delete-btn">
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
