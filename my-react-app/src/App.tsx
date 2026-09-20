import { useState } from 'react'
import TextInput from './components/TextInput'
import TaskList from './components/TaskList'
import UserProfile from './components/UserProfile'

interface Todo {
  id: number
  text: string
  done: boolean
}

function App() {
  // 이론 3챕터 useState: todos 배열 전체를 App에서 관리
  // TextInput이랑 TaskList가 같은 데이터를 공유하려면
  // 공통 부모인 App에서 state를 들고 있어야 함 (단방향 데이터 흐름)
  const [todos, setTodos] = useState<Todo[]>([])

  // 이론 2챕터 불변성: push() 대신 [...todos, 새항목] 으로 새 배열 생성
  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, done: false }
    setTodos([...todos, newTodo])
  }

  // 이론 2챕터 불변성: map()으로 새 배열 생성, 해당 항목만 done 반전
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  // 이론 1챕터 배열 고차함수: filter()로 해당 id 제외한 새 배열 반환
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h1>할 일 목록</h1>
      {/* 이론 2챕터 Props: 부모 → 자식으로 데이터와 함수 전달 */}
      <UserProfile />
      <TextInput onAdd={addTodo} />
      <TaskList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

export default App
