'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import React from 'react'
import { useRouter } from 'next/navigation'
import {
  BesoinsEnIngenierieFinancierePrioriteData,
  BesoinsEnIngenierieFinancierePrioriteValidation,
} from '@app/web/gouvernance/BesoinsEnIngenierieFinanciere'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import WhiteCard from '@app/web/ui/WhiteCard'
import ActionBar from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/ActionBar'
import { trpc } from '@app/web/trpc'
import { modifierBesoinsIngenieriePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import BesoinPriorisationCard from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/BesoinPriorisationCard'

const BesoinsIngenierieFinancierePriorisationForm = ({
  codeDepartement,
  defaultValue,
}: {
  codeDepartement: string
  defaultValue: DefaultValues<BesoinsEnIngenierieFinancierePrioriteData> & {
    gouvernanceId: string
  }
}) => {
  const mutation = trpc.besoinsIngenierieFinanciere.priorisation.useMutation()

  const form = useForm<BesoinsEnIngenierieFinancierePrioriteData>({
    resolver: zodResolver(BesoinsEnIngenierieFinancierePrioriteValidation),
    defaultValues: defaultValue,
  })

  const router = useRouter()

  const onSubmit = async (data: BesoinsEnIngenierieFinancierePrioriteData) => {
    console.log('SUBMIT', data)

    await mutation.mutateAsync(data)
    router.push(
      modifierBesoinsIngenieriePath(
        { codeDepartement },
        {
          gouvernanceId: data.gouvernanceId,
          step: 'priorisation',
        },
      ),
    )
  }

  const onCancel = () => {
    form.reset(defaultValue)
  }

  console.log('VALUES', form.getValues())
  console.log('ERRORS', form.formState.errors)

  const loading = mutation.isPending || mutation.isSuccess

  const cards = [{ key: 'todo1' }, { key: 'todo2' }]

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {cards.length === 0 && (
        <WhiteCard className="fr-pb-10v">
          Vous n’avez pas selectionné de besoins à l’étape précédente.
          <br />
          Veuillez revenir à l’étape précédente pour sélectionner des besoins.
          <br />
          Ou confirmez si vous n’avez pas de besoins à notifier.
        </WhiteCard>
      )}
      {cards.map((card, index) => (
        <BesoinPriorisationCard key={card.key} priorite={index + 1} />
      ))}
      <ActionBar onCancel={onCancel} submitLabel="Confirmer" loading={loading}>
        {mutation.error && (
          <p className="fr-text-default--error fr-my-0">
            {mutation.error.message}
          </p>
        )}
      </ActionBar>
    </form>
  )
}

export default withTrpc(BesoinsIngenierieFinancierePriorisationForm)
