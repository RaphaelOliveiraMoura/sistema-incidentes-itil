import { Incident } from 'shared/models'

import { UpdateIncident } from './types'

export const updateIncident: UpdateIncident = async ({ id, ...params }) => {
  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]

  const incidentIndex = incidents.findIndex((i) => i.id === id)

  if (incidentIndex < 0) throw new Error('IncidentNotFound')

  Object.assign(incidents[incidentIndex], { ...params })

  localStorage.removeItem('@incidents')
  localStorage.setItem('@incidents', JSON.stringify(incidents))

  return incidents[incidentIndex]
}
