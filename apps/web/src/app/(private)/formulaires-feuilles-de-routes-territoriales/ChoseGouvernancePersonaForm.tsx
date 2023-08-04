'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { GouvernancePersonaId } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import {
  ChooseGouvernancePersonaData,
  ChooseGouvernancePersonaValidation,
} from '@app/web/gouvernance/ChooseGouvernancePersona'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'

const ChoseGouvernancePersonaForm = ({
  choices,
}: {
  choices: readonly GouvernancePersonaId[]
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

    router.refresh()
  }
  const disabled =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ul>
        {choices.map((choice) => (
          <li key={choice}>{choice}</li>
        ))}
      </ul>
    </form>
  )
}

export default withTrpc(ChoseGouvernancePersonaForm)
