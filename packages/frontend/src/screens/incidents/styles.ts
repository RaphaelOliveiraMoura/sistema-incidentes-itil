import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;

  header {
    display: flex;
    justify-content: space-between;
    margin: 16px;

    & button {
      margin-left: 8px;
    }
  }

  #no-options {
    width: 100%;
    text-align: center;
    margin: 16px;
  }

  table tbody tr td:nth-child(3) {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
