import { createContext, useContext, useState } from 'react'

const TodoContext = createContext(null)

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([])

  const addTodo = (text, category, priority) => {
    setTodos(prev => [...prev, { id: Date.now(), text, category, priority, done: false }])
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const updateTodo = (id, newText) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t))
  }

  // useParams는 string을 반환하므로 Number로 변환해서 조회
  const getTodoById = (id) => todos.find(t => t.id === Number(id))

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, updateTodo, getTodoById }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodos = () => useContext(TodoContext)
