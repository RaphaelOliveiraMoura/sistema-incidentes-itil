import { useCallback, useEffect, useState } from 'react'

import { Option } from 'shared/components'
import { IncidentDAO, IncidentPriority, IncidentStatus } from 'shared/models'
import { toast } from 'shared/services/toast'
import { client } from 'shared/use-cases'

import { validateForm } from './validation'

import * as options from '../../options'

import { FormModalProps } from '.'

export type FormData = {
  title: string
  description: string
  priority: Option
  status: Option
  attachments: File[]
}

const inititalFormData: FormData = {
  title: '',
  description: '',
  priority: { label: '', value: '' },
  status: options.incidentStatusOptions[0],
  attachments: []
}

export const useFormModal = ({
  modalControl,
  refreshTable
}: FormModalProps) => {
  const [formData, setFormData] = useState<FormData>(inititalFormData)
  const [touchedForm, setTouchedForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const id = modalControl.params
  const isEditing = modalControl.params !== undefined

  const cleanupSuccess = useCallback(() => {
    refreshTable()
    modalControl.close()
  }, [refreshTable, modalControl])

  const onChangeValue = (key: keyof typeof formData) => (value: unknown) =>
    setFormData((prev) => ({ ...prev, [key]: value }))

  const parseFormData = (form: FormData): IncidentDAO => {
    return {
      ...form,
      priority: Number(form.priority.value) as IncidentPriority,
      status: form.status.value as IncidentStatus
    }
  }

  const unparseFormData = (dao: IncidentDAO): FormData => {
    const priority = options.incidentPriorityOptions.find(
      (o) => String(o.value) === String(dao.priority)
    )

    const status = options.incidentStatusOptions.find(
      (o) => String(o.value) === String(dao.status)
    )

    return {
      ...dao,
      priority: priority || { label: '', value: '' },
      status: status || { label: '', value: '' }
    }
  }

  const createIncident = useCallback(async () => {
    try {
      setLoading(true)
      setTouchedForm(true)

      const { isValid } = await validateForm(formData)
      if (!isValid)
        return toast.error({ title: 'Preencha todos os campos corretamente' })

      await client.createIncident(parseFormData(formData))

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
      setTouchedForm(true)

      const { isValid } = await validateForm(formData)
      if (!isValid)
        return toast.error({ title: 'Preencha todos os campos corretamente' })

      await client.updateIncident({ id, ...parseFormData(formData) })

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
      setFormData(unparseFormData(response))
    } catch (error) {
      toast.error({ title: 'Erro ao buscar detalhes do incidente', error })
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    getIncidentDetails()
  }, [getIncidentDetails])

  return {
    loading,
    isEditing,
    touchedForm,

    formData,
    onChangeValue,

    createIncident,
    updateIncident
  }
}
