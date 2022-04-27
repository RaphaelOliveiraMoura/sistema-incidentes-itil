import { closeIncidentClient } from './close-incident'
import { createIncidentClient } from './create-incident'
import { getIncidentDetailsClient } from './get-incident-details'
import { listIncidentsClient } from './list-incidents'
import { updateIncidentClient } from './update-incident'

export const client = {
  closeIncident: closeIncidentClient,
  createIncident: createIncidentClient,
  getIncidentDetails: getIncidentDetailsClient,
  listIncidents: listIncidentsClient,
  updateIncident: updateIncidentClient
}
