import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import type { BeneficiaireData } from '@app/web/beneficiaire/BeneficiaireValidation'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import { trpc } from '@app/web/trpc'
import { useCallback, useRef } from 'react'

const beneficiaireOptionRichLabel = (value: BeneficiaireData) => {
  const { communeResidence } = value

  return (
    <>
      <div className="fr-width-full fr-text--bold fr-text-title--blue-france fr-mb-0">
        {getBeneficiaireDisplayName(value)}
      </div>
      {!!communeResidence && (
        <div className="fr-width-full fr-text--xs fr-text-mention--grey fr-mb-0">
          {communeResidence.nom}
          {!!communeResidence.codePostal && ` · ${communeResidence.codePostal}`}
        </div>
      )}
    </>
  ) as unknown as string // ReactNode is supported but types are not up to date
}

export const useBeneficiaireSearch = ({
  initialBeneficiairesOptions,
}: {
  initialBeneficiairesOptions: BeneficiaireOption[]
}) => {
  const beneficiairesMapRef = useRef(new Map<string, BeneficiaireData>())

  const { client: trpcClient } = trpc.useContext()

  const initialOptions = initialBeneficiairesOptions.map((option) =>
    option.value
      ? {
          value: option.value,
          label: beneficiaireOptionRichLabel(option.value),
        }
      : option,
  )

  const loadOptions = useCallback(
    async (search: string): Promise<BeneficiaireOption[]> => {
      if (search.trim().length < 3) {
        return [
          {
            label: `La recherche doit contenir au moins 3 caractères`,
            value: null,
          },
        ]
      }

      const result = await trpcClient.beneficiaires.search.query({
        query: search,
      })

      const hasMore = result.matchesCount - result.beneficiaires.length
      const hasMoreMessage = hasMore
        ? hasMore === 1
          ? `Veuillez préciser votre recherche - 1 bénéficiaire n’est pas affiché`
          : `Veuillez préciser votre recherche - ${hasMore} bénéficiaires ne sont pas affichés`
        : null

      for (const beneficiaire of result.beneficiaires) {
        if (beneficiaire.id)
          beneficiairesMapRef.current.set(beneficiaire.id, beneficiaire)
      }

      return [
        {
          label: `${result.matchesCount} résultat${sPluriel(result.matchesCount)}`,
          value: null,
        },
        ...result.beneficiaires.map((beneficiaire) => ({
          label: beneficiaireOptionRichLabel(beneficiaire),
          value: beneficiaire,
        })),
        ...(hasMoreMessage
          ? [
              {
                label: hasMoreMessage,
                value: null,
              },
            ]
          : []),
      ]
    },
    [initialBeneficiairesOptions, beneficiairesMapRef, trpcClient],
  )

  return {
    initialOptions,
    loadOptions,
  }
}
