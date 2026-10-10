import Board from './components/Board'
import CardDetailModal from './components/CardDetailModal'
import KanbanColumn from './components/KanbanColumn'
import { COLUMNS } from './constants/columns'
import { BoardProvider } from './context/BoardContext'
import './App.css'

function App() {
  return (
    <BoardProvider>
      <main className="app">
        <h1 className="app-title">Kanban Board</h1>
        <Board>
          {COLUMNS.map((column) => (
            <KanbanColumn key={column.id} column={column} />
          ))}
        </Board>
      </main>
      <CardDetailModal />
    </BoardProvider>
  )
}

export default App
