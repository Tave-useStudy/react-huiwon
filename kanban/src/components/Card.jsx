import './Card.css'

function Card({ onClick, children }) {
  // onClick이 있으면 카드 전체를 클릭/키보드(Enter)로 열 수 있게 함
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onClick()
  }

  return (
    <li
      className={`card${onClick ? ' clickable' : ''}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </li>
  )
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
  // 버튼 클릭이 카드 클릭(모달 열기)으로 번지지 않게 막음
  const handleClick = (e) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <button
      className={`icon-btn${variant ? ` ${variant}` : ''}`}
      onClick={handleClick}
      onKeyDown={(e) => e.stopPropagation()}
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
