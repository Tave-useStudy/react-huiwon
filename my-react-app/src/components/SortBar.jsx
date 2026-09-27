import { SORT_OPTIONS } from '../constants/priorities'
import './SortBar.css'

function SortBar({ sortBy, onSort }) {
  return (
    <select
      value={sortBy}
      onChange={e => onSort(e.target.value)}
      className="sort-select"
    >
      {SORT_OPTIONS.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  )
}

export default SortBar
