import { createContext, useContext, useReducer } from 'react'
import { COLUMNS } from '../constants/columns'
import { INITIAL_CARDS } from '../constants/initialCards'

const BoardContext = createContext(null)

const ACTION = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  MOVE: 'MOVE',
}

function boardReducer(state, action) {
  switch (action.type) {
    case ACTION.ADD:
      return [...state, action.card]
    case ACTION.DELETE:
      return state.filter((card) => card.id !== action.id)
    case ACTION.MOVE:
      return state.map((card) => {
        if (card.id !== action.id) return card
        const index = COLUMNS.findIndex((column) => column.id === card.status)
        const next = COLUMNS[index + action.direction]
        return next ? { ...card, status: next.id } : card
      })
    default:
      return state
  }
}

export function BoardProvider({ children }) {
  const [cards, dispatch] = useReducer(boardReducer, INITIAL_CARDS)

  // reducer는 순수해야 하므로 id는 바깥에서 만들어서 넘김
  const addCard = (status, title) =>
    dispatch({
      type: ACTION.ADD,
      card: { id: crypto.randomUUID(), title, description: '', status },
    })

  const deleteCard = (id) => dispatch({ type: ACTION.DELETE, id })

  // direction: -1 이면 왼쪽 컬럼, +1 이면 오른쪽 컬럼으로 이동
  const moveCard = (id, direction) => dispatch({ type: ACTION.MOVE, id, direction })

  const getCardsByStatus = (status) => cards.filter((card) => card.status === status)

  return (
    <BoardContext.Provider value={{ cards, addCard, deleteCard, moveCard, getCardsByStatus }}>
      {children}
    </BoardContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBoard() {
  const context = useContext(BoardContext)
  if (!context) throw new Error('useBoard는 BoardProvider 안에서만 사용할 수 있습니다')
  return context
}
