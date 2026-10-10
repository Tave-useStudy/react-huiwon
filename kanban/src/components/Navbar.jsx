import { NavLink, useLocation } from 'react-router-dom'
import { ChartColumn, LayoutDashboard } from 'lucide-react'
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
          <NavLink to="/" className={`nav-link${isBoardActive ? ' active' : ''}`}>
            <LayoutDashboard size={18} />
            보드
          </NavLink>
          <NavLink to="/stats" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <ChartColumn size={18} />
            통계
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
