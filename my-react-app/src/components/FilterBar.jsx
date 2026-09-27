import { ALL, CATEGORIES } from '../constants/categories'
import './FilterBar.css'

// 이론 1챕터 배열 고차함수: filter()로 카테고리별 개수 계산
function FilterBar({ todos, activeCategory, onFilter }) {
  const getCount = (value) =>
    value === ALL
      ? todos.length
      : todos.filter(t => t.category === value).length

  return (
    <div className="filter-bar">
      <button
        className={`filter-btn${activeCategory === ALL ? ' active' : ''}`}
        onClick={() => onFilter(ALL)}
      >
        전체 <span className="filter-count">{getCount(ALL)}</span>
      </button>

      {CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          className={`filter-btn${activeCategory === value ? ' active' : ''}`}
          onClick={() => onFilter(value)}
        >
          {label} <span className="filter-count">{getCount(value)}</span>
        </button>
      ))}
    </div>
  )
}

export default FilterBar
