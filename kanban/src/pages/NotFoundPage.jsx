import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <>
      <h1 className="page-title">페이지를 찾을 수 없습니다</h1>
      <Link to="/">보드로 돌아가기</Link>
    </>
  )
}

export default NotFoundPage
