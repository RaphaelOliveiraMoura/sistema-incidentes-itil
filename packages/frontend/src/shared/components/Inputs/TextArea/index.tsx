import React from 'react'

import { TextField, TextFieldProps } from '../TextField'

export type TextAreaProps = TextFieldProps

export const TextArea: React.FC<TextAreaProps> = (props) => {
  return <TextField {...props} multline={4} />
}
