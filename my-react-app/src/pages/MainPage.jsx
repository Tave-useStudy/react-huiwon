import { useState } from 'react'
import { useTodos } from '../context/TodoContext'
import TextInput from '../components/TextInput'
import TaskList from '../components/TaskList'
import UserProfile from '../components/UserProfile'
import FilterBar from '../components/FilterBar'
import SortBar from '../components/SortBar'
import StatusFilter from '../components/StatusFilter'
import FetchStatus from '../components/FetchStatus'
import { ALL } from '../constants/categories'
import { PRIORITIES } from '../constants/priorities'

const getPriorityOrder = (value) =>
  PRIORITIES.find(p => p.value === value)?.order ?? 0

function MainPage() {
  const { todos, loading, error, refetch, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos()

  const [activeCategory, setActiveCategory] = useState(ALL)
  const [sortBy, setSortBy] = useState('newest')
  const [activeStatus, setActiveStatus] = useState('all')

  // 이론 1챕터 배열 고차함수: filter()로 선택된 카테고리만 추출
  const filteredTodos = activeCategory === ALL
    ? todos
    : todos.filter(todo => todo.category === activeCategory)

  // .toSorted()로 원본 배열 불변성 유지하며 정렬
  const sortedTodos = filteredTodos.toSorted((a, b) => {
    if (sortBy === 'newest')        return b.id - a.id
    if (sortBy === 'oldest')        return a.id - b.id
    if (sortBy === 'priority-desc') return getPriorityOrder(b.priority) - getPriorityOrder(a.priority)
    if (sortBy === 'priority-asc')  return getPriorityOrder(a.priority) - getPriorityOrder(b.priority)
    return 0
  })

  // derived state: todos에서 완료 상태로 필터링
  const statusFilteredTodos = activeStatus === 'all'
    ? todos
    : todos.filter(todo => activeStatus === 'done' ? todo.done : !todo.done)

  return (
    <div className="app-container">
      <h1 className="app-title">📝</h1>
      <UserProfile />
      <TextInput onAdd={addTodo} />

      {/* 초기 로딩 중이거나 에러난 경우 (로컬에 데이터 없을 때만) */}
      {todos.length === 0 && (
        <FetchStatus loading={loading} error={error} onRetry={refetch} />
      )}

      {/* 업무별 섹션 */}
      <div className="todo-section">
        <div className="todo-section-header">
          <h2 className="todo-section-title">업무별 todo-list</h2>
          <SortBar sortBy={sortBy} onSort={setSortBy} />
        </div>
        <FilterBar todos={todos} activeCategory={activeCategory} onFilter={setActiveCategory} />
        <TaskList todos={sortedTodos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
      </div>

      {/* 상태별 섹션 */}
      <div className="todo-section">
        <div className="todo-section-header">
          <h2 className="todo-section-title">상태별 todo-list</h2>
        </div>
        <StatusFilter todos={todos} activeStatus={activeStatus} onFilter={setActiveStatus} />
        <TaskList todos={statusFilteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
      </div>
    </div>
  )
}

export default MainPage
