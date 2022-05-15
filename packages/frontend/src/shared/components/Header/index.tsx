import React from 'react'
import Image from 'next/image'

import * as S from './styles'

import { Text } from '../Text'
import logoUna from '../../../../public/una.png'

// eslint-disable-next-line @typescript-eslint/ban-types
export type HeaderProps = {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <S.Wrapper>
      <Text variant="headerTitle">Trabalho de Gestão de Incidentes</Text>
      <Image src={logoUna} alt="Logo da instituição de ensino UNA" />
    </S.Wrapper>
  )
}
