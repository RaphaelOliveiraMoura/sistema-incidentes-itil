export * from './types'
import { Incident } from 'shared/models'

import { ImportIncidents } from './types'

export const importIncidents: ImportIncidents = async (data) => {
  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]

  const importedIncidents = JSON.parse(data) as Incident[]

  incidents.unshift(...importedIncidents)

  localStorage.setItem('@incidents', JSON.stringify(incidents))
}
