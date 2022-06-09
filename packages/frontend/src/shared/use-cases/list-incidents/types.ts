import { Incident } from 'shared/models'

export type ListIncidents = () => Promise<{
  incidents: Incident[]
  availableLimitSize: number
}>
