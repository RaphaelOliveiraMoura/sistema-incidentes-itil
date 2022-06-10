import { Incident } from 'shared/models'

export type UpdateIncident = (params: Partial<Incident>) => Promise<Incident>
