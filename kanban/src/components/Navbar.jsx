import { NavLink, useLocation } from 'react-router-dom'
import { ChartColumn, LayoutDashboard } from 'lucide-react'
import { preloadBoardPage, preloadStatsPage } from '../App'
import './Navbar.css'

function Navbar() {
  const { pathname } = useLocation()
  // 카드 모달(/cards/:id)이 열려 있어도 보드 탭을 활성화 상태로 유지
  const isBoardActive = pathname === '/' || pathname.startsWith('/cards/')

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="navbar-logo">KANBAN</span>
        <div className="navbar-links">
          {/* onMouseEnter로 hover 시점에 번들 사전 로드 */}
          <NavLink
            to="/"
            className={`nav-link${isBoardActive ? ' active' : ''}`}
            onMouseEnter={preloadBoardPage}
          >
            <LayoutDashboard size={18} />
            보드
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            onMouseEnter={preloadStatsPage}
          >
            <ChartColumn size={18} />
            통계
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
