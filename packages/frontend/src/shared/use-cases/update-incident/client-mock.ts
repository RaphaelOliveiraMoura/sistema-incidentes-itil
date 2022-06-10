import { RcFile } from 'antd/lib/upload'

import { FileType, Incident } from 'shared/models'
import { getBase64 } from 'shared/services/files'

import { UpdateIncident } from './types'

export const updateIncident: UpdateIncident = async ({
  id,
  attachments = [],
  ...params
}) => {
  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]

  const incidentIndex = incidents.findIndex((i) => i.id === id)

  if (incidentIndex < 0) throw new Error('IncidentNotFound')

  const richAttachments = await Promise.all(
    attachments.map(async (a) => {
      return {
        ...a,
        url: a.url || (await getBase64(a.originFileObj as RcFile))
      } as FileType
    })
  )

  Object.assign(incidents[incidentIndex], {
    ...params,
    attachments: richAttachments
  })

  localStorage.removeItem('@incidents')
  localStorage.setItem('@incidents', JSON.stringify(incidents))

  return incidents[incidentIndex]
}
