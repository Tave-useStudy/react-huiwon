import Board from './components/Board'
import { INITIAL_CARDS } from './constants/initialCards'
import './App.css'

function App() {
  return (
    <main className="app">
      <h1 className="app-title">Kanban Board</h1>
      <Board cards={INITIAL_CARDS} />
    </main>
  )
}

export default App
