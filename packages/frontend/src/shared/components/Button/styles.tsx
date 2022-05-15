import { Button as AntdButton } from 'antd'
import React, { ComponentProps } from 'react'

import { ButtonVariants } from '.'

type WrapperProps = {
  $variant: ButtonVariants
  $type: 'button' | 'submit'
}

const antdVariantTypeMap: { [key in ButtonVariants]: 'primary' | undefined } = {
  default: 'primary',
  cancel: undefined,
  icon: undefined
}

type AntdButtonProps = ComponentProps<typeof AntdButton>

export const Wrapper: React.FC<WrapperProps & AntdButtonProps> = ({
  $variant,
  $type,
  ...props
}) => (
  <AntdButton
    type={antdVariantTypeMap[$variant]}
    shape={$variant === 'icon' ? 'circle' : undefined}
    htmlType={$type}
    {...props}
  />
)
