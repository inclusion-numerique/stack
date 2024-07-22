import { useCallback, useMemo, useRef } from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { trpc } from '@app/web/trpc'
import type { BeneficiaireData } from '@app/web/beneficiaire/BeneficiaireValidation'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'

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

export type BeneficiaireOption = SelectOption<BeneficiaireData | null>

export const useCraBeneficiaireLoadOptions = ({
  initialOptions: initialOptionsProperty,
}: {
  initialOptions: BeneficiaireOption[]
}) => {
  const { client: trpcClient } = trpc.useContext()

  const beneficiairesMapRef = useRef(new Map<string, BeneficiaireData>())

  const initialOptions = useMemo(
    () =>
      initialOptionsProperty.map((option) =>
        option.value
          ? {
              value: option.value,
              label: beneficiaireOptionRichLabel(option.value),
            }
          : option,
      ),
    [initialOptionsProperty],
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
          ? `Veuillez préciser votre recherche - 1 structure n’est pas affichée`
          : `Veuillez préciser votre recherche - ${hasMore} structures ne sont pas affichées`
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
    [beneficiairesMapRef, trpcClient],
  )

  return {
    initialOptions,
    loadOptions,
    beneficiairesMapRef,
  }
}
