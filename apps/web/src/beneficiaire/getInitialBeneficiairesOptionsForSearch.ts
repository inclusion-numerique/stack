import { beneficiairesListWhere } from '@app/web/beneficiaire/searchBeneficiaire'
import { prismaClient } from '@app/web/prismaClient'
import { searchBeneficiaireSelect } from '@app/web/beneficiaire/queryBeneficiairesForList'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import { prismaBeneficiaireToBeneficiaireData } from '@app/web/beneficiaire/prismaBeneficiaireToBeneficiaireData'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'

export const getInitialBeneficiairesOptionsForSearch = async ({
  mediateurIds,
  includeBeneficiaireId,
}: {
  mediateurIds: string[]
  includeBeneficiaireId?: string
}) => {
  // Initial list of beneficiaires for pre-populating selected beneficiary or quick select search
  const whereBeneficiaire = beneficiairesListWhere(mediateurIds)
  const beneficiariesForSelect = await prismaClient.beneficiaire.findMany({
    // If we require an included beneficiaire, we exclude it from the search
    // as it will be added in subsequent query
    where: includeBeneficiaireId
      ? {
          AND: [
            {
              id: { not: includeBeneficiaireId },
            },
            whereBeneficiaire,
          ],
        }
      : whereBeneficiaire,
    select: searchBeneficiaireSelect,
    orderBy: [
      { accompagnements: { _count: 'desc' } },
      {
        nom: 'asc',
      },
      {
        prenom: 'asc',
      },
    ],
    take: 20,
  })

  if (includeBeneficiaireId) {
    const includedBeneficiaire = await prismaClient.beneficiaire.findUnique({
      where: {
        ...whereBeneficiaire,
        id: includeBeneficiaireId,
      },
      select: searchBeneficiaireSelect,
    })
    if (includedBeneficiaire) {
      // prepend
      beneficiariesForSelect.unshift(includedBeneficiaire)
    }
  }

  const totalCountBeneficiaires = await prismaClient.beneficiaire.count({
    where: whereBeneficiaire,
  })

  const initialBeneficiairesOptions: BeneficiaireOption[] =
    beneficiariesForSelect.map((beneficiaire) => ({
      label: getBeneficiaireDisplayName({
        nom: beneficiaire.nom,
        prenom: beneficiaire.prenom,
      }),
      value: prismaBeneficiaireToBeneficiaireData(beneficiaire),
    }))

  const beneficiairesNotDisplayed =
    totalCountBeneficiaires - initialBeneficiairesOptions.length

  if (beneficiairesNotDisplayed > 0) {
    initialBeneficiairesOptions.push({
      label: `Veuillez préciser votre recherche - ${
        beneficiairesNotDisplayed
      } bénéficiaire${beneficiairesNotDisplayed === 1 ? ' n’est pas affiché' : 's ne sont pas affichés'}`,
      value: null,
    })
  }

  return initialBeneficiairesOptions
}

export type MostUsedBeneficiairesForSearch = Awaited<
  ReturnType<typeof getInitialBeneficiairesOptionsForSearch>
>
