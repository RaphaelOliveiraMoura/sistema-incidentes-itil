// https://usehooks.com/useOnClickOutside/

import { MutableRefObject, useEffect } from 'react'

const mouseClickMap = {
  LEFT_CLICK: 1,
  MIDDLE_CLICK: 2,
  RIGHT_CLICK: 3
}

export function useOnClickOutside<T>(
  ref: MutableRefObject<T>,
  handler: (event: globalThis.MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: globalThis.MouseEvent | TouchEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const current: any = ref && ref.current

      // TODO: improve this function removing deprecated which property
      if (event.which !== mouseClickMap.LEFT_CLICK) return

      if (!current || current.contains(event.target)) return

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
