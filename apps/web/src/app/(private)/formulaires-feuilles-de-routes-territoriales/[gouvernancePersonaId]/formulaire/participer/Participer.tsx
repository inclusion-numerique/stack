'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import InputFormField from '@app/ui/components/Form/InputFormField'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import BackLink from '@app/web/components/BackLink'
import WhiteCard from '@app/web/ui/WhiteCard'
import RedAsterisk from '@app/web/ui/RedAsterisk'
import {
  ParticiperData,
  ParticiperValidation,
} from '@app/web/gouvernance/Participer'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import WorkInProgressNotice from '@app/web/components/WorkInProgressNotice'
import { OptionTuples, optionTuplesToOptions } from '@app/web/utils/options'

const defaultValuesFromData = (
  data: GouvernanceFormulaireForForm,
): DefaultValues<ParticiperData> => {
  if (data.gouvernancePersona === 'structure') {
    return {
      gouvernancePersona: 'structure',
      formulaireGouvernanceId: data.id,
      codeDepartement: data.departementCode ?? undefined,
      nomStructure: data.nomStructure ?? undefined,
      siretStructure: data.siretStructure ?? undefined,
      contactStructure: data.contactStructure
        ? {
            nom: data.contactStructure.nom ?? undefined,
            prenom: data.contactStructure.prenom ?? undefined,
            email: data.contactStructure.email ?? undefined,
            fonction: data.contactStructure.fonction ?? undefined,
          }
        : {},
    }
  }

  throw new Error('WIP')
}

const Participer = ({
  persona,
  formulaireGouvernance,
  optionsRegions,
  optionsDepartements,
  optionsEpci,
}: {
  persona: GouvernancePersona
  formulaireGouvernance: GouvernanceFormulaireForForm
  optionsRegions: OptionTuples[]
  optionsDepartements: OptionTuples[]
  optionsEpci: OptionTuples[]
}) => {
  console.log('PROPS FORM', formulaireGouvernance)

  const form = useForm<ParticiperData>({
    defaultValues: defaultValuesFromData(formulaireGouvernance),
    resolver: zodResolver(ParticiperValidation),
  })
  console.log('DEFAULT VALUES', defaultValuesFromData(formulaireGouvernance))

  const mutation = trpc.formulaireGouvernance.participer.useMutation()
  const router = useRouter()

  console.log('ERRORS', form.formState.errors)

  const onSubmit = async (data: ParticiperData) => {
    console.log('SUBMIT', data)
    try {
      await mutation.mutateAsync(data)
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, form.setError)
    }

    // TODO Confirm page
    if (false) {
      router.push(
        `/formulaires-feuilles-de-routes-territoriales/${data.gouvernancePersonaId}`,
      )
    }
  }
  const isLoading =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful
  const disabled = isLoading

  return (
    <>
      <BackLink href="/formulaires-feuilles-de-routes-territoriales" />
      <WorkInProgressNotice />
      <WhiteCard className="fr-mt-6v fr-mb-30v">
        <h2 className="fr-text-title--blue-france">
          Formulaire{' '}
          {(persona.shortTitle ?? persona.title).toLocaleLowerCase('fr')}
        </h2>
        <p className="fr-text--lg fr-my-4v">
          Complétez ce formulaire pour participer à l’élaboration des feuilles
          de routes territoriales de votre département. Vous serez sollicités à
          l’occasion des concertations territoriales.
        </p>
        <p className="fr-text--sm fr-text--medium fr-my-4v">
          Les champs avec <RedAsterisk /> sont obligatoires
        </p>
        <hr className="separator--10v" />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {formulaireGouvernance.gouvernancePersona === 'structure' ? (
            <>
              <h5>Informations sur la structure</h5>
              <InputFormField
                control={form.control}
                path="nomStructure"
                label="Nom structure"
                disabled={disabled}
              />
              <InputFormField
                control={form.control}
                path="siretStructure"
                label="SIRET structure"
                disabled={disabled}
              />
              <SelectFormField
                control={form.control}
                path="codeDepartement"
                label="Département"
                disabled={disabled}
                options={optionTuplesToOptions(optionsDepartements)}
              />
            </>
          ) : (
            <h5>
              Renseignez votre {persona.title.toLocaleLowerCase('fr')}{' '}
              <RedAsterisk />
            </h5>
          )}
          <hr className="separator--10v" />
          <h5>Contact politique</h5>
          <pre>{formulaireGouvernance.id}</pre>

          {formulaireGouvernance.gouvernancePersona === 'structure' ? (
            <>
              <InputFormField
                control={form.control}
                path="contactStructure.nom"
                label="Nom"
                disabled={disabled}
              />
              <InputFormField
                control={form.control}
                path="contactStructure.prenom"
                label="Prénom"
                disabled={disabled}
              />
              <InputFormField
                control={form.control}
                path="contactStructure.fonction"
                label="Fonction"
                disabled={disabled}
              />
              <InputFormField
                control={form.control}
                path="contactStructure.email"
                label="Adresse e-mail"
                disabled={disabled}
              />
            </>
          ) : (
            <>
              <InputFormField
                control={form.control}
                path="contactStructure.nom"
                label="TODO"
                disabled={disabled}
              />
              <InputFormField
                control={form.control}
                path="contactStructure.prenom"
                label="TODO"
                disabled={disabled}
              />
            </>
          )}
          <div className="fr-btns-group fr-mt-10v">
            <Button
              type="submit"
              disabled={disabled}
              className={classNames(isLoading && 'fr-btn--loading')}
            >
              Confirmer et envoyer
            </Button>
          </div>
        </form>
      </WhiteCard>
    </>
  )
}

export default withTrpc(Participer)
