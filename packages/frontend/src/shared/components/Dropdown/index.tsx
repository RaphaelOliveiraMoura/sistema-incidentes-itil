import React, { useState } from 'react'

import * as S from './styles'

type DropdownMenuItem = {
  label: string
}

export type DropdownProps = {
  items: DropdownMenuItem[]
}

export const Dropdown: React.FC<DropdownProps> = ({ children, items }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <S.Wrapper $isOpen={isOpen}>
      <div className="anchor" onClick={() => setOpen((prev) => !prev)}>
        {children}
      </div>

      <ul className="menu">
        {items.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>
    </S.Wrapper>
  )
}
