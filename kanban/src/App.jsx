import { useState } from 'react'
import Board from './components/Board'
import { COLUMNS } from './constants/columns'
import { INITIAL_CARDS } from './constants/initialCards'
import './App.css'

function App() {
  const [cards, setCards] = useState(INITIAL_CARDS)

  const addCard = (status, title) => {
    const newCard = { id: Date.now(), title, description: '', status }
    setCards((prev) => [...prev, newCard])
  }

  const deleteCard = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id))
  }

  // direction: -1 이면 왼쪽 컬럼, +1 이면 오른쪽 컬럼으로 이동
  const moveCard = (id, direction) => {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id !== id) return card
        const index = COLUMNS.findIndex((column) => column.id === card.status)
        const next = COLUMNS[index + direction]
        return next ? { ...card, status: next.id } : card
      }),
    )
  }

  return (
    <main className="app">
      <h1 className="app-title">Kanban Board</h1>
      <Board cards={cards} onAdd={addCard} onDelete={deleteCard} onMove={moveCard} />
    </main>
  )
}

export default App
