import React from 'react'
import { Dropdown as AntdDropdown, Menu as AntdMenu } from 'antd'

import * as S from './styles'

type DropdownMenuItem = {
  label: string
  onClick: () => void
  hide?: boolean
}

export type DropdownProps = {
  items: DropdownMenuItem[]
}

export const Dropdown: React.FC<DropdownProps> = ({ children, items }) => {
  const antdItems = items
    .filter(({ hide = false }) => !hide)
    .map((item) => ({
      key: item.label,
      label: <div onClick={item.onClick}>{item.label}</div>
    }))

  return (
    <S.Wrapper>
      <AntdDropdown
        overlay={<AntdMenu items={antdItems} />}
        trigger={['click']}
      >
        <div>{children}</div>
      </AntdDropdown>
    </S.Wrapper>
  )
}
