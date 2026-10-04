import { useCallback } from 'react'

export function useLocalStorage(key, initialValue) {
  const load = useCallback(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  }, [])

  const save = useCallback((value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }, [key])

  return [load, save]
}
