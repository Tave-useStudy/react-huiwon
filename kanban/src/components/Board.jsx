import './Board.css'

// 레이아웃만 담당 — 무엇을 그릴지는 children으로 받음
function Board({ children }) {
  return <div className="board">{children}</div>
}

export default Board
