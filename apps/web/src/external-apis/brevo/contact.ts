import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import axios, { AxiosResponse } from 'axios'
import pThrottle from 'p-throttle'

type User = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  phone: string | null
  mediateur:
    | ({ conseillerNumerique: { id: string | null } | null } & {
        id: string | null
      })
    | null
  coordinateur: {
    id: string | null
    conseillerNumeriqueId: string | null
  } | null
}

type BrevoContactAttibutes = {
  FIRSTNAME: string
  LASTNAME: string
  SMS: string
  ROLES: string[]
}

export type BrevoContact = {
  ext_id: string
  email: string
  attributes: BrevoContactAttibutes
}

export const toBrevoContact = (user: User): BrevoContact => ({
  ext_id: user.id,
  email: user.email,
  attributes: {
    FIRSTNAME: user.firstName ?? '',
    LASTNAME: user.lastName ?? '',
    SMS: user.phone ?? '',
    ROLES: [
      ...(user.mediateur?.id == null ? [] : ['Médiateur']),
      ...(user.mediateur?.conseillerNumerique?.id == null
        ? []
        : ['Conseiller numérique']),
      ...(user.coordinateur?.id == null ? [] : ['Coordinateur']),
      ...(user.coordinateur?.conseillerNumeriqueId == null
        ? []
        : ['Coordinateur de conseiller numérique']),
    ],
  },
})

export const onlyWithBrevoRole = (contact: {
  attributes: BrevoContactAttibutes
}) => contact.attributes.ROLES.length > 0

const brevoApiThrottle = pThrottle({
  limit: 10,
  interval: 1100, // 10/1000 but adding a margin of error
})

const createContactImmediate = ({
  listIds,
  contact,
  updateEnabled = true,
}: {
  listIds: number[]
  contact: BrevoContact
  updateEnabled?: boolean
}): Promise<AxiosResponse> =>
  axios.post(
    'https://api.brevo.com/v3/contacts',
    {
      ...contact,
      listIds,
      updateEnabled,
    },
    {
      headers: {
        'api-key': ServerWebAppConfig.Brevo.apiKey,
        'Content-Type': 'application/json',
      },
    },
  )

export const createContact = brevoApiThrottle(createContactImmediate)
