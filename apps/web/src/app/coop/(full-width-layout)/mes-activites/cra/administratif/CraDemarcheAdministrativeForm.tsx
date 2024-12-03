'use client'

import {
  Control,
  DefaultValues,
  useForm,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CheckboxGroupFormField from '@app/ui/components/Form/CheckboxGroupFormField'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import RichTextFormField from '@app/ui/components/Form/RichText/RichTextFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import React, {
  type MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useScrollToError } from '@app/ui/hooks/useScrollToError'
import { useWatchSubscription } from '@app/ui/hooks/useWatchSubscription'
import Link from 'next/link'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import CraFormLabel from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/CraFormLabel'
import AdresseBanFormField, {
  type AdressBanFormFieldOption,
} from '@app/web/components/form/AdresseBanFormField'
import {
  genreOptions,
  statutSocialOptions,
  trancheAgeOptions,
} from '@app/web/beneficiaire/beneficiaire'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { trpc } from '@app/web/trpc'
import RichCardLabel, {
  richCardFieldsetElementClassName,
  richCardRadioGroupClassName,
} from '@app/web/components/form/RichCardLabel'
import {
  autonomieOptionsWithExtras,
  degreDeFinalisationDemarcheOptionsWithExtras,
  structuresRedirectionOptions,
  thematiqueDemarcheAdministrativeOptionsWithExtras,
  thematiqueOptionsWithExtras,
  typeLieuOptionsWithExtras,
} from '@app/web/cra/cra'
import {
  CraDemarcheAdministrativeData,
  CraDemarcheAdministrativeValidation,
} from '@app/web/cra/CraDemarcheAdministrativeValidation'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { craFormFieldsetClassname } from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/craFormFieldsetClassname'
import CraBeneficiaryForm, {
  CraDataWithBeneficiaire,
} from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/CraBeneficiaryForm'
import { encodeSerializableState } from '@app/web/utils/encodeSerializableState'
import { banMunicipalityLabel } from '@app/web/external-apis/ban/banMunicipalityLabel'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'
import { replaceRouteWithoutRerender } from '@app/web/utils/replaceRouteWithoutRerender'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import { isBeneficiaireAnonymous } from '@app/web/beneficiaire/isBeneficiaireAnonymous'
import CraDureeSubForm from '@app/web/components/form/CraDureeSubForm'
import {
  lieuActiviteFilterOption,
  toLieuActiviteRichOptions,
} from '@app/web/components/activite/lieuActiviteOptions'
import type { LieuActiviteOption } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'
import styles from '../CraForm.module.css'

/**
 * Initial options can come from the field data it self or be pre-populated by beneficiaire data
 */
const lieuResidenceOptionsFromFormData = (
  data: DefaultValues<CraDemarcheAdministrativeData>,
): AdressBanFormFieldOption[] => {
  const result: AdressBanFormFieldOption[] = []
  if (data.lieuCommuneData?.codeInsee) {
    result.push({
      label: banMunicipalityLabel(data.lieuCommuneData),
      value: banDefaultValueToAdresseBanData(data.lieuCommuneData),
    })
  }

  // Do not duplicate option
  if (
    !data.beneficiaire?.communeResidence?.codeInsee ||
    data.beneficiaire?.communeResidence?.codeInsee ===
      data.lieuCommuneData?.codeInsee
  ) {
    return result
  }

  result.push({
    label: banMunicipalityLabel(data.beneficiaire.communeResidence),
    value: banDefaultValueToAdresseBanData(data.beneficiaire.communeResidence),
  })

  return result
}

