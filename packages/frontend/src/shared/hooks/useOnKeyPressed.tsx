import { useEffect } from 'react'

export const KEYS = {
  ARROW_DOWN: 'ArrowDown',
  ARROW_UP: 'ArrowUp'
}

export function useOnKeyPressed(
  key: string,
  handler: (event: KeyboardEvent) => void
): void {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ([event.key, event.code].includes(key)) {
        handler(event)
      }
    }

    document.addEventListener('keydown', listener)

    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [key, handler])
}
