import TodoItem from './TodoItem'
import './TaskList.css'

// 이론 1챕터 구조 분해 할당: props를 { todos, onToggle, onDelete, onUpdate }로 바로 꺼냄
function TaskList({ todos, onToggle, onDelete, onUpdate }) {
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
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
    </div>
  )
}

export default TaskList
