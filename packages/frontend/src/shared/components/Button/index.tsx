import React from 'react'

import * as S from './styles'

export type ButtonVariants = 'default' | 'outline'

export type ButtonProps = {
  variant?: ButtonVariants
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <S.Wrapper>{children}</S.Wrapper>
}
