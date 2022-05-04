import React from 'react'

import { Modal, Text } from 'shared/components'
import { Button } from 'shared/components/Button'

import * as S from './styles'

import { ModalProps } from '..'

export type ConfirmModalProps = ModalProps & {
  title: string
  description: string
  onConfirm: () => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  description,
  closeOnClickOutside = false,
  onConfirm,
  ...props
}) => {
  return (
    <Modal {...props} closeOnClickOutside={closeOnClickOutside}>
      <S.Wrapper>
        <Text variant="title">{title}</Text>
        <Text>{description}</Text>

        <div className="actions">
          <Button variant="cancel" onClick={props.onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </div>
      </S.Wrapper>
    </Modal>
  )
}
