import { useState } from 'react'
import { CATEGORIES } from '../constants/categories'
import { PRIORITIES } from '../constants/priorities'
import './TextInput.css'

// 이론 2챕터 Props: 부모(App)가 내려준 onAdd 함수를 구조 분해 할당으로 받음
function TextInput({ onAdd }) {
  // 이론 3챕터 useState: 입력창 값을 state로 관리
  const [value, setValue] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0].value)
  const [priority, setPriority] = useState(PRIORITIES[1].value)  // 기본값: 보통

  const MAX = 20
  const isOver = value.length > MAX
  const isEmpty = value.trim() === ''

  const handleAdd = () => {
    if (isOver || isEmpty) return
    onAdd(value.trim(), category, priority)
    setValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="input-card">
      <div className="input-row">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="category-select"
        >
          {CATEGORIES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="category-select"
        >
          {PRIORITIES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 입력하세요"
          className={`todo-input${isOver ? ' over' : ''}`}
        />
        {/* 이론 1챕터 논리 연산자 &&: isOver이거나 isEmpty일 때만 disabled */}
        <button onClick={handleAdd} disabled={isOver || isEmpty} className="add-btn">
          추가
        </button>
      </div>

      {/* 이론 1챕터 템플릿 리터럴: 글자 수 표시 */}
      <p className={`char-count${isOver ? ' over' : ''}`}>
        {value.length} / {MAX}자
        {isOver && ' — 20자를 초과했습니다!'}
      </p>
    </div>
  )
}

export default TextInput
