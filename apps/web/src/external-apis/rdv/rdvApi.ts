import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { prismaClient } from '@app/web/prismaClient'
import axios, { AxiosError } from 'axios'

export type RdvApiLieuInput = {
  // external_id: string // not yet implemented on rdv side
  name: string
  address: string
}

export type RdvApiCreateAccountInput = {
  agent: {
    email: string
    first_name: string
    last_name: string
    external_id: string
  }
  organisation: {
    name: string
    address: string
    external_id: string // our user id
  }
  lieux: RdvApiLieuInput[]
}

export type RdvApiCreateAccountResponse = {
  id: number // integer id
}

export const getUserRdvApiData = async ({ userId }: { userId: string }) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
      deleted: null,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      name: true,
      mediateur: {
        select: {
          id: true,
          coordinations: {
            select: {
              id: true,
              coordinateur: {
                select: {
                  id: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
            where: {
              suppression: null,
            },
            orderBy: {
              creation: 'desc',
            },
          },
        },
      },
      coordinateur: {
        select: {
          id: true,
        },
      },
    },
  })

  if (!user) {
    return null
  }

  // L’organisation côté RDV Aide Numérique sera l'équipe de l'utilisateur
  // Sinon l'utilisateur lui meme si il est coordinateur ou sans équipe

  const coordinationLaPlusRecente = user.mediateur?.coordinations?.at(0)

  const equipe = user.coordinateur
    ? {
        // If user is coordinateur, we use the team of the coordinateur
        id: user.coordinateur.id,
        name: user.name,
      }
    : coordinationLaPlusRecente
      ? {
          // Si mediateur coordonné et a au moins un coordo, on utilise la coordination la plus récente
          id: coordinationLaPlusRecente.coordinateur.user.id,
          name: coordinationLaPlusRecente.coordinateur.user.name,
        }
      : {
          // Sinon on utilise l’utilisateur lui meme
          id: user.id,
          name: user.name,
        }

  const lieux = user.mediateur
    ? await prismaClient.structure.findMany({
        where: {
          mediateursEnActivite: {
            some: {
              mediateurId: user.mediateur.id,
              suppression: null,
            },
          },
        },
        select: {
          id: true,
          nom: true,
          adresse: true,
          codePostal: true,
          commune: true,
        },
      })
    : []

  return {
    user,
    equipe,
    lieux,
  }
}

export type UserDataForRdvApiAccountInput = Exclude<
  Awaited<ReturnType<typeof getUserRdvApiData>>,
  null
>

// e.g. "21 rue des Ardennes, Paris, 75019"
const adresseStructureForRdvApi = ({
  adresse,
  codePostal,
  commune,
}: {
  adresse: string
  codePostal: string
  commune: string
}) => `${adresse}, ${commune}, ${codePostal}`

export const userToRdvApiInput = ({
  user,
  equipe,
  lieux,
}: UserDataForRdvApiAccountInput): RdvApiCreateAccountInput => ({
  agent: {
    email: user.email,
    external_id: user.id,
    first_name: user.firstName ?? '',
    last_name: user.lastName ?? '',
  },
  organisation: {
    external_id: equipe.id,
    name: equipe.name || 'Mon équipe',
    address: 'Mon équipe',
  },
  lieux: lieux.map((structure) => ({
    name: structure.nom,
    address: adresseStructureForRdvApi(structure),
  })),
})

const rdvServicePublicAccountsApiUrl = `https://${PublicWebAppConfig.RdvServicePublic.OAuth.hostname}/api/coop-mediation-numerique/accounts`

/**
 * "Permet de créer un compte et une organisation pour un agent. Si le compte ou l'organisation existe déjà, il sera réutilisé"
 * Cette fonction n’impacte pas la base de données de la coop et ne modifie pas l'utilisateur.
 */
export const createAccount = async ({
  input,
}: {
  input: RdvApiCreateAccountInput
}) => {
  const response = await axios
    .post<RdvApiCreateAccountResponse>(rdvServicePublicAccountsApiUrl, input, {
      headers: {
        'X-COOP-MEDIATION-NUMERIQUE-API-KEY':
          ServerWebAppConfig.RdvServicePublic.apiKey,
        'Content-Type': 'application/json',
      },
    })
    .catch((error: AxiosError) => {
      // biome-ignore lint/suspicious/noConsole: needed for debugging while not in prod
      console.error('RDV API ERROR', error.toJSON())
      throw error
    })

  return response.data
}
