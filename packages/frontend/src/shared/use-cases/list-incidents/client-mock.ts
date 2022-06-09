export * from './types'
import { Incident } from 'shared/models'

import { ListIncidents } from './types'

export const listIncidents: ListIncidents = async () => {
  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]

  const localStorageSize =
    new Blob(Object.values(localStorage)).size / 1024 / 1024
  const availableLimitSize = localStorageSize > 5 ? 0 : 5 - localStorageSize

  return {
    incidents,
    availableLimitSize
  }
}
