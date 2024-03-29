'use client'

import { useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import React, { useState } from 'react'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  BeneficiaireSubventionFormationData,
  BeneficiaireSubventionFormationValidation,
} from '@app/web/gouvernance/DemandeDeSubvention'
import { numberToEuros } from '@app/web/utils/formatNumber'
import { dotationFormation202406 } from '@app/web/gouvernance/dotationFormation202406'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'

const BeneficiaireSubventionFormationForm = ({
  gouvernanceId,
  beneficiaireFormationMembreId,
  beneficiaireFormationMembreNom,
  canEdit = true,
  beneficiairesOptions,
}: {
  gouvernanceId: string
  beneficiaireFormationMembreId?: string | null
  beneficiaireFormationMembreNom?: string | null
  beneficiairesOptions: SelectOption[]
  canEdit?: boolean
}) => {
  const [isEditing, setIsEditing] = useState(!beneficiaireFormationMembreId)

  const form = useForm<BeneficiaireSubventionFormationData>({
    resolver: zodResolver(BeneficiaireSubventionFormationValidation),
    defaultValues: {
      gouvernanceId,
      membreGouvernanceId: beneficiaireFormationMembreId ?? undefined,
    },
  })

  const mutation =
    trpc.demandesDeSubvention.updateBeneficiaireFormation.useMutation()

  const router = useRouter()

  const onSubmit = async (data: BeneficiaireSubventionFormationData) => {
    try {
      await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message:
          'Le bénéficiaire de la dotation formation a bien été enregistré',
      })
      setIsEditing(false)
      router.refresh()
    } catch (mutationError) {
      if (
        applyZodValidationMutationErrorsToForm(mutationError, form.setError)
      ) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement du bénéficiaire',
      })
    }
  }

  const isLoading = form.formState.isSubmitting

  const { error } = mutation

  const title = (
    <h2 className="fr-h5 fr-flex fr-mb-0 fr-justify-content-space-between fr-flex-gap-4v">
      <span>Dotation formation Aidants Connect</span>
      <span>{numberToEuros(dotationFormation202406)}</span>
    </h2>
  )

  const hintContent = (
    <span className="fr-text--sm fr-text-mention--grey">
      Afin de déployer le dispositif Aidants Connect sur son territoire, une
      dotation de 20 000€ dédiée à la formation d’agents publics est attribuée à
      votre territoire.  Cette dotation doit être fléchée vers un destinataire
      unique : · Il est préconisé que le destinataire de ces fonds soit le
      Conseil Départemental · Les fonds doivent être destinés à la formation
      d’agents publics non-conseillers numériques · La structure destinataire
      des fonds peut se servir des fonds pour former ses propres agents publics
      et/ou des agents publics appartenant à une autre structure. · La formation
      financée est la formation Aidants Connect de 7 heures · Le coût d’une
      formation étant de 322€ par agent, la dotation de 20 000€ permet de
      financer la formation de 62 agents · Les informations sur la mise en œuvre
      de ces formations Aidants Connect vont seront communiquées prochainement
      (mail et webinaire)
    </span>
  )

  if (!isEditing) {
    return (
      <>
        <div className="fr-flex fr-flex-gap-4v fr-align-items-center fr-justify-content-space-between fr-mb-2v">
          {title}
          {!!canEdit && (
            <Button
              type="button"
              priority="secondary"
              size="small"
              iconId="fr-icon-edit-line"
              onClick={() => {
                setIsEditing(true)
              }}
            >
              Modifier
            </Button>
          )}
        </div>
        <hr className="fr-separator-8v" />
        <div>{hintContent}</div>
        <hr className="fr-separator-8v" />
        <InfoLabelValue
          label="Bénéficiaire enregistré"
          value={beneficiaireFormationMembreNom}
        />
      </>
    )
  }

  return (
    <>
      {title}
      <hr className="fr-separator-8v" />
      {hintContent}
      <form
        className="fr-mt-8v"
        id="beneficiaire-formation"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {error ? (
          <div className="fr-fieldset__element">
            <div className="fr-alert fr-alert--error fr-alert--sm">
              <p>{error.message}</p>
            </div>
          </div>
        ) : null}
        <SelectFormField
          label="Ajouter le bénéficiaire"
          asterisk
          placeholder=" "
          control={form.control}
          path="membreGouvernanceId"
          disabled={isLoading}
          options={beneficiairesOptions}
        />

        <div className="fr-flex fr-justify-content-end fr-mt-8v fr-width-full">
          <Button {...buttonLoadingClassname(isLoading)} type="submit">
            Enregistrer
          </Button>
        </div>
      </form>
    </>
  )
}

export default withTrpc(BeneficiaireSubventionFormationForm)
