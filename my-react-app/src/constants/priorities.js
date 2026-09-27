export const PRIORITIES = [
  { value: 'high',   label: '높음', order: 3 },
  { value: 'medium', label: '보통', order: 2 },
  { value: 'low',    label: '낮음', order: 1 },
]

export const PRIORITY_COLOR = {
  high:   'var(--red-500)',
  medium: 'var(--blue-400)',
  low:    'var(--neutral-300)',
}

export const SORT_OPTIONS = [
  { value: 'newest',        label: '최신순' },
  { value: 'oldest',        label: '오래된순' },
  { value: 'priority-desc', label: '우선순위 높은순' },
  { value: 'priority-asc',  label: '우선순위 낮은순' },
]
