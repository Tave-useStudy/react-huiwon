import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { COLUMNS } from '../constants/columns'
import { INITIAL_CARDS } from '../constants/initialCards'

// Provider 없이 어디서든 useBoardStore(selector)로 꺼내 씀
// persist: cards를 localStorage('kanban-board')에 자동 저장/복원
export const useBoardStore = create(
  persist(
    (set) => ({
      cards: INITIAL_CARDS,

      addCard: (status, title) =>
        set((state) => ({
          cards: [...state.cards, { id: crypto.randomUUID(), title, description: '', status }],
        })),

      deleteCard: (id) =>
        set((state) => ({ cards: state.cards.filter((card) => card.id !== id) })),

      // direction: -1 이면 왼쪽 컬럼, +1 이면 오른쪽 컬럼으로 이동
      moveCard: (id, direction) =>
        set((state) => ({
          cards: state.cards.map((card) => {
            if (card.id !== id) return card
            const index = COLUMNS.findIndex((column) => column.id === card.status)
            const next = COLUMNS[index + direction]
            return next ? { ...card, status: next.id } : card
          }),
        })),

      // changes: { title, description } 중 바꿀 값만
      updateCard: (id, changes) =>
        set((state) => ({
          cards: state.cards.map((card) => (card.id === id ? { ...card, ...changes } : card)),
        })),
    }),
    { name: 'kanban-board' },
  ),
)
