import { Incident } from 'shared/models'

import { CreateIncident } from './types'

export const createIncident: CreateIncident = async (incidentDAO) => {
  const incident: Incident = {
    ...incidentDAO,
    id: Math.random().toString()
  }

  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]

  incidents.push(incident)

  return incident
}
