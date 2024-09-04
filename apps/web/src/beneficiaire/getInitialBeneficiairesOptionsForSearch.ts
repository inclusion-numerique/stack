import { SelectOption } from '@app/ui/components/Form/utils/options'
import { beneficiairesListWhere } from '@app/web/beneficiaire/searchBeneficiaire'
import { prismaClient } from '@app/web/prismaClient'
import { searchBeneficiaireSelect } from '@app/web/beneficiaire/queryBeneficiairesForList'
import { BeneficiaireData } from '@app/web/beneficiaire/BeneficiaireValidation'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import { prismaBeneficiaireToBeneficiaireData } from '@app/web/beneficiaire/prismaBeneficiaireToBeneficiaireData'

export const getInitialBeneficiairesOptionsForSearch = async ({
  mediateurId,
  includeBeneficiaireId,
}: {
  mediateurId: string
  includeBeneficiaireId?: string
}) => {
  // Initial list of beneficiaires for pre-populating selected beneficiary or quick select search
  const whereBeneficiaire = beneficiairesListWhere({
    mediateurId,
  })
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

  const initialBeneficiairesOptions: SelectOption<BeneficiaireData | null>[] =
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

  console.log('INITIAL BENEFICIAIRES OPTIONS', initialBeneficiairesOptions)

  return initialBeneficiairesOptions
}

export type MostUsedBeneficiairesForSearch = Awaited<
  ReturnType<typeof getInitialBeneficiairesOptionsForSearch>
>
