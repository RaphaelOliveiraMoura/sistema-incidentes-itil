import { Incident, IncidentDAO } from 'shared/models'

export type CreateIncident = (params: IncidentDAO) => Promise<Incident>
