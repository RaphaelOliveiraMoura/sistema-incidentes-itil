import React from 'react'

import { Button, ConfirmModal, Header, Table, Text } from 'shared/components'
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
    closeModal,
    listIncidents,
    closeIncident
  } = useIncidents()

  if (loading) return <div>carregando...</div>

  return (
    <CenteredFullViewPort>
      <Header />

      <S.Wrapper>
        <header>
          <Text variant="title">Listagem de incidentes</Text>
          <Button onClick={() => formModal.open()}>Cadastrar incidente</Button>
        </header>

        <Table rows={rows} columns={columns} />

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
      </S.Wrapper>
    </CenteredFullViewPort>
  )
}
