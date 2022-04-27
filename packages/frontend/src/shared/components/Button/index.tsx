import React from 'react'

import * as S from './styles'

export type ButtonVariants = 'default' | 'outline'

export type ButtonProps = {
  variant?: ButtonVariants
  onClick?: () => void
  type?: 'button' | 'submit'
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  children,
  onClick
}) => {
  return (
    <S.Wrapper onClick={onClick} type={type}>
      {children}
    </S.Wrapper>
  )
}
