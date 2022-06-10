import { IncidentStatus } from 'shared/models'

export const incidentStatusOptions = [
  { label: 'Aberto', value: IncidentStatus.open },
  { label: 'Fechado', value: IncidentStatus.closed }
]

export const incidentPriorityMap = {
  '5': 'Mínima',
  '4': 'Baixa',
  '3': 'Média',
  '2': 'Alta',
  '1': 'Máxima'
}

export const incidentPriorityOptions = Object.entries(incidentPriorityMap).map(
  ([value, label]) => ({ label, value })
)
