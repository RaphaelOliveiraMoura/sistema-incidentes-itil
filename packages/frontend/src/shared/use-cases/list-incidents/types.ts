import { Incident } from 'shared/models'

export type ListIncidents = () => Promise<Incident[]>
