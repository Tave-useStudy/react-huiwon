import './StatusFilter.css'

const TABS = [
  { value: 'all',   label: '전체' },
  { value: 'undone', label: '미완료' },
  { value: 'done',  label: '완료' },
]

// 이론 3챕터 derived state: todos로부터 각 탭의 카운트를 계산
function StatusFilter({ todos, activeStatus, onFilter }) {
  const getCount = (value) => {
    if (value === 'all')   return todos.length
    if (value === 'done')  return todos.filter(t => t.done).length
    return todos.filter(t => !t.done).length
  }

  return (
    <div className="status-filter">
      {TABS.map(({ value, label }) => (
        <button
          key={value}
          className={`status-tab${activeStatus === value ? ' active' : ''}`}
          onClick={() => onFilter(value)}
        >
          {label}
          <span className="status-count">{getCount(value)}</span>
        </button>
      ))}
    </div>
  )
}

export default StatusFilter
