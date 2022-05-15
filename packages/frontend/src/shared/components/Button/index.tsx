import React from 'react'

import * as S from './styles'

export type ButtonVariants = 'default' | 'cancel' | 'icon'

export type ButtonProps = {
  variant?: ButtonVariants
  onClick?: () => void
  type?: 'button' | 'submit'
  icon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'default',
  children,
  onClick,
  icon
}) => {
  return (
    <S.Wrapper $variant={variant} $type={type} onClick={onClick} icon={icon}>
      {children}
    </S.Wrapper>
  )
}
