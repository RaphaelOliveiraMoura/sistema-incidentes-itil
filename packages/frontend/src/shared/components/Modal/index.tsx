import React, { createRef } from 'react'

import { useOnClickOutside } from 'shared/hooks'

import * as S from './styles'

export type ModalProps = {
  onClose: () => void
  isOpen?: boolean
  closeOnClickOutside?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  onClose,
  isOpen = true,
  closeOnClickOutside = true,
  children
}) => {
  const ref = createRef<HTMLDivElement>()

  useOnClickOutside(ref, closeOnClickOutside ? onClose : () => null)

  if (isOpen === false) return <></>

  return (
    <S.Wrapper>
      <S.Content ref={ref}>{children}</S.Content>
    </S.Wrapper>
  )
}
