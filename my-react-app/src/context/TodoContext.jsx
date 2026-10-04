import { createContext, useContext, useReducer } from 'react'

const TodoContext = createContext(null)

const ACTION = {
  ADD: 'ADD',
  TOGGLE: 'TOGGLE',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
}

function todoReducer(state, action) {
  switch (action.type) {
    case ACTION.ADD:
      return [...state, { id: Date.now(), ...action.payload, done: false }]
    case ACTION.TOGGLE:
      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t)
    case ACTION.DELETE:
      return state.filter(t => t.id !== action.id)
    case ACTION.UPDATE:
      return state.map(t => t.id === action.id ? { ...t, text: action.text } : t)
    default:
      return state
  }
}

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, [])

  const addTodo = (text, category, priority) =>
    dispatch({ type: ACTION.ADD, payload: { text, category, priority } })

  const toggleTodo = (id) =>
    dispatch({ type: ACTION.TOGGLE, id })

  const deleteTodo = (id) =>
    dispatch({ type: ACTION.DELETE, id })

  const updateTodo = (id, text) =>
    dispatch({ type: ACTION.UPDATE, id, text })

  // useParams는 string을 반환하므로 Number로 변환해서 조회
  const getTodoById = (id) => todos.find(t => t.id === Number(id))

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, updateTodo, getTodoById }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodos = () => useContext(TodoContext)
