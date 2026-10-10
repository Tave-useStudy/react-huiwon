import './Card.css'

function Card({ card }) {
  return (
    <li className="card">
      <h3 className="card-title">{card.title}</h3>
      {card.description && <p className="card-description">{card.description}</p>}
    </li>
  )
}

export default Card
