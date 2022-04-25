import { IncidentStatus, IncidentPriority } from '.'

export type Incident = {
  id: string
  status: IncidentStatus
  title: string
  description: string
  priority: IncidentPriority
  attachments: File[]
}
