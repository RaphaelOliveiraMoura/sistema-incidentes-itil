import React from 'react'

import * as S from './styles'

export type ButtonVariants = 'default' | 'cancel'

export type ButtonProps = {
  variant?: ButtonVariants
  onClick?: () => void
  type?: 'button' | 'submit'
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'default',
  children,
  onClick
}) => {
  return (
    <S.Wrapper $variant={variant} onClick={onClick} type={type}>
      {children}
    </S.Wrapper>
  )
}
