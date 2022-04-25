import { Incident, IncidentStatus } from 'shared/models'

import { CloseIncident } from './types'

export const closeIncident: CloseIncident = async (id) => {
  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]

  const incidentIndex = incidents.findIndex((i) => i.id === id)

  if (incidentIndex < 0) throw new Error('IncidentNotFound')

  incidents[incidentIndex].status = IncidentStatus.closed

  localStorage.removeItem('@incidents')
  localStorage.setItem('@incidents', JSON.stringify(incidents))

  return incidents[incidentIndex]
}
