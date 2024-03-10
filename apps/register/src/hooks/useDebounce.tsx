import { useEffect, useState } from 'react'

export function useDebounce<T> (value: T, delay = 700): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const hanlder = setTimeout(
      () => setDebouncedValue(value),
      delay
    )

    return () => {
      clearTimeout(hanlder)
    }
  }, [value, delay])

  return debouncedValue
}
