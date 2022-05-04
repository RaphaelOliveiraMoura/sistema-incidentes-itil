import styled, { css } from 'styled-components'

import { TextProps } from '.'

type WrapperProps = {
  $variant: Pick<TextProps, 'variant'>
}

export const Wrapper = styled.div<WrapperProps>`
  ${(p) =>
    p.$variant === 'title' &&
    css`
      font-size: 18px;
    `}
`
