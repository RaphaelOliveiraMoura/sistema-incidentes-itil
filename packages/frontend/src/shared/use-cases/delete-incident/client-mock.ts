import { Incident } from 'shared/models'

import { DeleteIncident } from './types'

export const deleteIncident: DeleteIncident = async (id) => {
  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]

  const incidentIndex = incidents.findIndex((i) => i.id === id)

  if (incidentIndex < 0) throw new Error('IncidentNotFound')

  incidents.splice(incidentIndex, 1)

  localStorage.removeItem('@incidents')
  localStorage.setItem('@incidents', JSON.stringify(incidents))
}
