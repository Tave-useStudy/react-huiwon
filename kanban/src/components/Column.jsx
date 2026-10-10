import AddCardForm from './AddCardForm'
import Card from './Card'
import './Column.css'

// onDelete, onMove는 Column에서 쓰지 않고 Card로 전달만 함 (props drilling)
function Column({ title, cards, onAdd, onDelete, onMove }) {
  return (
    <section className="column">
      <header className="column-header">
        <h2 className="column-title">{title}</h2>
        <span className="column-count">{cards.length}</span>
      </header>

      {cards.length === 0 ? (
        <p className="column-empty">카드가 없습니다</p>
      ) : (
        <ul className="card-list">
          {cards.map((card) => (
            <Card key={card.id} card={card} onDelete={onDelete} onMove={onMove} />
          ))}
        </ul>
      )}

      <AddCardForm onAdd={onAdd} />
    </section>
  )
}

export default Column
