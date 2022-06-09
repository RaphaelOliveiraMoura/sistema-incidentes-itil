import { RcFile } from 'antd/lib/upload'

import { FileType, Incident } from 'shared/models'

import { CreateIncident } from './types'

const getBase64 = (img: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result as string))
    reader.addEventListener('error', (err) => reject(err))
    reader.readAsDataURL(img)
  })

export const createIncident: CreateIncident = async (incidentDAO) => {
  const incidentsRaw = localStorage.getItem('@incidents') || '[]'
  const incidents = JSON.parse(incidentsRaw) as Incident[]

  const firstIndex = 0
  const biggetsId = Math.max(...incidents.map((i) => Number(i.id)), firstIndex)
  const id = (biggetsId + 1).toString()

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
    id
  }

  incidents.unshift(incident)

  localStorage.setItem('@incidents', JSON.stringify(incidents))

  return incident
}
