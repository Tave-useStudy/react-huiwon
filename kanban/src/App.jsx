import { useState } from 'react'
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import AddCardForm from './components/AddCardForm'
import Board from './components/Board'
import Card from './components/Card'
import Column from './components/Column'
import { COLUMNS } from './constants/columns'
import { INITIAL_CARDS } from './constants/initialCards'
import './App.css'

function App() {
  const [cards, setCards] = useState(INITIAL_CARDS)

  const addCard = (status, title) => {
    const newCard = { id: crypto.randomUUID(), title, description: '', status }
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

  // App에서 직접 조합하므로 Board, Column은 onDelete/onMove를 몰라도 됨
  return (
    <main className="app">
      <h1 className="app-title">Kanban Board</h1>
      <Board>
        {COLUMNS.map((column, index) => {
          const columnCards = cards.filter((card) => card.status === column.id)

          return (
            <Column key={column.id}>
              <Column.Header title={column.title} count={columnCards.length} />

              {columnCards.length === 0 ? (
                <Column.Empty />
              ) : (
                <Column.List>
                  {columnCards.map((card) => (
                    <Card key={card.id}>
                      <Card.Title>{card.title}</Card.Title>
                      <Card.Description>{card.description}</Card.Description>
                      <Card.Actions>
                        <Card.Action
                          label="이전 단계로 이동"
                          onClick={() => moveCard(card.id, -1)}
                          disabled={index === 0}
                        >
                          <ChevronLeft size={16} />
                        </Card.Action>
                        <Card.Action
                          label="다음 단계로 이동"
                          onClick={() => moveCard(card.id, 1)}
                          disabled={index === COLUMNS.length - 1}
                        >
                          <ChevronRight size={16} />
                        </Card.Action>
                        <Card.Action
                          label="카드 삭제"
                          variant="danger"
                          onClick={() => deleteCard(card.id)}
                        >
                          <Trash2 size={16} />
                        </Card.Action>
                      </Card.Actions>
                    </Card>
                  ))}
                </Column.List>
              )}

              <AddCardForm onAdd={(title) => addCard(column.id, title)} />
            </Column>
          )
        })}
      </Board>
    </main>
  )
}

export default App
