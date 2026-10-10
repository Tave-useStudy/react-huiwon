import { createContext, useContext, useReducer, useState } from 'react'
import { COLUMNS } from '../constants/columns'
import { INITIAL_CARDS } from '../constants/initialCards'

const BoardContext = createContext(null)

const ACTION = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  MOVE: 'MOVE',
  UPDATE: 'UPDATE',
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
    case ACTION.UPDATE:
      return state.map((card) => (card.id === action.id ? { ...card, ...action.changes } : card))
    default:
      return state
  }
}

export function BoardProvider({ children }) {
  const [cards, dispatch] = useReducer(boardReducer, INITIAL_CARDS)
  // 모달로 열린 카드의 id (null이면 닫힘)
  const [selectedCardId, setSelectedCardId] = useState(null)

  // reducer는 순수해야 하므로 id는 바깥에서 만들어서 넘김
  const addCard = (status, title) =>
    dispatch({
      type: ACTION.ADD,
      card: { id: crypto.randomUUID(), title, description: '', status },
    })

  const deleteCard = (id) => dispatch({ type: ACTION.DELETE, id })

  // direction: -1 이면 왼쪽 컬럼, +1 이면 오른쪽 컬럼으로 이동
  const moveCard = (id, direction) => dispatch({ type: ACTION.MOVE, id, direction })

  // changes: { title, description } 중 바꿀 값만
  const updateCard = (id, changes) => dispatch({ type: ACTION.UPDATE, id, changes })

  const openCard = (id) => setSelectedCardId(id)
  const closeCard = () => setSelectedCardId(null)

  // 열린 카드가 삭제되면 undefined → 모달이 자동으로 닫힘
  const selectedCard = cards.find((card) => card.id === selectedCardId)

  const getCardsByStatus = (status) => cards.filter((card) => card.status === status)

  return (
    <BoardContext.Provider
      value={{
        cards,
        addCard,
        deleteCard,
        moveCard,
        updateCard,
        getCardsByStatus,
        selectedCard,
        openCard,
        closeCard,
      }}
    >
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
