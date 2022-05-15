import React from 'react'

import {
  Button,
  Modal,
  TextField,
  SelectInput,
  Text,
  TextArea,
  Form
} from 'shared/components'
import { ModalType } from 'shared/hooks'

import { useFormModal } from './useFormModal'
import * as S from './styles'

import * as options from '../../options'

export type FormModalProps = {
  modalControl: ModalType<string>
  refreshTable: () => Promise<void>
}

export const FormModal: React.FC<FormModalProps> = (props) => {
  const { modalControl } = props

  const {
    loading,
    isEditing,
    touchedForm,

    formData,
    onChangeValue,

    createIncident,
    updateIncident
  } = useFormModal(props)

  if (loading) return <div>carregando...</div>

  return (
    <Modal
      isOpen={modalControl.isOpen}
      onClose={modalControl.close}
      closeOnClickOutside={false}
    >
      <S.Wrapper>
        <Form onSubmit={isEditing ? updateIncident : createIncident}>
          <Text variant="title">
            {isEditing ? 'Editar incidente' : 'Cadastrar novo incidente'}
          </Text>

          <TextField
            label="Título"
            value={formData.title}
            onChange={onChangeValue('title')}
            touched={touchedForm || undefined}
          />

          <TextArea
            label="Descrição"
            value={formData.description}
            onChange={onChangeValue('description')}
            touched={touchedForm || undefined}
          />

          <SelectInput
            label="Status"
            value={formData.status}
            options={options.incidentStatusOptions}
            onChange={onChangeValue('status')}
            touched={touchedForm || undefined}
          />

          <SelectInput
            label="Prioridade"
            value={formData.priority}
            options={options.incidentPriorityOptions}
            onChange={onChangeValue('priority')}
            touched={touchedForm || undefined}
          />

          <Button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</Button>
          <Button variant="cancel" onClick={modalControl.close}>
            Cancelar
          </Button>
        </Form>
      </S.Wrapper>
    </Modal>
  )
}
