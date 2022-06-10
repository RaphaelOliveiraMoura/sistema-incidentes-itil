import { ColumnsType } from 'antd/lib/table'
import React, { useCallback, useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { Button, Dropdown } from 'shared/components'
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

  const columns: ColumnsType<Incident> = [
    {
      title: 'Id',
      dataIndex: 'id',
      render: (_, row) => `#${row.id}`,
      sorter: (a, b) => a.id.localeCompare(b.id)
    },
    {
      title: 'Data criação',
      dataIndex: 'createdAt',
      render: (_, row) =>
        row.createdAt
          ? new Intl.DateTimeFormat('pt-BR').format(new Date(row.createdAt))
          : '---',
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    },
    {
      title: 'Titútlo',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title)
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      sorter: (a, b) => a.description.localeCompare(b.description)
    },
    {
      title: 'Prioridade',
      dataIndex: 'priority',
      render: (_, row: Incident) => incidentPriorityMap[row.priority],
      sorter: (a, b) =>
        a.priority.toString().localeCompare(b.priority.toString())
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, row) => (
        <div
          style={{
            background: row.status === IncidentStatus.closed ? 'red' : 'green',
            width: '100%',
            height: '100%',
            color: 'white',
            textAlign: 'center',
            borderRadius: 8
          }}
        >
          {row.status === IncidentStatus.closed ? 'Fechado' : 'Aberto'}
        </div>
      )
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      render: (_, row) => {
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
        setLoading(true)
        if (!e.target.files) return
        const file = e.target.files[0]
        const data = Buffer.from(await file.arrayBuffer()).toString()
        await client.importIncidents(data)
        toast.success({ title: 'Incidentes importados com sucesso' })
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
    rows: incidents,
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
