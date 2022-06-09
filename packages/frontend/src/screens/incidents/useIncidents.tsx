import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
  const [availableLimitSize, setAvailableLimitSize] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  const formModal = useModal<string>()
  const formViewModal = useModal<string>()
  const closeModal = useModal<Incident>()
  const deleteModal = useModal<Incident>()

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
        return (
          <Dropdown
            items={[
              {
                label: 'Visualizar',
                onClick: () => formViewModal.open(row.id)
              },
              {
                label: 'Editar',
                onClick: () => formModal.open(row.id),
                hide: row.status === IncidentStatus.closed
              },
              {
                label: 'Fechar',
                onClick: () => closeModal.open(row),
                hide: row.status === IncidentStatus.closed
              },
              {
                label: 'Deletar',
                onClick: () => deleteModal.open(row)
              }
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
      setIncidents(response.incidents)
      setAvailableLimitSize(response.availableLimitSize)
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
        closeModal.close()
      } catch (error) {
        toast.error({ title: 'Erro ao fechar incidente', error })
      } finally {
        setLoading(false)
        listIncidents()
      }
    },
    [listIncidents, closeModal]
  )

  const deleteIncident = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        await client.deleteIncident(id)
        deleteModal.close()
      } catch (error) {
        toast.error({ title: 'Erro ao deletar incidente', error })
      } finally {
        setLoading(false)
        listIncidents()
      }
    },
    [listIncidents, deleteModal]
  )

  const exportIncidents = useCallback(async () => {
    try {
      setLoading(true)
      await client.exportIncidents()
    } catch (error) {
      toast.error({ title: 'Erro ao exportar incidentes', error })
    } finally {
      setLoading(false)
      listIncidents()
    }
  }, [listIncidents])

  const importIncidents = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        if (!e.target.files) return
        const file = e.target.files[0]
        const data = Buffer.from(await file.arrayBuffer()).toString()
        setLoading(true)
        await client.importIncidents(data)
      } catch (error) {
        toast.error({ title: 'Erro ao importar incidentes', error })
      } finally {
        setLoading(false)
        listIncidents()
      }
    },
    [listIncidents]
  )

  useEffect(() => {
    listIncidents()
  }, [listIncidents])

  return {
    rows,
    columns,
    loading,
    formModal,
    formViewModal,
    closeModal,
    deleteModal,
    listIncidents,
    closeIncident,
    deleteIncident,
    exportIncidents,
    importIncidents,
    availableLimitSize
  }
}