const CraDemarcheAdministrativeForm = ({
  defaultValues,
  lieuActiviteOptions,
  initialBeneficiairesOptions,
  dureeOptions,
  retour,
}: {
  defaultValues: DefaultValues<CraDemarcheAdministrativeData> & {
    mediateurId: string
  }
  lieuActiviteOptions: LieuActiviteOption[]
  initialBeneficiairesOptions: BeneficiaireOption[]
  dureeOptions: SelectOption[]
  retour?: string
}) => {
  const form = useForm<CraDemarcheAdministrativeData>({
    resolver: zodResolver(CraDemarcheAdministrativeValidation),
    defaultValues: {
      ...defaultValues,
    },
  })
  const mutation = trpc.cra.demarcheAdministrative.useMutation()

  const router = useRouter()

  const beneficiaire = form.watch('beneficiaire')
  const showAnonymousForm =
    !beneficiaire || isBeneficiaireAnonymous(beneficiaire)

  const typeLieu = form.watch('typeLieu')
  const showLieuCommuneData = typeLieu === 'Autre' || typeLieu === 'Domicile'
  const showStructure = typeLieu === 'LieuActivite'

  const degreDeFinalisation = form.watch('degreDeFinalisation')
  const showStructureOrientation =
    degreDeFinalisation === 'OrienteVersStructure'

  const lieuActiviteRichOptions = useMemo(
    () => toLieuActiviteRichOptions(lieuActiviteOptions),
    [lieuActiviteOptions],
  )

  const {
    control,
    setError,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = form

  const onSubmit = async (data: CraDemarcheAdministrativeData) => {
    try {
      await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message: 'L’accompagnement a bien été enregistré.',
      })
      router.push(retour ?? '/coop/mes-activites')
      router.refresh()
    } catch (mutationError) {
      if (applyZodValidationMutationErrorsToForm(mutationError, setError)) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }
  const isLoading = isSubmitting || isSubmitSuccessful

  useScrollToError({ errors })

  const [
    showThematiquesMediationNumerique,
    setShowThematiquesMediationNumerique,
  ] = useState(
    !!defaultValues.thematiquesMediationNumerique &&
      defaultValues.thematiquesMediationNumerique.length > 0,
  )

  const onAddThematiquesMediationNumerique: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setShowThematiquesMediationNumerique(true)
  }

  const [initialLieuResidenceOptions, setInitialLieuResidenceOptions] =
    useState<AdressBanFormFieldOption[]>(
      lieuResidenceOptionsFromFormData(defaultValues),
    )

  const [lieuCommuneDataDefaultValue, setLieuCommuneDataDefaultValue] =
    useState<AdressBanFormFieldOption | undefined>(
      defaultValues.lieuCommuneData
        ? {
            label: banMunicipalityLabel(defaultValues.lieuCommuneData),
            value: banDefaultValueToAdresseBanData(
              defaultValues.lieuCommuneData,
            ),
          }
        : undefined,
    )

  const [
    communeResidenceBeneficiaireDefaultValue,
    setCommuneResidenceBeneficiaireDefaultValue,
  ] = useState<AdressBanFormFieldOption | undefined>(
    defaultValues.beneficiaire?.communeResidence
      ? {
          label: banMunicipalityLabel(
            defaultValues.beneficiaire.communeResidence,
          ),
          value: banDefaultValueToAdresseBanData(
            defaultValues.beneficiaire.communeResidence,
          ),
        }
      : undefined,
  )

  useWatchSubscription(
    watch,
    useCallback(
      (data, { name }) => {
        replaceRouteWithoutRerender(
          `/coop/mes-activites/cra/administratif?v=${encodeSerializableState(data)}`,
        )

        // When changing the beneficiaire
        // we populate the initial options for the lieu of the CRA
        // and set the value
        if (
          name === 'beneficiaire' &&
          data.beneficiaire?.communeResidence?.codeInsee
        ) {
          setInitialLieuResidenceOptions(lieuResidenceOptionsFromFormData(data))
          const newDomicileValue = banDefaultValueToAdresseBanData(
            data.beneficiaire.communeResidence,
          )
          setLieuCommuneDataDefaultValue({
            label: banMunicipalityLabel(data.beneficiaire.communeResidence),
            value: newDomicileValue,
          })
          setValue('lieuCommuneData', newDomicileValue)
          setCommuneResidenceBeneficiaireDefaultValue({
            label: banMunicipalityLabel(data.beneficiaire.communeResidence),
            value: newDomicileValue,
          })
          setValue('beneficiaire.communeResidence', newDomicileValue)
        }

        // When changing the lieu of the CRA for a Domicile CRA
        // we populate the initial options for the commune of the beneficiaire
        // and set the value
        if (
          (name === 'lieuCommuneData' || name === 'typeLieu') &&
          data.typeLieu === 'Domicile' &&
          data.lieuCommuneData
        ) {
          setInitialLieuResidenceOptions(lieuResidenceOptionsFromFormData(data))
          const newDomicileValue = banDefaultValueToAdresseBanData(
            data.lieuCommuneData,
          )
          setCommuneResidenceBeneficiaireDefaultValue({
            label: banMunicipalityLabel(data.lieuCommuneData),
            value: newDomicileValue,
          })
          setValue('beneficiaire.communeResidence', newDomicileValue)
        }
      },
      [setValue],
    ),
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CraBeneficiaryForm
        getValues={
          getValues as unknown as UseFormGetValues<CraDataWithBeneficiaire>
        }
        control={control as unknown as Control<CraDataWithBeneficiaire>}
        mediateurId={defaultValues.mediateurId}
        setValue={
          setValue as unknown as UseFormSetValue<CraDataWithBeneficiaire>
        }
        watch={watch as unknown as UseFormWatch<CraDataWithBeneficiaire>}
        creerBeneficiaireRetourUrl="/coop/mes-activites/cra/administratif"
        initialBeneficiairesOptions={initialBeneficiairesOptions}
      />
      <div className="fr-flex fr-flex-gap-12v">
        <InputFormField
          control={control}
          disabled={isLoading}
          path="date"
          type="date"
          asterisk
          label="Date de l’accompagnement"
          className="fr-flex-basis-0 fr-flex-grow-1"
          classes={{
            label: 'fr-text--medium fr-mb-3v',
            input: 'fr-input--white fr-input--14v',
          }}
        />
        <div className="fr-flex-basis-0 fr-flex-grow-1">
          <CraDureeSubForm form={form} dureeOptions={dureeOptions} />
        </div>
      </div>
      <CraFormLabel required as="p" className="fr-mb-3v fr-mt-8v">
        Lieu d’accompagnement
      </CraFormLabel>
      <RadioFormField
        control={control}
        path="typeLieu"
        disabled={isLoading}
        options={typeLieuOptionsWithExtras}
        components={{
          label: RichCardLabel,
          labelProps: {
            paddingRight: 16,
          },
        }}
        classes={{
          fieldsetElement: richCardFieldsetElementClassName,
          fieldset: craFormFieldsetClassname(styles.lieuFieldset),
          radioGroup: richCardRadioGroupClassName,
        }}
      />
      {showLieuCommuneData && (
        <AdresseBanFormField<CraDemarcheAdministrativeData>
          label=" "
          control={control}
          path="lieuCommuneData"
          disabled={isLoading}
          placeholder="Rechercher une commune par son nom ou son code postal"
          searchOptions={{ type: 'municipality' }}
          defaultOptions={initialLieuResidenceOptions}
          defaultValue={lieuCommuneDataDefaultValue}
        />
      )}
      {showStructure && (
        <CustomSelectFormField
          label=" "
          control={control}
          path="structureId"
          placeholder="Rechercher un lieu d’activité"
          options={lieuActiviteRichOptions}
          filterOption={lieuActiviteFilterOption}
        />
      )}
      <hr className="fr-separator-12v" />
      <p className="fr-text--medium fr-mb-4v fr-mt-12v">
        Thématique(s) de la démarche administrative <RedAsterisk />
      </p>
      <CheckboxGroupFormField
        control={control}
        path="thematiques"
        options={thematiqueDemarcheAdministrativeOptionsWithExtras}
        disabled={isLoading}
        components={{
          label: RichCardLabel,
        }}
        classes={{
          fieldsetElement: richCardFieldsetElementClassName,
          fieldset: craFormFieldsetClassname(styles.thematiquesFieldset),
        }}
      />
      <InputFormField
        control={control}
        disabled={isLoading}
        path="precisionsDemarche"
        label="Préciser le nom de la démarche administrative réalisée"
        className="fr-flex-grow-1 fr-mt-12v"
        classes={{ label: 'fr-text--medium fr-mb-3v' }}
      />
      {showThematiquesMediationNumerique ? (
        <>
          <p className="fr-text--medium fr-mb-4v fr-mt-12v">
            Thématique(s) d’accompagnement de médiation numérique
          </p>
          <CheckboxGroupFormField
            control={control}
            path="thematiquesMediationNumerique"
            options={thematiqueOptionsWithExtras}
            disabled={isLoading}
            components={{
              label: RichCardLabel,
            }}
            classes={{
              fieldsetElement: richCardFieldsetElementClassName,
              fieldset: craFormFieldsetClassname(styles.thematiquesFieldset),
            }}
          />
        </>
      ) : (
        <>
          <p className="fr-text--medium fr-mb-4v fr-mt-12v">
            Avez-vous également réalisé de la médiation numérique lors de cet
            accompagnement&nbsp;?
          </p>
          <div className="fr-btns-group fr-my-0 fr-btns-group--icon-left">
            <Button
              type="button"
              iconId="fr-icon-add-line"
              priority="secondary"
              onClick={onAddThematiquesMediationNumerique}
              className="fr-width-full fr-my-0"
            >
              Ajouter thématique(s) de médiation numérique
            </Button>
          </div>
        </>
      )}

      <p className="fr-text--medium fr-mb-4v fr-mt-12v">
        Niveau d’autonomie du bénéficiaire{' '}
        <Link
          className="fr-link"
          href="https://incubateurdesterritoires.notion.site/Accompagnement-individuel-de-m-diation-num-rique-94011d45a214412981168bdd5e9d66c7#a94b64aef227422ca23b064d476ac6f7"
          target="_blank"
        >
          En savoir plus
        </Link>
      </p>
      <RadioFormField
        control={control}
        path="autonomie"
        options={autonomieOptionsWithExtras}
        disabled={isLoading}
        components={{
          label: RichCardLabel,
        }}
        classes={{
          fieldsetElement: richCardFieldsetElementClassName,
          fieldset: craFormFieldsetClassname(styles.thematiquesFieldset),
        }}
      />
      <p className="fr-text--medium fr-mb-4v fr-mt-12v">
        La démarche est-elle finalisée&nbsp;?
      </p>
      <RadioFormField
        control={control}
        path="degreDeFinalisation"
        options={degreDeFinalisationDemarcheOptionsWithExtras}
        disabled={isLoading}
        components={{
          label: RichCardLabel,
        }}
        classes={{
          fieldsetElement: richCardFieldsetElementClassName,
          fieldset: craFormFieldsetClassname(
            styles.degreDeFinalisationFieldset,
          ),
          radioGroup: richCardRadioGroupClassName,
        }}
      />
      {showStructureOrientation && (
        <CustomSelectFormField
          label=" "
          control={control}
          path="structureDeRedirection"
          placeholder="Structure de redirection"
          options={structuresRedirectionOptions}
        />
      )}

      {showAnonymousForm && (
        <>
          <hr className="fr-separator-12v" />
          <h2 className="fr-h3 fr-mb-1v fr-text-title--blue-france">
            Informations optionnelles sur le bénéficiaire
          </h2>
          <p className="fr-text--xs fr-text-mention--grey fr-mb-12v">
            Vous pouvez renseigner des informations anonymes sur le bénéficiaire
            pour compléter vos statistiques.
          </p>
          <AdresseBanFormField<CraDemarcheAdministrativeData>
            control={control}
            path="beneficiaire.communeResidence"
            disabled={isLoading}
            defaultOptions={initialLieuResidenceOptions}
            defaultValue={
              communeResidenceBeneficiaireDefaultValue ??
              lieuCommuneDataDefaultValue
            }
            label={
              <span className="fr-text--medium fr-mb-4v fr-display-block">
                Commune de résidence du bénéficiaire
              </span>
            }
            placeholder="Rechercher une commune par son nom ou son code postal"
            searchOptions={{ type: 'municipality' }}
          />
          <CraFormLabel as="p" className="fr-mb-4v fr-mt-12v">
            Genre
          </CraFormLabel>
          <RadioFormField
            control={control}
            path="beneficiaire.genre"
            options={genreOptions}
            disabled={isLoading}
            components={{
              label: RichCardLabel,
            }}
            classes={{
              fieldsetElement: richCardFieldsetElementClassName,
              fieldset: craFormFieldsetClassname(styles.genreFieldset),
              radioGroup: richCardRadioGroupClassName,
            }}
          />
          <div className="fr-flex fr-flex-gap-12v">
            <div className="fr-flex-basis-0 fr-flex-grow-1">
              <CraFormLabel as="p" className="fr-mb-4v fr-mt-12v">
                Tranche d’âge
              </CraFormLabel>
              <RadioFormField
                control={control}
                path="beneficiaire.trancheAge"
                options={trancheAgeOptions}
                disabled={isLoading}
                components={{
                  label: RichCardLabel,
                }}
                classes={{
                  fieldset: craFormFieldsetClassname(styles.columnFieldset),
                  fieldsetElement: richCardFieldsetElementClassName,
                  radioGroup: richCardRadioGroupClassName,
                }}
              />
            </div>
            <div className="fr-flex-basis-0 fr-flex-grow-1">
              <CraFormLabel as="p" className="fr-mb-4v fr-mt-12v">
                Statut du bénéficiaire
              </CraFormLabel>
              <RadioFormField
                control={control}
                path="beneficiaire.statutSocial"
                options={statutSocialOptions}
                disabled={isLoading}
                components={{
                  label: RichCardLabel,
                }}
                classes={{
                  fieldset: craFormFieldsetClassname(styles.columnFieldset),
                  fieldsetElement: richCardFieldsetElementClassName,
                  radioGroup: richCardRadioGroupClassName,
                }}
              />
            </div>
          </div>
        </>
      )}
      <RichTextFormField
        className="fr-mt-12v"
        form={form}
        disabled={isLoading}
        path="notes"
        label={
          <span className="fr-text--medium">Notes sur l’accompagnement</span>
        }
        hint={
          <>
            Il est interdit de stocker des informations sensibles (données de
            santé, mots de passe, etc).
            <br />
            Vous retrouverez ces notes dans votre historique d’activités ainsi
            que dans l’historique du bénéficiaire.
          </>
        }
      />
      <div className="fr-btns-group fr-mt-12v fr-mb-30v">
        <Button type="submit" {...buttonLoadingClassname(isLoading)}>
          Enregistrer l’activité
        </Button>
        <Button
          priority="secondary"
          linkProps={{
            href: retour ?? '/coop',
          }}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(CraDemarcheAdministrativeForm)
