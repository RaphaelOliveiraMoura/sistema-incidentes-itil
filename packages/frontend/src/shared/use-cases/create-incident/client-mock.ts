import { RcFile } from 'antd/lib/upload'

import { FileType, Incident } from 'shared/models'
import { getBase64 } from 'shared/services/files'

import { CreateIncident } from './types'

export const createIncident: CreateIncident = async (incidentDAO) => {
  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]

  const id = (Math.random() * 10000).toFixed(0).toString()

  const attachments = await Promise.all(
    incidentDAO.attachments.map(async (a) => {
      return {
        ...a,
        url: await getBase64(a.originFileObj as RcFile)
      } as FileType
    })
  )

  const incident: Incident = {
    ...incidentDAO,
    attachments,
    id,
    createdAt: new Date().toISOString()
  }

  incidents.unshift(incident)

  localStorage.setItem('@incidents', JSON.stringify(incidents))

  return incident
}
