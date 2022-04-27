import styled from 'styled-components'

export const Wrapper = styled.table`
  width: 100%;
  background: #fff;
  cursor: default;
  border-spacing: 0;

  th {
    padding: 8px;
    border-bottom: 1px solid #333;
    border-top: 1px solid #333;
    text-align: left;
  }

  td {
    padding: 8px;
    text-align: left;
  }

  .table-body-row:hover {
    background: #ddd4;
  }

  .table-body-row.selected {
    background: #eee4 !important;
    transition: all 0.4s;
  }
`
