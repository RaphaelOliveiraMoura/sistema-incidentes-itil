export * from './types'
import { Incident } from 'shared/models'

import { GetIncidentDetails } from './types'

export const getIncidentDetails: GetIncidentDetails = async (id) => {
  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]

  const incident = incidents.find((i) => i.id === id)

  if (!incident) throw new Error('IncidentNotFound')

  return incident
}
