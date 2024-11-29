import axios, { AxiosError } from 'axios'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { prismaClient } from '@app/web/prismaClient'

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
  id: string
}

const rdvApiStagingUrl =
  'https://demo-rdv-solidarites-pr4786.osc-secnum-fr1.scalingo.io'

const rdvApiProductionUrl =
  'https://demo-rdv-solidarites-todotodo.osc-secnum-fr1.scalingo.io'

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
      mediateur: {
        select: {
          id: true,
        },
      },
      emplois: {
        where: {},
      },
    },
  })

  if (!user) {
    return null
  }

  const emploi = await prismaClient.employeStructure.findFirst({
    where: {
      userId,
      suppression: null,
    },
    select: {
      id: true,
      structure: {
        select: {
          id: true,
          nom: true,
          adresse: true,
          codePostal: true,
          commune: true,
        },
      },
    },
    orderBy: {
      creation: 'desc',
    },
  })

  if (!emploi) {
    return null
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
    emploi,
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
  emploi,
  lieux,
}: UserDataForRdvApiAccountInput): RdvApiCreateAccountInput => ({
  agent: {
    email: user.email,
    external_id: user.id,
    first_name: user.firstName ?? '',
    last_name: user.lastName ?? '',
  },
  organisation: {
    external_id: emploi.structure.id,
    name: emploi.structure.nom,
    address: adresseStructureForRdvApi(emploi.structure),
  },
  lieux: lieux.map((structure) => ({
    name: structure.nom,
    address: adresseStructureForRdvApi(structure),
  })),
})

/**
 * "Permet de créer un compte et une organisation pour un agent. Si le compte ou l'organisation existe déjà, il sera réutilisé"
 */
export const createAccount = async ({
  input,
  deployment = 'production',
}: {
  input: RdvApiCreateAccountInput
  deployment?: 'staging' | 'production'
}) => {
  const response = await axios
    .post<RdvApiCreateAccountResponse>(
      `${deployment === 'production' ? rdvApiProductionUrl : rdvApiStagingUrl}/api/accounts`,
      input,
      {
        headers: {
          'X-COOP-MEDIATION-NUMERIQUE-API-KEY': ServerWebAppConfig.Rdv.apiKey,
          'Content-Type': 'application/json',
        },
      },
    )
    .catch((error: AxiosError) => {
      console.error('RDV API ERROR', error.toJSON())
      throw error
    })

  console.log('RDV RESPONSE STATUS', response.status)
  console.log('RDV RESPONSE DATA', response.data)

  // TODO create a RDV account, ignore existing ?

  return response.data
}
