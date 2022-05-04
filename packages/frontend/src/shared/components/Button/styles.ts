import styled, { css } from 'styled-components'

import { ButtonVariants } from '.'

type WrapperProps = {
  $variant: ButtonVariants
}

export const Wrapper = styled.button<WrapperProps>`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background: #2155cd;
  color: #fff;

  ${(props) =>
    props.$variant === 'cancel' &&
    css`
      background: #e8f9fd;
      color: #333;
    `};
`
