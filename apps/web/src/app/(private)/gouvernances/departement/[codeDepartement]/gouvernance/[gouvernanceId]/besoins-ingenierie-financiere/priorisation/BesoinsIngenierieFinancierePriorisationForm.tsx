'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createToast } from '@app/ui/toast/createToast'
import {
  BesoinsEnIngenierieFinancierePrioriteData,
  BesoinsEnIngenierieFinancierePrioriteValidation,
} from '@app/web/gouvernance/BesoinsEnIngenierieFinanciere'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import WhiteCard from '@app/web/ui/WhiteCard'
import ActionBar from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/ActionBar'
import { trpc } from '@app/web/trpc'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import BesoinPriorisationCard from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/BesoinPriorisationCard'
import { BesoinsIngenierieFinanciereForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { getPriorisationCardInfos } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/getPriorisationCardInfos'
import { getPrioritesFromFormValues } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/getPrioritesFromFormValues'

const BesoinsIngenierieFinancierePriorisationForm = ({
  codeDepartement,
  defaultValue,
  besoinsEnIngenierieFinanciere,
  v2Enregistree,
}: {
  codeDepartement: string
  defaultValue: DefaultValues<BesoinsEnIngenierieFinancierePrioriteData> & {
    gouvernanceId: string
  }
  v2Enregistree?: boolean
  besoinsEnIngenierieFinanciere: BesoinsIngenierieFinanciereForForm
}) => {
  const mutation = trpc.besoinsIngenierieFinanciere.priorisation.useMutation()

  const cardInfos = useMemo(
    () =>
      getPriorisationCardInfos({
        besoinsEnIngenierieFinanciere,
        defaultValue,
      }),
    [defaultValue, besoinsEnIngenierieFinanciere],
  )

  const form = useForm<BesoinsEnIngenierieFinancierePrioriteData>({
    resolver: zodResolver(BesoinsEnIngenierieFinancierePrioriteValidation),
    defaultValues: defaultValue,
  })

  const router = useRouter()

  const onSubmit = async (data: BesoinsEnIngenierieFinancierePrioriteData) => {
    await mutation.mutateAsync(data)

    router.refresh()
    createToast({
      priority: 'success',
      message: 'Vos besoins en ingénierie financière ont bien été enregistrés',
    })
    // Open the modal on redirect if everything is completed for the first time
    const firstTimeAllCompleted =
      v2Enregistree && !besoinsEnIngenierieFinanciere.priorisationEnregistree
    router.push(
      gouvernanceHomePath(
        { codeDepartement },
        { gouvernanceCompleted: firstTimeAllCompleted },
      ),
    )
  }

  const onCancel = () => {
    form.reset(defaultValue)
  }

  const loading = mutation.isPending || mutation.isSuccess

  const cards = cardInfos.sort((a, b) => a.priorite ?? 0 - (b.priorite ?? 0))

  const priorityValues = getPrioritesFromFormValues(form.getValues().priorites)

  const orderedCards = cards.sort((a, b) => {
    const aPriority =
      priorityValues[a.prioriteKey as keyof typeof priorityValues]
    const bPriority =
      priorityValues[b.prioriteKey as keyof typeof priorityValues]
    if (typeof aPriority !== 'number' && typeof bPriority !== 'number') {
      return 0
    }
    if (typeof aPriority !== 'number') {
      return 1
    }
    if (typeof bPriority !== 'number') {
      return -1
    }
    return aPriority - bPriority
  })

  form.watch('priorites')

  const onPriorityKeyUp = (_priorityKey: string, fromPriority: number) => {
    // Swap the card with the previous one
    for (const [oldPriority, newOrderedCard] of Object.entries(orderedCards)) {
      if (Number.parseInt(oldPriority, 10) === fromPriority - 1) {
        form.setValue(
          `priorites.${
            newOrderedCard.prioriteKey as 'faireUnDiagnosticTerritorialPrestationPriorite'
          }`,
          fromPriority,
        )
        continue
      }

      if (Number.parseInt(oldPriority, 10) === fromPriority) {
        form.setValue(
          `priorites.${
            newOrderedCard.prioriteKey as 'faireUnDiagnosticTerritorialPrestationPriorite'
          }`,
          fromPriority - 1,
        )
        continue
      }
    }
  }

  const onPriorityKeyDown = (priorityKey: string, fromPriority: number) => {
    // Swap the card with the next one
    for (const [oldPriority, newOrderedCard] of Object.entries(orderedCards)) {
      if (Number.parseInt(oldPriority, 10) === fromPriority + 1) {
        form.setValue(
          `priorites.${
            newOrderedCard.prioriteKey as 'faireUnDiagnosticTerritorialPrestationPriorite'
          }`,
          fromPriority,
        )
        continue
      }

      if (Number.parseInt(oldPriority, 10) === fromPriority) {
        form.setValue(
          `priorites.${
            newOrderedCard.prioriteKey as 'faireUnDiagnosticTerritorialPrestationPriorite'
          }`,
          fromPriority + 1,
        )
        continue
      }
    }
  }

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
      {orderedCards.map((card, index) => (
        <BesoinPriorisationCard
          onPriorityKeyUp={onPriorityKeyUp}
          onPriorityKeyDown={onPriorityKeyDown}
          key={
            // eslint-disable-next-line react/no-array-index-key
            `${card.prioriteKey}-${index}`
          }
          index={index}
          card={card}
          isLast={index === cards.length - 1}
          loading={loading}
        />
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
