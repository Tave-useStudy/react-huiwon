import { useState } from 'react'
import TextInput from './components/TextInput'
import TaskList from './components/TaskList'
import UserProfile from './components/UserProfile'
import FilterBar from './components/FilterBar'
import { ALL } from './constants/categories'
import './App.css'

function App() {
  // 이론 3챕터 useState: todos 배열 전체를 App에서 관리
  const [todos, setTodos] = useState([])
  const [activeCategory, setActiveCategory] = useState(ALL)

  // 이론 2챕터 불변성: push() 대신 [...todos, 새항목] 으로 새 배열 생성
  const addTodo = (text, category) => {
    const newTodo = { id: Date.now(), text, category, done: false }
    setTodos([...todos, newTodo])
  }

  // 이론 2챕터 불변성: map()으로 새 배열 생성, 해당 항목만 done 반전
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  // 이론 1챕터 배열 고차함수: filter()로 해당 id 제외한 새 배열 반환
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // 이론 2챕터 불변성: map()으로 새 배열 생성, 해당 항목만 text 교체
  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  // 이론 1챕터 배열 고차함수: filter()로 선택된 카테고리만 추출
  const filteredTodos = activeCategory === ALL
    ? todos
    : todos.filter(todo => todo.category === activeCategory)

  return (
    <div className="app-container">
      <h1 className="app-title">TODO-LIST</h1>
      {/* 이론 2챕터 Props: 부모 → 자식으로 데이터와 함수 전달 */}
      <UserProfile />
      <TextInput onAdd={addTodo} />
      <FilterBar todos={todos} activeCategory={activeCategory} onFilter={setActiveCategory} />
      <TaskList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
    </div>
  )
}

export default App
