export * from './types'
import { Incident } from 'shared/models'
import { exportJSON } from 'shared/services/files'

import { ExportIncidents } from './types'

export const exportIncidents: ExportIncidents = async () => {
  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]
  const json = JSON.stringify(incidents)
  exportJSON({ data: json, name: 'Incidentes' })
}
