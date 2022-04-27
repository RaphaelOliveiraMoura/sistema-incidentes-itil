import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Button, Table, Text } from 'shared/components'
import { client } from 'shared/use-cases'
import { Column, RowData } from 'shared/components/Table/types'
import { Incident } from 'shared/models'
import { CenteredFullViewPort } from 'shared/templates'
import { useModal } from 'shared/hooks'
import { toast } from 'shared/services/toast'

import { FormModal } from './components/FormModal'

export const IncidentsScreens: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(false)

  const formModal = useModal<string | undefined>()

  const rows = useMemo<RowData<Incident>[]>(
    () => incidents.map((incident) => ({ rowData: incident })),
    [incidents]
  )

  const columns: Column[] = [
    { path: 'id', label: 'Id' },
    { path: 'title', label: 'Título' },
    { path: 'description', label: 'Descrição' },
    { path: 'priority', label: 'Prioridade' }
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

  useEffect(() => {
    listIncidents()
  }, [listIncidents])

  if (loading) return <div>carregando...</div>

  return (
    <CenteredFullViewPort>
      <Text>Listagem de incidentes</Text>
      <Button onClick={() => formModal.open()}>Cadastrar incidente</Button>
      <Table rows={rows} columns={columns} />

      {formModal.isOpen && (
        <FormModal modalControl={formModal} refreshTable={listIncidents} />
      )}
    </CenteredFullViewPort>
  )
}
