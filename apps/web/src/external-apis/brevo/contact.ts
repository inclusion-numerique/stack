import axios, { AxiosResponse } from 'axios'

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

export const createContact =
  (apiKey: string) =>
  (...listIds: number[]) =>
  async (
    contact: BrevoContact,
    updateEnabled: boolean = true,
  ): Promise<AxiosResponse> =>
    axios.post(
      'https://api.brevo.com/v3/contacts',
      {
        ...contact,
        listIds,
        updateEnabled,
      },
      {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
      },
    )
