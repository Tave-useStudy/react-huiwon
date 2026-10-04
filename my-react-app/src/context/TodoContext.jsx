import { createContext, useContext, useEffect, useReducer } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useFetch } from '../hooks/useFetch'

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=10'

const TodoContext = createContext(null)

const ACTION = {
  INIT: 'INIT',
  ADD: 'ADD',
  TOGGLE: 'TOGGLE',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
}

function todoReducer(state, action) {
  switch (action.type) {
    case ACTION.INIT:
      return action.todos
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

// JSONPlaceholder 응답을 앱 todo 구조로 변환
function mapApiTodos(apiTodos) {
  return apiTodos.map(({ id, title, completed }) => ({
    id,
    text: title,
    category: null,
    priority: 'medium',
    done: completed,
  }))
}

export function TodoProvider({ children }) {
  const [load, save] = useLocalStorage('todos', [])
  const [todos, dispatch] = useReducer(todoReducer, null, load)

  const { data, loading, error, refetch } = useFetch(API_URL)

  // localStorage가 비어있을 때만 API 데이터로 초기화
  useEffect(() => {
    if (todos.length === 0 && data) {
      dispatch({ type: ACTION.INIT, todos: mapApiTodos(data) })
    }
  }, [data])

  useEffect(() => {
    save(todos)
  }, [todos])

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
    <TodoContext.Provider value={{ todos, loading, error, refetch, addTodo, toggleTodo, deleteTodo, updateTodo, getTodoById }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodos = () => useContext(TodoContext)
