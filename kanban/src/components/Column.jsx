import Card from './Card'
import './Column.css'

function Column({ title, cards }) {
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
            <Card key={card.id} card={card} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default Column
