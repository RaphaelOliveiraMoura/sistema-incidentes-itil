import { useMemo, useState } from 'react'

export type ModalType<T = boolean> = {
  isOpen: boolean
  params: T
  open: T extends boolean ? () => void : (params?: T) => void
  close: () => void
}

type UseModal = <T = boolean>(initialState?: T) => ModalType<T>

const CLOSE_MODAL_VALUE = 'CLOSE_MODAL_VALUE'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useModal: UseModal = (initialState: any = CLOSE_MODAL_VALUE) => {
  const [params, setParams] = useState(initialState)

  const isOpen = useMemo(() => params !== CLOSE_MODAL_VALUE, [params])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const open = (customParams: any) => setParams(customParams)
  const close = () => setParams(CLOSE_MODAL_VALUE)

  return {
    params,
    isOpen,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    open: open as any,
    close
  }
}
