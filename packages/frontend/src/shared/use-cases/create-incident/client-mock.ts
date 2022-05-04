import { Incident } from 'shared/models'

import { CreateIncident } from './types'

export const createIncident: CreateIncident = async (incidentDAO) => {
  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]

  const biggetsId = Math.max(...incidents.map((i) => Number(i.id)))
  const id = (biggetsId + 1).toString()

  const incident: Incident = {
    ...incidentDAO,
    id
  }

  incidents.push(incident)

  localStorage.setItem('@incidents', JSON.stringify(incidents))

  return incident
}
