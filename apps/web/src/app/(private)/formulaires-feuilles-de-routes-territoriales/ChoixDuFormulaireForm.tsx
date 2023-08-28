'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { RichRadioOption } from '@app/ui/components/Form/utils/options'
import RichRadioFormField from '@app/ui/components/Form/RichRadioFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import {
  ChoixDuFormulaireData,
  ChoixDuFormulaireValidation,
} from '@app/web/gouvernance/ChoixDuFormulaire'

const ChoixDuFormulaireForm = ({
  availableChoices,
}: {
  availableChoices: readonly GouvernancePersonaId[]
}) => {
  const form = useForm<ChoixDuFormulaireData>({
    resolver: zodResolver(ChoixDuFormulaireValidation),
  })

  const router = useRouter()

  const mutation = trpc.formulaireGouvernance.choixDuFormulaire.useMutation()

  const onSubmit = async (data: ChoixDuFormulaireData) => {
    try {
      const { etapeInfo } = await mutation.mutateAsync(data)
      router.push(etapeInfo.absolutePath)
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, form.setError)
    }
  }
  const isLoading =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful

  const options: RichRadioOption[] = availableChoices.map((choice) => {
    const persona = gouvernancePersonas[choice]

    return {
      name: persona.title,
      value: persona.id,
    }
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <RichRadioFormField
        disabled={isLoading}
        control={form.control}
        path="gouvernancePersonaId"
        options={options}
      />
      <div className="fr-btns-group">
        <Button
          type="submit"
          className={isLoading ? 'fr-btn--loading' : undefined}
        >
          Valider
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(ChoixDuFormulaireForm)
