import styled from 'styled-components'

type WrapperProps = {
  $isOpen: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  .menu {
    display: ${(p) => (p.$isOpen ? 'block' : 'none')};
  }
`
