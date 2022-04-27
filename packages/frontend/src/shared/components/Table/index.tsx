import React from 'react'

import * as S from './styles'
import { Column, RowData } from './types'

export type TableProps = {
  columns: Column[]
  rows: RowData[]
}

export const Table: React.FC<TableProps> = ({ columns, rows }) => {
  return (
    <S.Wrapper>
      <thead className="table-header">
        <tr className="table-header-row">
          {columns.map((column, columnIndex) => {
            const headerKey = `header-${columnIndex}-${column.path}`
            return (
              <th className="table-header-column" key={headerKey}>
                {typeof column.label === 'function'
                  ? column.label()
                  : column.label}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody className="table-body">
        {rows.map((row, rowIndex) => {
          const rowKey = `row-${rowIndex}`
          const { rowData, params } = row
          const { rowClassName, onClick = () => null } = params || {}

          const customRowClassName = rowClassName || ''
          const rowClasses = `table-body-row ${customRowClassName}`

          return (
            <tr
              className={rowClasses}
              key={rowKey}
              onClick={() => onClick(rowData)}
            >
              {columns.map((column, columnIndex) => {
                const columnkey = `column-${rowIndex}-${columnIndex}`
                const rowValue = rowData[column.path]

                const renderData = column.content
                  ? column.content(rowData)
                  : rowValue

                return (
                  <td className="table-body-column" key={columnkey}>
                    {renderData}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </S.Wrapper>
  )
}
