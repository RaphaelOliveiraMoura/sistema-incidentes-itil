import React from 'react'

import {
  Button,
  Modal,
  TextField,
  SelectInput,
  Text,
  TextArea,
  Form,
  FileInput
} from 'shared/components'
import { ModalType } from 'shared/hooks'

import { useFormModal } from './useFormModal'
import * as S from './styles'

import * as options from '../../options'

export type FormModalProps = {
  title?: string
  disableFields?: boolean
  modalControl: ModalType<string>
  refreshTable: () => Promise<void>
}

export const FormModal: React.FC<FormModalProps> = (props) => {
  const { modalControl, title, disableFields = false } = props

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
            {title ||
              (isEditing ? 'Editar incidente' : 'Cadastrar novo incidente')}
          </Text>

          <TextField
            label="Título"
            value={formData.title}
            onChange={onChangeValue('title')}
            touched={touchedForm || undefined}
            inputProps={{ disabled: disableFields }}
          />

          <TextArea
            label="Descrição"
            value={formData.description}
            onChange={onChangeValue('description')}
            touched={touchedForm || undefined}
            inputProps={{ disabled: disableFields }}
          />

          <SelectInput
            label="Status"
            value={formData.status}
            options={options.incidentStatusOptions}
            onChange={onChangeValue('status')}
            touched={touchedForm || undefined}
            inputProps={{ disabled: disableFields }}
          />

          <SelectInput
            label="Prioridade"
            value={formData.priority}
            options={options.incidentPriorityOptions}
            onChange={onChangeValue('priority')}
            touched={touchedForm || undefined}
            inputProps={{ disabled: disableFields }}
          />

          <FileInput
            label="Upload de arquivos"
            files={formData.attachments}
            onChange={onChangeValue('attachments')}
            disabled={disableFields}
          />

          {!disableFields && (
            <Button type="submit">
              {isEditing ? 'Atualizar' : 'Cadastrar'}
            </Button>
          )}

          <Button variant="cancel" onClick={modalControl.close}>
            Voltar
          </Button>
        </Form>
      </S.Wrapper>
    </Modal>
  )
}
