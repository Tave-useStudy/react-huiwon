import { Profiler } from 'react'
import { Outlet } from 'react-router-dom'
import Board from '../components/Board'
import KanbanColumn from '../components/KanbanColumn'
import { COLUMNS } from '../constants/columns'
import { onRenderCallback } from '../utils/profilerLog'

function BoardPage() {
  return (
    <>
      <h1 className="page-title">Kanban Board</h1>
      <Profiler id="Board" onRender={onRenderCallback}>
        <Board>
          {COLUMNS.map((column) => (
            <Profiler key={column.id} id={`Column-${column.id}`} onRender={onRenderCallback}>
              <KanbanColumn column={column} />
            </Profiler>
          ))}
        </Board>
      </Profiler>
      {/* 중첩 라우트(/cards/:id)의 모달이 보드 위에 렌더링되는 자리 */}
      <Outlet />
    </>
  )
}

export default BoardPage
