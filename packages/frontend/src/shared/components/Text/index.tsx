import React from 'react'

import * as S from './styles'
import { ValidHtmlTextTags } from './types'

export type TextVariants = 'default' | 'title' | 'subtitle'

export type TextProps = {
  variant?: TextVariants
}

type TagsMap = { [key in TextVariants]: ValidHtmlTextTags }

const tagsMap: TagsMap = {
  default: 'p',
  title: 'h1',
  subtitle: 'h2'
}

export const Text: React.FC<TextProps> = ({
  variant = 'default',
  children
}) => {
  const textHtmlTag = tagsMap[variant]

  return (
    <S.Wrapper as={textHtmlTag} $variant={variant}>
      {children}
    </S.Wrapper>
  )
}
