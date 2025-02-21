import {
  beneficiaireAccompagnementsCountSelect,
  countThematiques,
} from '@app/web/beneficiaire/beneficiaireQueries'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import { prismaClient } from '@app/web/prismaClient'

export const getBeneficiaireInformationsPageData = async ({
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
      commune: true,
      communeCodePostal: true,
      communeCodeInsee: true,
      ...beneficiaireAccompagnementsCountSelect,
    },
  })
  if (!beneficiaire) {
    return null
  }

  const displayName = getBeneficiaireDisplayName(beneficiaire)

  const thematiquesCounts = await countThematiques({
    beneficiaireId,
    mediateurId,
  })

  return {
    displayName,
    beneficiaire,
    thematiquesCounts,
  }
}

export type BeneficiaireInformationsPageData = Exclude<
  Awaited<ReturnType<typeof getBeneficiaireInformationsPageData>>,
  null
>
