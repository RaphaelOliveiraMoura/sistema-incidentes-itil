export * from './types'
import { Incident } from 'shared/models'

import { ListIncidents } from './types'

export const listIncidents: ListIncidents = async () => {
  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]

  return incidents
}
