import { useEffect, useState } from 'react'

// useState gibi çalışır, değer değişince localStorage'a da yazar.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Depolama kapalıysa uygulama yine çalışır, sadece kalıcı olmaz.
    }
  }, [key, value])

  return [value, setValue] as const
}
