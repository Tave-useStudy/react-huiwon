import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TodoProvider } from './context/TodoContext'
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import TodoDetailPage from './pages/TodoDetailPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/todo/:id" element={<TodoDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  )
}

export default App
