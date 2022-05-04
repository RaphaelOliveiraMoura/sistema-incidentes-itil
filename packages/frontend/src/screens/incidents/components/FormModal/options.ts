import { IncidentStatus } from 'shared/models'

export const incidentStatusOptions = [
  { label: 'Aberto', value: IncidentStatus.open },
  { label: 'Fechado', value: IncidentStatus.closed }
]

export const incidentPriorityOptions = [
  { label: 'Máxima', value: '5' },
  { label: 'Mínima', value: '1' }
]
