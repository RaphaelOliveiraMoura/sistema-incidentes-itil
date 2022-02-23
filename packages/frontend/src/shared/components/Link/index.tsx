import React from 'react'

import * as S from './styles'

export type LinkVariants = 'default' | 'button'

export type LinkProps = {
  variant?: LinkVariants
  to: string
}

export const Link: React.FC<LinkProps> = ({ to, children }) => {
  return <S.Wrapper href={to}>{children}</S.Wrapper>
}
