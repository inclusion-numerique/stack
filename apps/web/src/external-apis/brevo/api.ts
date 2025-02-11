import { AxiosResponse } from 'axios'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { BrevoContact, createContact } from './contact'

export const createBrevoContact: (
  ...listIds: number[]
) => (
  contact: BrevoContact,
  updateEnabled?: boolean,
) => Promise<AxiosResponse> = createContact(ServerWebAppConfig.Brevo.apiKey)
