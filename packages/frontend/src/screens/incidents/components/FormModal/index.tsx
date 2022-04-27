import React, { useCallback, useEffect, useState } from 'react'

import { Button, Modal } from 'shared/components'
import { ModalType } from 'shared/hooks'
import { IncidentDAO, IncidentStatus } from 'shared/models'
import { toast } from 'shared/services/toast/implementations/react-toastify'
import { client } from 'shared/use-cases'

export type FormModalProps = {
  modalControl: ModalType<string | undefined>
  refreshTable: () => Promise<void>
}

const inititalFormData: IncidentDAO = {
  title: '',
  description: '',
  priority: 1,
  status: IncidentStatus.open,
  attachments: []
}

export const FormModal: React.FC<FormModalProps> = ({
  modalControl,
  refreshTable
}) => {
  const [formData, setFormData] = useState<IncidentDAO>(inititalFormData)

  const [loading, setLoading] = useState(false)

  const id = modalControl.params
  const isEditing = modalControl.params !== undefined

  const cleanupSuccess = useCallback(() => {
    refreshTable()
    modalControl.close()
  }, [refreshTable, modalControl])

  const createIncident = useCallback(async () => {
    try {
      setLoading(true)
      await client.createIncident(formData)
      toast.success({ title: 'Incidente cadastrado com sucesso' })
      cleanupSuccess()
    } catch (error) {
      toast.error({ title: 'Erro ao cadastrar incidente', error })
    } finally {
      setLoading(false)
    }
  }, [formData, cleanupSuccess])

  const updateIncident = useCallback(async () => {
    try {
      if (!id) return
      setLoading(true)
      await client.updateIncident({ id, ...formData })
      toast.success({ title: 'Incidente atualizado com sucesso' })
      cleanupSuccess()
    } catch (error) {
      toast.error({ title: 'Erro ao atualizar incidente', error })
    } finally {
      setLoading(false)
    }
  }, [id, formData, cleanupSuccess])

  const getIncidentDetails = useCallback(async () => {
    try {
      if (!id) return
      setLoading(true)
      const response = await client.getIncidentDetails(id)
      setFormData(response)
    } catch (error) {
      toast.error({ title: 'Erro ao buscar detalhes do incidente', error })
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    getIncidentDetails()
  }, [getIncidentDetails])

  if (loading) return <div>carregando...</div>

  return (
    <Modal isOpen={modalControl.isOpen} onClose={modalControl.close}>
      form modal
      {isEditing ? (
        <Button type="submit" onClick={updateIncident}>
          Atualizar
        </Button>
      ) : (
        <Button type="submit" onClick={createIncident}>
          Cadastrar
        </Button>
      )}
    </Modal>
  )
}
