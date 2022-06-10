import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;

  header {
    display: flex;
    justify-content: space-between;
    margin: 16px;

    & > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: end;
    }

    & button {
      margin-left: 8px;
      margin-top: 8px;
    }
  }

  table tbody tr td:nth-child(4) {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
