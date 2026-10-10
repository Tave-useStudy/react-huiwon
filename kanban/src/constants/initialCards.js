// 1단계용 더미 데이터 — 카드 하나의 배열에 status로 컬럼을 표현
export const INITIAL_CARDS = [
  { id: 1, title: '칸반 보드 기획하기', description: '필요한 기능과 화면 정리', status: 'done' },
  { id: 2, title: '컴포넌트 구조 설계', description: 'Board / Column / Card 나누기', status: 'done' },
  { id: 3, title: '정적 UI 만들기', description: '더미 데이터로 보드 그리기', status: 'doing' },
  { id: 4, title: '카드 이동 기능', description: '버튼으로 상태 변경', status: 'todo' },
  { id: 5, title: '카드 상세 모달', description: '상세 보기 / 수정', status: 'todo' },
]
