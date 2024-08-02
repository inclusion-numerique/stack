import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

export const beneficiaireCrasCountSelect = {
  _count: {
    select: {
      crasDemarchesAdministratives: {
        where: { suppression: null },
      },
      crasIndividuels: {
        where: { suppression: null },
      },
      participationsAteliersCollectifs: {
        where: {
          craCollectif: {
            suppression: null,
          },
        },
      },
    },
  },
} satisfies Prisma.BeneficiaireSelect

export const beneficiaireCrasCounts = (beneficiaire: {
  _count: {
    crasDemarchesAdministratives: number
    crasIndividuels: number
    participationsAteliersCollectifs: number
  }
}) => ({
  craDemarchesAdministrativesCount:
    beneficiaire._count.crasDemarchesAdministratives,
  craIndividuelsCount: beneficiaire._count.crasIndividuels,
  participationsAteliersCollectifsCount:
    beneficiaire._count.participationsAteliersCollectifs,
  totalCrasCount:
    beneficiaire._count.crasDemarchesAdministratives +
    beneficiaire._count.crasIndividuels +
    beneficiaire._count.participationsAteliersCollectifs,
})

export const countThematiques = async ({
  beneficiaireId,
}: {
  beneficiaireId: string
}) => {
  const [
    thematiquesIndividuelCounts,
    thematiquesAdministratifCounts,
    thematiquesCollectifCounts,
  ] = await Promise.all([
    prismaClient.$queryRaw`
        SELECT unnest(cras_individuels.thematiques_accompagnement) AS thematique,
               count(*)                                            AS count
        FROM cras_individuels
        WHERE cras_individuels.beneficiaire_id = ${beneficiaireId}::UUID
          AND cras_individuels.suppression IS NULL
        GROUP BY thematique
    `,
    prismaClient.$queryRaw`
        SELECT unnest(cras_demarches_administratives.thematiques_accompagnement) AS thematique,
               count(*)                                                          AS count
        FROM cras_demarches_administratives
        WHERE cras_demarches_administratives.beneficiaire_id = ${beneficiaireId}::UUID
          AND cras_demarches_administratives.suppression IS NULL
        GROUP BY thematique
    `,
    prismaClient.$queryRaw`
        SELECT unnest(cras_collectifs.thematiques_accompagnement) AS thematique,
               count(*)                                           AS count
        FROM cras_collectifs
                 INNER JOIN participants_ateliers_collectifs
                            ON participants_ateliers_collectifs.beneficiaire_id = ${beneficiaireId}::UUID
        WHERE cras_collectifs.suppression IS NULL
        GROUP BY thematique
    `,
  ])

  console.log('COUNTS RAW', {
    thematiquesIndividuelCounts,
    thematiquesAdministratifCounts,
    thematiquesCollectifCounts,
  })

  const thematiquesIndividuel = thematiquesIndividuelCounts.map(
    ({ thematique, count }) => ({
      thematique,
      count,
    }),
  )
  const thematiquesAdministratif = thematiquesAdministratifCounts.map(
    ({ thematique, count }) => ({
      thematique,
      count,
    }),
  )
  const thematiquesCollectif = thematiquesCollectifCounts.map(
    ({ thematique, count }) => ({
      thematique,
      count,
    }),
  )

  return {
    thematiquesIndividuel,
    thematiquesAdministratif,
    thematiquesCollectif,
  }
}
