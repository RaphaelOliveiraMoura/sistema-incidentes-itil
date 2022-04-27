// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Column<T = any> = {
  label: string | (() => React.ReactElement)
  path: string
  content?: (data: T) => React.ReactElement | string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RowData<T = any> = {
  rowData: T
  params?: {
    rowClassName?: string
    onClick?: (data: T) => void
  }
}
