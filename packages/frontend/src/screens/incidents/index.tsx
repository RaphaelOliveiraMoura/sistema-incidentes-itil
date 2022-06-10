import React from 'react'
import { Table } from 'antd'

import { Button, ConfirmModal, Header, Text } from 'shared/components'
import { CenteredFullViewPort } from 'shared/templates'

import { FormModal } from './components/FormModal'
import * as S from './styles'
import { useIncidents } from './useIncidents'

export const IncidentsScreens: React.FC = () => {
  const {
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
  } = useIncidents()

  if (loading) return <div>carregando...</div>

  return (
    <CenteredFullViewPort>
      <Header />

      <S.Wrapper>
        <span style={{ margin: 16 }}>
          Limite disponível {availableLimitSize.toFixed(2)} MB
        </span>

        <header>
          <Text variant="title">Listagem de incidentes</Text>

          <div>
            {rows.length > 0 && (
              <Button onClick={exportIncidents} variant="cancel">
                Exportar
              </Button>
            )}

            <Button variant="cancel">
              <label htmlFor="upload">
                Importar
                <input
                  type="file"
                  id="upload"
                  style={{ display: 'none' }}
                  onChange={importIncidents}
                />
              </label>
            </Button>

            <Button onClick={() => formModal.open()}>
              Cadastrar incidente
            </Button>
          </div>
        </header>

        <Table
          columns={columns}
          dataSource={rows}
          scroll={{ x: true }}
          pagination={{ position: ['bottomCenter'] }}
        />

        {formViewModal.isOpen && (
          <FormModal
            title="Visualizar incidente"
            modalControl={formViewModal}
            refreshTable={listIncidents}
            disableFields
          />
        )}

        {formModal.isOpen && (
          <FormModal modalControl={formModal} refreshTable={listIncidents} />
        )}

        {closeModal.isOpen && (
          <ConfirmModal
            isOpen={closeModal.isOpen}
            onClose={closeModal.close}
            onConfirm={() => closeIncident(closeModal.params.id)}
            title={`Deseja mesmo fechar esse incidente ?`}
            description={`Tem certeza que deseja fechar o incidente com id: #${closeModal.params.id}`}
          />
        )}

        {deleteModal.isOpen && (
          <ConfirmModal
            isOpen={deleteModal.isOpen}
            onClose={deleteModal.close}
            onConfirm={() => deleteIncident(deleteModal.params.id)}
            title={`Deseja mesmo deletar esse incidente ?`}
            description={`Tem certeza que deseja deletar o incidente com id: #${deleteModal.params.id}`}
          />
        )}
      </S.Wrapper>
    </CenteredFullViewPort>
  )
}
