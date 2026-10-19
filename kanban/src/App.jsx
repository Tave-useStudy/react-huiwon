import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'

const BoardPage = lazy(() => import('./pages/BoardPage'))
const StatsPage = lazy(() => import('./pages/StatsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const CardDetailModal = lazy(() => import('./components/CardDetailModal'))

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app">
        <Suspense fallback={<div className="page-loading">Loading…</div>}>
          <Routes>
            <Route path="/" element={<BoardPage />}>
              <Route path="cards/:id" element={<CardDetailModal />} />
            </Route>
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  )
}

export default App
