'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import React, { PropsWithChildren, ReactNode } from 'react'
import RichTextFormField from '@app/ui/components/Form/RichText/RichTextFormField'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import Notice from '@codegouvfr/react-dsfr/Notice'
import WhiteCard from '@app/web/ui/WhiteCard'
import RedAsterisk from '@app/web/ui/RedAsterisk'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  GouvernanceData,
  GouvernanceValidation,
} from '@app/web/gouvernance/Gouvernance'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { limiteModificationDesGouvernances } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceMetadata'
import WorkInProgressNotice from '@app/web/components/WorkInProgressNotice'
import { gouvernanceFormSections } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections'
import CoporteursForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/CoporteursForm'
import GouvernanceFormSectionCard from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/GouvernanceFormSectionCard'
import { MembreOptions } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getMembresOptions'
import MembresForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/MembresForm'
import ComitologieForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/ComitologieForm' // import styles from './GouvernanceForm.module.css'
// import styles from './GouvernanceForm.module.css'

const emptyValues: DefaultValues<GouvernanceData> = {
  siretsRecruteursCoordinateurs: [{ siret: '' }],
  comites: [],
  feuillesDeRoute: [],
  coporteurs: [],
  membres: [],
}

const GouvernanceForm = ({
  className,
  gouvernance,
  membreOptions,
}: {
  className?: string
  // If editing existing
  gouvernance?: DefaultValues<GouvernanceData>
  membreOptions: MembreOptions
}) => {
  const form = useForm<GouvernanceData>({
    resolver: zodResolver(GouvernanceValidation),
    defaultValues: { ...emptyValues, ...gouvernance },
  })
  const { control, setError, handleSubmit, formState } = form
  const siretsRecruteursCoordinateursFields = useFieldArray({
    control,
    keyName: 'id',
    name: 'siretsRecruteursCoordinateurs',
  })

  const mutation = trpc.gouvernance.gouvernance.useMutation()
  const router = useRouter()

  console.log('ERRORS', formState.errors)

  const onSubmit = async (data: GouvernanceData) => {
    try {
      await mutation.mutateAsync(data)
      router.refresh()
      router.push(
        gouvernanceHomePath({ codeDepartement: data.departementCode }),
      )
    } catch (mutationError) {
      if (!applyZodValidationMutationErrorsToForm(mutationError, setError)) {
        // TODO Go over this kind of stuff and add Toast
        throw mutationError
      }
    }
  }

  const v1Perimetre = form.watch('v1Perimetre')
  const v1PorteurCode = form.watch('v1PorteurCode')
  const v1PorteurSiret = form.watch('v1PorteurSiret')
  const shouldProvidePorteurSiret = v1Perimetre === 'autre'

  if (
    // We switch from SIRET to collectivity, reset the value for input to display ok
    shouldProvidePorteurSiret &&
    !!v1PorteurCode
  ) {
    setTimeout(() => {
      form.setValue('v1PorteurCode', '')
    })
  } else if (!shouldProvidePorteurSiret && !!v1PorteurSiret) {
    setTimeout(() => {
      form.setValue('v1PorteurSiret', '')
    })
  }

  const isLoading =
    (formState.isSubmitting || formState.isSubmitSuccessful) && !mutation.error
  //
  // const defaultPorteurValue = gouvernance?.v1PorteurCode
  //   ? Object.values(optionsCollectivitesPorteur)
  //       .flatMap((group) => group.options)
  //       .find((option) => option.value === gouvernance?.v1PorteurCode)
  //   : undefined

  const {
    fields: membresFields,
    append: appendMembre,
    remove: removeMembre,
    update: updateMembre,
  } = useFieldArray({
    control,
    name: 'membres',
    keyName: 'id',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div id="gouvernance-form" className={className}>
        <h3 className="fr-text-title--blue-france fr-mt-6v">Gouvernance</h3>
        <Notice
          className="fr-mt-6v"
          title={`Gouvernance modifiable jusqu’au ${dateAsDay(
            limiteModificationDesGouvernances,
          )}`}
        />
        <p className="fr-text--sm fr-text--medium fr-mt-6v fr-mb-0">
          Les champs avec <RedAsterisk /> sont obligatoires
        </p>
        <GouvernanceFormSectionCard
          {...gouvernanceFormSections.contactDuSousPrefetReferent}
        >
          <InputFormField
            label="Prénom"
            path="sousPrefetReferentPrenom"
            asterisk
            control={control}
            disabled={isLoading}
          />
          <InputFormField
            label="Nom"
            path="sousPrefetReferentNom"
            asterisk
            control={control}
            disabled={isLoading}
          />
          <InputFormField
            label="Adresse e-mail"
            path="sousPrefetReferentEmail"
            asterisk
            control={control}
            disabled={isLoading}
          />
        </GouvernanceFormSectionCard>
        <CoporteursForm
          form={form}
          disabled={isLoading}
          membresOptions={membreOptions}
          membreFields={membresFields}
          appendMembre={appendMembre}
          removeMembre={removeMembre}
          updateMembre={updateMembre}
        />
        <MembresForm
          form={form}
          disabled={isLoading}
          membresOptions={membreOptions}
          membreFields={membresFields}
          appendMembre={appendMembre}
          removeMembre={removeMembre}
        />
        <ComitologieForm form={form} disabled={isLoading} />
        <GouvernanceFormSectionCard
          {...gouvernanceFormSections.feuillesDeRouteEtPorteurs}
        >
          <WorkInProgressNotice />
        </GouvernanceFormSectionCard>
        <GouvernanceFormSectionCard
          {...gouvernanceFormSections.coordinateurConseillerNumeriqueDeLaGouvernance}
        >
          <WorkInProgressNotice />
        </GouvernanceFormSectionCard>
        <GouvernanceFormSectionCard
          {...gouvernanceFormSections.besoinsEnIngenierieFinanciere}
        >
          <WorkInProgressNotice />
        </GouvernanceFormSectionCard>
        <GouvernanceFormSectionCard {...gouvernanceFormSections.noteDeContexte}>
          <RichTextFormField
            form={form}
            asterisk
            path="noteDeContexte"
            disabled={isLoading}
            label="Précisez, au sein d'une note qualitative, la gouvernance dans votre département et les éventuelles difficultés que vous rencontreriez dans les échanges avec les collectivités territoriales et leurs groupements"
          />
        </GouvernanceFormSectionCard>

        <div className="fr-btns-group fr-mt-10v">
          <Button
            type="submit"
            className={classNames(isLoading && 'fr-btn--loading')}
          >
            Enregistrer
          </Button>
        </div>
        {mutation.error && (
          <p className="fr-error-text fr-mt-2v">
            Une erreur est survenue, veuillez réessayer.
          </p>
        )}
      </div>
    </form>
  )
}

export default withTrpc(GouvernanceForm)
