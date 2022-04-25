import { Incident } from 'shared/models'

export type CloseIncident = (id: string) => Promise<Incident>
