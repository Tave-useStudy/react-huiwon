import { NavLink } from 'react-router-dom'
import { House, Settings } from 'lucide-react'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="navbar-logo">TODO</span>
        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <House size={18} />
            홈
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <Settings size={18} />
            설정
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
