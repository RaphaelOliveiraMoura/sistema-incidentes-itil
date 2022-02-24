import React from 'react'

import * as S from './styles'

export type TooltipPosition = 'top' | 'left' | 'bottom' | 'right'

export type TooltipProps = {
  position?: TooltipPosition
  children: React.ReactNode
  tooltip: string | React.ReactNode
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  tooltip,
  position = 'bottom'
}) => {
  return (
    <S.Wrapper $position={position}>
      <div className="tooltip-hover">{children}</div>
      <div className="tooltip">{tooltip}</div>
    </S.Wrapper>
  )
}
