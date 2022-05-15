import styled, { css } from 'styled-components'

import { TextVariants } from '.'

type WrapperProps = {
  $variant: TextVariants
}

export const Wrapper = styled.div<WrapperProps>`
  ${(p) =>
    p.$variant === 'title' &&
    css`
      font-size: 18px;
    `}

  ${(p) =>
    p.$variant === 'headerTitle' &&
    css`
      font-size: 32px;
      font-weight: normal;
    `}
`
