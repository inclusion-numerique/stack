'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createToast } from '@app/ui/toast/createToast'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import EditCard from '@app/web/components/EditCard'
import { DescriptionFields } from '@app/web/components/structure/fields/DescriptionFields'
import {
  DescriptionValidation,
  DescriptionData,
} from '@app/web/app/structure/DescriptionValidation'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { isEmpty } from '@app/web/utils/isEmpty'
import { EmptyState } from '../EmptyState'
import { DescriptionView } from './DescriptionView'

const DescriptionEditCard = ({
  id,
  typologies,
  presentationResume,
  presentationDetail,
}: {
  id: string
  typologies?: string[] | null
  presentationResume?: string | null
  presentationDetail?: string | null
}) => {
  const mutation = trpc.lieuActivite.updateDescription.useMutation()
  const router = useRouter()
  const form = useForm<DescriptionData>({
    resolver: zodResolver(DescriptionValidation),
    defaultValues: {
      id,
      typologies,
      presentationResume,
      presentationDetail,
    },
  })

  const handleMutation = async (data: DescriptionData) => {
    try {
      await mutation.mutateAsync(data)

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
      noBorder
      contentSeparator={false}
      id="description"
      title="Description du lieu"
      description="Décrivez ici le lieu et les activités qu’il propose."
      titleAs="h3"
      form={form}
      mutation={handleMutation}
      edition={<DescriptionFields form={form} />}
      view={
        <DescriptionView
          typologies={typologies}
          presentationResume={presentationResume}
          presentationDetail={presentationDetail}
        />
      }
      isEmpty={[typologies, presentationResume, presentationDetail].every(
        isEmpty,
      )}
      emptyState={
        <EmptyState title="Compléter ces informations pour donner du contexte aux aidants qui découvrent ce lieu." />
      }
    />
  )
}

export default withTrpc(DescriptionEditCard)
