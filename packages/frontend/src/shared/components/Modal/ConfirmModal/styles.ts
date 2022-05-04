import styled from 'styled-components'

import { Wrapper as Text } from 'shared/components/Text/styles'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 26px;

  ${Text} {
    margin-bottom: 8px;
  }

  .actions {
    display: flex;
    margin-top: 16px;

    button + button {
      margin-left: 16px;
    }
  }
`
