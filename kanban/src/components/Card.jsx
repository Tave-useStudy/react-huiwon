import './Card.css'

function Card({ children }) {
  return <li className="card">{children}</li>
}

function CardTitle({ children }) {
  return <h3 className="card-title">{children}</h3>
}

function CardDescription({ children }) {
  if (!children) return null
  return <p className="card-description">{children}</p>
}

function CardActions({ children }) {
  return <div className="card-actions">{children}</div>
}

function CardAction({ label, onClick, disabled, variant, children }) {
  return (
    <button
      className={`icon-btn${variant ? ` ${variant}` : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </button>
  )
}

Card.Title = CardTitle
Card.Description = CardDescription
Card.Actions = CardActions
Card.Action = CardAction

export default Card
