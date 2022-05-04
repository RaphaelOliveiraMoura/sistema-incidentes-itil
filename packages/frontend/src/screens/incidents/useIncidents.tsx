import { useCallback, useEffect, useMemo, useState } from 'react'

import { Button } from 'shared/components'
import { Column, RowData } from 'shared/components/Table/types'
import { useModal } from 'shared/hooks'
import { Incident, IncidentStatus } from 'shared/models'
import { toast } from 'shared/services/toast'
import { client } from 'shared/use-cases'

export const useIncidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(false)

  const formModal = useModal<string | undefined>()
  const closeModal = useModal<Incident>()

  const rows = useMemo<RowData<Incident>[]>(
    () => incidents.map((incident) => ({ rowData: incident })),
    [incidents]
  )

  const columns: Column<Incident>[] = [
    { path: 'id', label: 'Id' },
    { path: 'title', label: 'Título' },
    { path: 'description', label: 'Descrição' },
    { path: 'priority', label: 'Prioridade' },
    {
      path: 'status',
      label: 'Status',
      content: (row) => {
        if (row.status === IncidentStatus.closed) return 'Fechado'
        return (
          <div className="status">
            <Button>Editar</Button>
            <Button onClick={() => closeModal.open(row)}>Fechar</Button>
          </div>
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
