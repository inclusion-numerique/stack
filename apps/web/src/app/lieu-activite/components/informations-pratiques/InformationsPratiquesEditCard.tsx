'use client'

import { createToast } from '@app/ui/toast/createToast'
import {
  InformationsPratiquesData,
  InformationsPratiquesValidation,
} from '@app/web/app/structure/InformationsPratiquesValidation'
import EditCard from '@app/web/components/EditCard'
import { InformationsPratiquesFields } from '@app/web/components/structure/fields/InformationsPratiquesFields'
import { appendComment } from '@app/web/components/structure/fields/openingHoursHelpers'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { isEmpty } from '@app/web/utils/isEmpty'
import {
  Schedule,
  fromTimetableOpeningHours,
  toTimetableOpeningHours,
} from '@gouvfr-anct/timetable-to-osm-opening-hours'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { EmptyState } from '../EmptyState'
import { InformationsPratiquesView } from './InformationsPratiquesView'

const InformationsPratiquesEditCard = ({
  id,
  lieuItinerant,
  siteWeb,
  ficheAccesLibre,
  priseRdv,
  horaires,
}: {
  id: string
  lieuItinerant?: boolean | null
  siteWeb?: string | null
  ficheAccesLibre?: string | null
  priseRdv?: string | null
  horaires?: string | null
}) => {
  const mutation = trpc.lieuActivite.updateInformationsPratiques.useMutation()
  const router = useRouter()

  const form = useForm<InformationsPratiquesData>({
    resolver: zodResolver(InformationsPratiquesValidation),
    defaultValues: {
      id,
      lieuItinerant,
      siteWeb,
      ficheAccesLibre,
      priseRdv,
      openingHours:
        horaires == null || horaires === ''
          ? undefined
          : toTimetableOpeningHours(new Date())(horaires),
      horairesComment: horaires?.match(/".+"/g)?.toString().replaceAll('"', ''),
    },
  })

  const handleMutation = async (data: InformationsPratiquesData) => {
    try {
      await mutation.mutateAsync({
        ...data,
        horaires: appendComment(
          fromTimetableOpeningHours(data.openingHours as Schedule),
          data?.horairesComment,
        ),
      })

      createToast({
        priority: 'success',
        message: 'Le lieu d’activité a bien été modifié.',
      })

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
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }

  return (
    <EditCard
      contentSeparator={false}
      noBorder
      id="informations-pratiques"
      title="Informations pratiques"
      description="Horaires, accès et site internet du lieu."
      titleAs="h2"
      form={form}
      mutation={handleMutation}
      edition={<InformationsPratiquesFields form={form} />}
      view={
        <InformationsPratiquesView
          lieuItinerant={lieuItinerant}
          siteWeb={siteWeb}
          ficheAccesLibre={ficheAccesLibre}
          priseRdv={priseRdv}
          horaires={horaires}
        />
      }
      isEmpty={
        !lieuItinerant &&
        [siteWeb, ficheAccesLibre, horaires, priseRdv].every(isEmpty)
      }
      emptyState={
        <EmptyState title="Compléter ces informations pour faciliter l’accès du public." />
      }
    />
  )
}

export default withTrpc(InformationsPratiquesEditCard)
