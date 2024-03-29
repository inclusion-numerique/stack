import { prismaClient } from '@app/web/prismaClient'
import { membreSelect } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'

export const getMembreBeneficiaireDataForConvention = async (
  membreGouvernanceId: string,
) => {
  const membre = await prismaClient.membreGouvernance.findUnique({
    where: {
      id: membreGouvernanceId,
    },
    select: {
      ...membreSelect.select,
      gouvernance: {
        select: {
          id: true,
          departement: {
            select: {
              code: true,
              nom: true,
            },
          },
        },
      },
      beneficiaireSubventions: {
        select: {
          id: true,
          subvention: true,
          demandeDeSubvention: {
            select: {
              nomAction: true,
              contexte: true,
              besoins: true,
              description: true,
              id: true,
            },
          },
        },
      },
      beneficiaireDotationFormation: {
        select: {
          id: true,
        },
      },
    },
  })

  if (!membre) {
    return null
  }

  return { membre }
}

export type MembreBeneficiaireDataForConvention = Exclude<
  Awaited<ReturnType<typeof getMembreBeneficiaireDataForConvention>>,
  null
>
