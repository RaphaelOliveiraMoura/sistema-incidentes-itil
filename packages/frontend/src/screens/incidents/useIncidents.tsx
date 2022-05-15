import { useCallback, useEffect, useMemo, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { Button, Dropdown } from 'shared/components'
import { Column, RowData } from 'shared/components/Table/types'
import { useModal } from 'shared/hooks'
import { Incident, IncidentStatus } from 'shared/models'
import { toast } from 'shared/services/toast'
import { client } from 'shared/use-cases'

import { incidentPriorityMap } from './options'

export const useIncidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(false)

  const formModal = useModal<string>()
  const closeModal = useModal<Incident>()

  const rows = useMemo<RowData<Incident>[]>(
    () => incidents.map((incident) => ({ rowData: incident })),
    [incidents]
  )

  const columns: Column<Incident>[] = [
    { path: 'id', label: 'Id' },
    { path: 'title', label: 'Título' },
    { path: 'description', label: 'Descrição' },
    {
      path: 'priority',
      label: 'Prioridade',
      content: (row) => incidentPriorityMap[row.priority]
    },
    {
      path: 'status',
      label: 'Status',
      content: (row) =>
        row.status === IncidentStatus.closed ? 'Fechado' : 'Aberto'
    },
    {
      path: 'actions',
      label: 'Ações',
      content: (row) => {
        if (row.status === IncidentStatus.closed) return 'Fechado'
        return (
          <Dropdown
            items={[
              { label: 'Editar', onClick: () => formModal.open(row.id) },
              { label: 'Fechar', onClick: () => closeModal.open(row) }
            ]}
          >
            <Button variant="icon" icon={<BsThreeDotsVertical />} />
          </Dropdown>
        )
      }
    }
  ]

  const listIncidents = useCallback(async () => {
    try {
      setLoading(true)
      const response = await client.listIncidents()
      setIncidents(response)
    } catch (error) {
      toast.error({ title: 'Erro ao listar incidentes', error })
    } finally {
      setLoading(false)
    }
  }, [])

  const closeIncident = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        await client.closeIncident(id)
      } catch (error) {
        toast.error({ title: 'Erro ao fechar incidente', error })
      } finally {
        setLoading(false)
        closeModal.close()
        listIncidents()
      }
    },
    [listIncidents, closeModal]
  )

  useEffect(() => {
    listIncidents()
  }, [listIncidents])

  return {
    rows,
    columns,
    loading,
    formModal,
    closeModal,
    listIncidents,
    closeIncident
  }
}
