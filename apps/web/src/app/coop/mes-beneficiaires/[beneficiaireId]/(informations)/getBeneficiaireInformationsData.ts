import { prismaClient } from '@app/web/prismaClient'
import {
  beneficiaireCrasCounts,
  beneficiaireCrasCountSelect,
  countThematiques,
} from '@app/web/beneficiaire/beneficiaireQueries'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'

export const getBeneficiaireInformationsData = async ({
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
      prenom: true,
      nom: true,
      email: true,
      anneeNaissance: true,
      notes: true,
      genre: true,
      trancheAge: true,
      creation: true,
      adresse: true,
      telephone: true,
      pasDeTelephone: true,
      statutSocial: true,
      dateNaissance: true,
      commune: true,
      communeCodePostal: true,
      communeCodeInsee: true,
      ...beneficiaireCrasCountSelect,
    },
  })
  if (!beneficiaire) {
    return null
  }

  const displayName = getBeneficiaireDisplayName(beneficiaire)
  const { totalCrasCount } = beneficiaireCrasCounts(beneficiaire)

  const thematiquesCounts = await countThematiques({ beneficiaireId })

  return {
    displayName,
    beneficiaire,
    thematiquesCounts,
    totalCrasCount,
  }
}

export type BeneficiaireInformationsData = Exclude<
  Awaited<ReturnType<typeof getBeneficiaireInformationsData>>,
  null
>
