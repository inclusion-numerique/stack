/* eslint no-underscore-dangle:0 */

import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import {
  formulairesDansDepartementWhere,
  formulairesDansRegionWhere,
  formulairesParticiperTerminesWhere,
  formulairesPorteurTerminesWhere,
} from '@app/web/app/(private-with-navigation)/gouvernances/gouvernanceQueryHelpers'

const statistiquesGouvernanceSelect = {
  id: true,
  _count: {
    select: {
      communesParticipantes: true,
      departementsParticipants: true,
      structuresParticipantes: true,
      epcisParticipantes: true,
    },
  },
} satisfies Prisma.FormulaireGouvernanceSelect

const queryStatistiques = (where?: Prisma.FormulaireGouvernanceWhereInput) =>
  Promise.all([
    // Statistiques pour les porteurs
    prismaClient.formulaireGouvernance
      .findMany({
        where: {
          ...formulairesPorteurTerminesWhere,
          ...where,
        },
        select: statistiquesGouvernanceSelect,
      })
      // Comptage des participants suggerés
      .then((porteurs) => ({
        porteurs: porteurs.length,
        partenairesSuggeres: porteurs
          .map(
            (porteur) =>
              porteur._count.communesParticipantes +
              porteur._count.departementsParticipants +
              porteur._count.epcisParticipantes,
          )
          .reduce((a, b) => a + b, 0),
        structuresSuggerees: porteurs
          .map((porteur) => porteur._count.structuresParticipantes)
          .reduce((a, b) => a + b, 0),
      })),
    // Statistiques pour les "souhaite participer"
    prismaClient.formulaireGouvernance
      .findMany({
        where: {
          ...formulairesParticiperTerminesWhere,
          ...where,
        },
        select: {
          gouvernancePersona: true,
        },
      })
      .then((formulairesParticiper) => ({
        collectivites: formulairesParticiper.filter(
          ({ gouvernancePersona }) => gouvernancePersona !== 'structure',
        ).length,
        structures: formulairesParticiper.filter(
          ({ gouvernancePersona }) => gouvernancePersona === 'structure',
        ).length,
      })),
  ]).then(([porteurs, participer]) => ({
    ...porteurs,
    souhaitentParticiper: participer,
  }))

export type StatistiquesGouvernance = Awaited<
  ReturnType<typeof queryStatistiques>
>

export const getStatistiquesGouvernanceNational = async () =>
  queryStatistiques()

export const getStatistiquesGouvernanceRegion = async (codeRegion: string) =>
  queryStatistiques(formulairesDansRegionWhere(codeRegion))

export const getStatistiquesGouvernanceDepartement = async (
  codeDepartement: string,
) => queryStatistiques(formulairesDansDepartementWhere(codeDepartement))
