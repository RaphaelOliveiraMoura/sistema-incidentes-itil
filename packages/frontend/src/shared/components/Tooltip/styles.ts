import styled, { css } from 'styled-components'

import { TooltipPosition } from '.'

const tooltipSpacing = '4px'

type WrapperProps = {
  $position: TooltipPosition
}

const positionDecorators = {
  top: css`
    top: 0;
    left: 50%;
    transform: translateY(calc(-100% - ${tooltipSpacing})) translateX(-50%);
  `,
  bottom: css`
    bottom: 0;
    left: 50%;
    transform: translateY(calc(100% + ${tooltipSpacing})) translateX(-50%);
  `,
  left: css`
    top: 50%;
    left: 0;
    transform: translateY(-50%) translateX(calc(-100% - ${tooltipSpacing}));
  `,
  right: css`
    top: 50%;
    right: 0;
    transform: translateY(-50%) translateX(calc(100% + ${tooltipSpacing}));
  `
}

export const Wrapper = styled.div<WrapperProps>`
  display: inline-block;
  position: relative;

  .tooltip {
    display: none;
    position: absolute;
    ${(p) => positionDecorators[p.$position]}
  }

  .tooltip-hover:hover + .tooltip {
    display: block;
  }
`
