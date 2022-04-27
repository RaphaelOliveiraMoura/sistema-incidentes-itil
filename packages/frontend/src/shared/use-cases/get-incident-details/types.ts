import { Incident } from 'shared/models'

export type GetIncidentDetails = (id: string) => Promise<Incident>
