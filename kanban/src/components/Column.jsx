import './Column.css'

function Column({ children }) {
  return <section className="column">{children}</section>
}

function ColumnHeader({ title, count }) {
  return (
    <header className="column-header">
      <h2 className="column-title">{title}</h2>
      <span className="column-count">{count}</span>
    </header>
  )
}

function ColumnList({ children }) {
  return <ul className="card-list">{children}</ul>
}

function ColumnEmpty({ children = '카드가 없습니다' }) {
  return <p className="column-empty">{children}</p>
}

Column.Header = ColumnHeader
Column.List = ColumnList
Column.Empty = ColumnEmpty

export default Column
