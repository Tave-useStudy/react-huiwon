import { Outlet } from 'react-router-dom'
import Board from '../components/Board'
import KanbanColumn from '../components/KanbanColumn'
import { COLUMNS } from '../constants/columns'

function BoardPage() {
  return (
    <>
      <h1 className="page-title">Kanban Board</h1>
      <Board>
        {COLUMNS.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </Board>
      {/* 중첩 라우트(/cards/:id)의 모달이 보드 위에 렌더링되는 자리 */}
      <Outlet />
    </>
  )
}

export default BoardPage
