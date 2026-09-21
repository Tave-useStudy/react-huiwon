import { useState } from 'react'
import './TextInput.css'

// 이론 2챕터 Props: 부모(App)가 내려준 onAdd 함수를 구조 분해 할당으로 받음
interface TextInputProps {
  onAdd: (text: string) => void
}

function TextInput({ onAdd }: TextInputProps) {
  // 이론 3챕터 useState: 입력창 값을 state로 관리
  const [value, setValue] = useState('')

  const MAX = 20
  const isOver = value.length > MAX       // 20자 초과 여부
  const isEmpty = value.trim() === ''     // 빈 문자열 여부

  const handleAdd = () => {
    if (isOver || isEmpty) return
    onAdd(value.trim())  // 부모(App)의 addTodo 호출 → 이벤트가 위로 올라감
    setValue('')          // 입력창 초기화
  }

  // Enter 키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="input-card">
      <div className="input-row">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}  // 입력할 때마다 state 업데이트
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
        {/* 이론 1챕터 논리 연산자 &&: isOver가 true일 때만 경고 문구 출력 */}
        {isOver && ' — 20자를 초과했습니다!'}
      </p>
    </div>
  )
}

export default TextInput
