import { prismaClient } from '@app/web/prismaClient'
import {
  beneficiaireCrasCounts,
  beneficiaireCrasCountSelect,
} from '@app/web/beneficiaire/beneficiaireQueries'
import {
  getActivites,
  groupActivitesByDate,
} from '@app/web/cra/activitesQueries'

export const getBeneficiaireAccompagnementsPageData = async ({
  beneficiaireId,
  mediateurId,
}: {
  beneficiaireId: string
  // The mediateur making the request (for security check)
  mediateurId: string
}) => {
  const beneficiaire = await prismaClient.beneficiaire.findUnique({
    where: {
      id: beneficiaireId,
      // Only query the beneficiaire if it belongs to the mediateur
      mediateurId,
      suppression: null,
    },
    select: {
      id: true,
      mediateurId: true,
      prenom: true,
      nom: true,
      anneeNaissance: true,
      ...beneficiaireCrasCountSelect,
    },
  })
  if (!beneficiaire) {
    return null
  }

  const activites = await getActivites({ beneficiaireId })

  const activitesByDate = groupActivitesByDate(activites)

  const { totalCrasCount } = beneficiaireCrasCounts(beneficiaire)

  return {
    beneficiaire,
    activitesByDate,
    totalCrasCount,
  }
}

export type BeneficiaireAccompagnementsPageData = Exclude<
  Awaited<ReturnType<typeof getBeneficiaireAccompagnementsPageData>>,
  null
>
