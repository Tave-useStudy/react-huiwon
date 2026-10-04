import { useState, useEffect, useCallback } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const refetch = useCallback(() => {
    setError(null)
    setRetryCount(c => c + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [url, retryCount])

  return { data, loading, error, refetch }
}
