'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputFormField from '@app/ui/components/Form/InputFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import React, { RefObject, useEffect, useRef } from 'react'
import RichTextFormField from '@app/ui/components/Form/RichText/RichTextFormField'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { useReplaceUrlToAnchor } from '@app/ui/hooks/useReplaceUrlToAnchor' // import styles from './GouvernanceForm.module.css'
import { createToast } from '@app/ui/toast/createToast'
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
import { gouvernanceFormSections } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections'
import CoporteursForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/CoporteursForm'
import GouvernanceFormSectionCard from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/GouvernanceFormSectionCard'
import { MembreOptions } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getMembresOptions'
import MembresForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/MembresForm'
import ComitologieForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/ComitologieForm'
import FeuillesDeRouteForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/FeuillesDeRouteForm'
import { Option } from '@app/web/utils/options'
import CoordinateursConseillersNumeriqueForm from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections/CoordinateursConseillersNumeriqueForm'
// import styles from './GouvernanceForm.module.css'

const scrollToRef = (ref: RefObject<HTMLElement>) => {
  ref.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  })
}

const GouvernanceForm = ({
  codeDepartement,
  codeRegion,
  defaultValues,
  className,
  membreOptions,
  perimetreEpciOptions,
}: {
  codeDepartement: string
  codeRegion: string | null
  defaultValues: DefaultValues<GouvernanceData>
  className?: string
  // If editing existing
  membreOptions: MembreOptions
  perimetreEpciOptions: Option[]
}) => {
  const form = useForm<GouvernanceData>({
    resolver: zodResolver(GouvernanceValidation),
    defaultValues,
  })
  const {
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = form

  const replaceUrlToAnchor = useReplaceUrlToAnchor()
  const mutation = trpc.gouvernance.updateGouvernanceV2.useMutation()
  const router = useRouter()

  // General errors (not linked to input) must have refs to trigger scroll on submit
  const membresErrorRef = useRef<HTMLParagraphElement>(null)
  const comitesErrorRef = useRef<HTMLParagraphElement>(null)
  const feuillesDeRouteErrorRef = useRef<HTMLParagraphElement>(null)
  const recruteursCoordinateursErrorRef = useRef<HTMLParagraphElement>(null)

  // Scroll to first general error on submit
  useEffect(() => {
    if (errors.membres) {
      scrollToRef(membresErrorRef)
      return
    }
    if (errors.comites) {
      scrollToRef(comitesErrorRef)
      return
    }
    if (errors.feuillesDeRoute) {
      scrollToRef(feuillesDeRouteErrorRef)
      return
    }
    if (errors.recruteursCoordinateurs) {
      scrollToRef(recruteursCoordinateursErrorRef)
    }
  }, [
    errors.membres,
    errors.comites,
    errors.feuillesDeRoute,
    errors.recruteursCoordinateurs,
  ])

  const onSubmit = async (data: GouvernanceData) => {
    try {
      await mutation.mutateAsync(data)
      router.refresh()
      createToast({
        priority: 'success',
        message: 'La gouvernance a bien été enregistrée',
      })
      router.push(gouvernanceHomePath({ codeDepartement }))
    } catch (mutationError) {
      if (!applyZodValidationMutationErrorsToForm(mutationError, setError)) {
        // TODO Go over this kind of stuff and add Toast
        throw mutationError
      }
    }
  }

  const isLoading = (isSubmitting || isSubmitSuccessful) && !mutation.error

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
          membresErrorRef={membresErrorRef}
        />
        <ComitologieForm
          form={form}
          disabled={isLoading}
          replaceUrlToAnchor={replaceUrlToAnchor}
          comitesErrorRef={comitesErrorRef}
        />
        <FeuillesDeRouteForm
          form={form}
          disabled={isLoading}
          membresOptions={membreOptions}
          membreFields={membresFields}
          appendMembre={appendMembre}
          departementHasRegion={!!codeRegion}
          perimetreEpciOptions={perimetreEpciOptions}
          replaceUrlToAnchor={replaceUrlToAnchor}
          feuillesDeRouteErrorRef={feuillesDeRouteErrorRef}
        />
        <CoordinateursConseillersNumeriqueForm
          form={form}
          disabled={isLoading}
          recruteursCoordinateursErrorRef={recruteursCoordinateursErrorRef}
        />
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
