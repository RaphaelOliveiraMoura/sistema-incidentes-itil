import { Incident } from 'shared/models'

export type UpdateIncident = (params: Incident) => Promise<Incident>
