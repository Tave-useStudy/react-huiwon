import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'

const BoardPage = lazy(() => import('./pages/BoardPage'))
const StatsPage = lazy(() => import('./pages/StatsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const CardDetailModal = lazy(() => import('./components/CardDetailModal'))

// Navbar hover 시 해당 페이지 번들을 미리 받아 두는 함수
export const preloadBoardPage = () => import('./pages/BoardPage')
export const preloadStatsPage = () => import('./pages/StatsPage')

// 페이지 전환 중 보여 줄 공통 fallback
function PageFallback() {
  return <div className="page-loading">Loading…</div>
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app">
        <Routes>
          {/* 페이지마다 독립적인 Suspense 경계 → 다른 페이지에 영향 없이 fallback 표시 */}
          <Route
            path="/"
            element={
              <Suspense fallback={<PageFallback />}>
                <BoardPage />
              </Suspense>
            }
          >
            {/* 모달은 보드 위에 덮이므로 fallback null — 보드가 이미 보임 */}
            <Route
              path="cards/:id"
              element={
                <Suspense fallback={null}>
                  <CardDetailModal />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/stats"
            element={
              <Suspense fallback={<PageFallback />}>
                <StatsPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
