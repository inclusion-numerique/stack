'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { RichRadioOption } from '@app/ui/components/Form/utils/options'
import RichRadioFormField from '@app/ui/components/Form/RichRadioFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import {
  ChooseGouvernancePersonaData,
  ChooseGouvernancePersonaValidation,
} from '@app/web/gouvernance/ChooseGouvernancePersona'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const ChoseGouvernancePersonaForm = ({
  availableChoices,
}: {
  availableChoices: readonly GouvernancePersonaId[]
}) => {
  const form = useForm<ChooseGouvernancePersonaData>({
    resolver: zodResolver(ChooseGouvernancePersonaValidation),
  })

  const router = useRouter()

  const choose = trpc.formulaireGouvernance.choosePersona.useMutation()

  const onSubmit = async (data: ChooseGouvernancePersonaData) => {
    try {
      await choose.mutateAsync(data)
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, form.setError)
    }

    router.push(
      `/formulaires-feuilles-de-routes-territoriales/${data.gouvernancePersonaId}`,
    )
  }
  const disabled =
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
        disabled={disabled}
        control={form.control}
        path="gouvernancePersonaId"
        options={options}
      />
      <div className="fr-btns-group">
        <Button type="submit" disabled={disabled}>
          Valider
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(ChoseGouvernancePersonaForm)
