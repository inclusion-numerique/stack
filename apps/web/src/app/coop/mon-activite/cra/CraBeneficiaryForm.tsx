'use client'

import type {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import { useCallback, useRef, useState } from 'react'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import { useRouter } from 'next/navigation'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { useWatchSubscription } from '@app/ui/hooks/useWatchSubscription'
import IconInSquare from '@app/web/components/IconInSquare'
import { encodeSerializableState } from '@app/web/utils/encodeSerializableState'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import { trpc } from '@app/web/trpc'
import type {
  BeneficiaireCraData,
  BeneficiaireData,
} from '@app/web/beneficiaire/BeneficiaireValidation'
import { AdresseBanData } from '@app/web/external-apis/ban/AdresseBanValidation'

/**
 * This component has 3 states :
 *  - Empty state
 *  - Selected beneficiary
 *  - SearchOrCreate
 */

enum CraBeneficiaryFormState {
  Empty,
  Selected,
  SearchOrCreate,
}

export type CraDataWithBeneficiaire = {
  beneficiaire: BeneficiaireCraData | null | undefined
  lieuAccompagnementDomicileCommune: AdresseBanData | null | undefined
}

const initialStateFromValues = (values: CraDataWithBeneficiaire) => {
  if (values.beneficiaire?.id) {
    return CraBeneficiaryFormState.Selected
  }

  return CraBeneficiaryFormState.Empty
}

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

const CraBeneficiaryForm = ({
  control,
  setValue,
  getValues,
  watch,
  mediateurId,
  initialBeneficiariesOptions,
  creerBeneficiaireRetourUrl,
}: {
  getValues: UseFormGetValues<CraDataWithBeneficiaire>
  setValue: UseFormSetValue<CraDataWithBeneficiaire>
  watch: UseFormWatch<CraDataWithBeneficiaire>
  control: Control<CraDataWithBeneficiaire>
  mediateurId: string
  creerBeneficiaireRetourUrl: string
  initialBeneficiariesOptions: BeneficiaireOption[]
}) => {
  const [state, setState] = useState<CraBeneficiaryFormState>(() =>
    initialStateFromValues(getValues()),
  )
  const beneficiairesMapRef = useRef(new Map<string, BeneficiaireData>())

  const { client: trpcClient } = trpc.useContext()

  const initialOptions = initialBeneficiariesOptions.map((option) =>
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
    [initialBeneficiariesOptions, beneficiairesMapRef, trpcClient],
  )

  const router = useRouter()

  const onLierBeneficiaire = () => {
    setState(CraBeneficiaryFormState.SearchOrCreate)
  }

  const onCreer = () => {
    // When creating beneficiare, we redirect to the beneficiaire creation page but with the state of this form as a "next" or "back" url
    // so we can come back to this form in the same state, but with the created beneficiary selected

    const creationUrl = `/coop/mes-beneficiaires/nouveau?retour=${encodeURIComponent(creerBeneficiaireRetourUrl)}&cra=${encodeSerializableState(getValues())}`

    router.push(creationUrl)
  }

  const onCancel = () => {
    setValue('beneficiaire', { mediateurId })
    setState(CraBeneficiaryFormState.Empty)
  }

  const beneficiaireName = getBeneficiaireDisplayName({
    prenom: watch('beneficiaire.prenom'),
    nom: watch('beneficiaire.nom'),
  })

  useWatchSubscription(
    watch,
    useCallback(
      (data, { name }) => {
        // Change state on selection of beneficiaire
        if (name === 'beneficiaire' && data.beneficiaire?.id) {
          setState(CraBeneficiaryFormState.Selected)
          // Pre select domicile beneficiaire
          if (
            !data.lieuAccompagnementDomicileCommune &&
            data.beneficiaire.communeResidence
          ) {
            setValue(
              'lieuAccompagnementDomicileCommune',
              data.beneficiaire.communeResidence as AdresseBanData,
            )
          }
        }
      },
      [setValue],
    ),
  )

  return (
    <div className="fr-background-alt--blue-france fr-px-8v fr-py-6v fr-border-radius--8 fr-my-12v fr-flex fr-flex-gap-8v fr-align-items-center">
      <IconInSquare
        iconId="fr-icon-user-heart-line"
        size="large"
        background="fr-background-default--grey"
      />
      <div className="fr-flex-grow-1">
        {state !== CraBeneficiaryFormState.Selected && (
          <p className="fr-text--bold fr-mb-1v">Lier à un bénéficiaire</p>
        )}
        {state === CraBeneficiaryFormState.Selected && (
          <p className="fr-text--sm fr-text--bold fr-mb-1v">
            BÉNÉFICIAIRE DE L’ACCOMPAGNEMENT
          </p>
        )}
        {state === CraBeneficiaryFormState.Empty && (
          <p className="fr-text--sm fr-mb-0">
            Si vous ne liez pas cette activité à un bénéficiaire, alors il
            restera anonyme.
          </p>
        )}
        {state === CraBeneficiaryFormState.SearchOrCreate && (
          <>
            <CustomSelectFormField
              label=" "
              path="beneficiaire"
              placeholder="Rechercher parmi vos bénéficiaires enregistrés"
              control={control}
              className="fr-mb-2v fr-mt-3v"
              loadOptions={loadOptions}
              defaultOptions={initialOptions}
              getOptionKey={(option) => option.value?.id ?? ''}
              getValueKey={(value) => value?.id ?? ''}
            />
            <div>
              Ou{' '}
              <button
                type="button"
                className="fr-px-1v fr-link fr-text--medium"
                onClick={onCreer}
              >
                Créer un bénéficiaire
              </button>
            </div>
          </>
        )}
        {state === CraBeneficiaryFormState.Selected && (
          <p className="fr-text--lg fr-text-title--blue-france fr-text--bold fr-mb-0">
            {beneficiaireName}
          </p>
        )}
      </div>
      {state === CraBeneficiaryFormState.Empty && (
        <Button
          type="button"
          priority="secondary"
          iconId="fr-icon-add-line"
          onClick={onLierBeneficiaire}
        >
          Lier&nbsp;à&nbsp;un&nbsp;bénéficiaire
        </Button>
      )}
      {state === CraBeneficiaryFormState.Selected && (
        <Button
          type="button"
          priority="tertiary no outline"
          iconId="fr-icon-close-line"
          iconPosition="right"
          onClick={onCancel}
        >
          Annuler
        </Button>
      )}
    </div>
  )
}

export default CraBeneficiaryForm
