import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CardDetailModal from './components/CardDetailModal'
import Navbar from './components/Navbar'
import BoardPage from './pages/BoardPage'
import NotFoundPage from './pages/NotFoundPage'
import StatsPage from './pages/StatsPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app">
        <Routes>
          <Route path="/" element={<BoardPage />}>
            <Route path="cards/:id" element={<CardDetailModal />} />
          </Route>
          <Route path="/stats" element={<StatsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
