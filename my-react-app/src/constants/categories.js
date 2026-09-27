export const ALL = 'all'

export const CATEGORIES = [
  { value: 'work',     label: '업무' },
  { value: 'personal', label: '개인' },
  { value: 'study',    label: '공부' },
  { value: 'etc',      label: '기타' },
]

export const CATEGORY_STYLE = {
  work:     { bg: 'var(--blue-100)',    text: 'var(--blue-600)' },
  personal: { bg: 'var(--green-100)',   text: 'var(--green-600)' },
  study:    { bg: 'var(--neutral-200)', text: 'var(--neutral-600)' },
  etc:      { bg: 'var(--neutral-100)', text: 'var(--neutral-500)' },
}
