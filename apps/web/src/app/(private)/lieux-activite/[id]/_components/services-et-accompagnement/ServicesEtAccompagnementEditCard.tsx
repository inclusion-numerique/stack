'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createToast } from '@app/ui/toast/createToast'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import EditCard from '@app/web/components/EditCard'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  ServicesEtAccompagnementValidation,
  ServicesEtAccompagnementData,
} from '@app/web/app/structure/ServicesEtAccompagnementValidation'
import { isEmpty } from '@app/web/utils/isEmpty'
import { ServicesEtAccompagnementFields } from '@app/web/components/structure/fields/ServicesEtAccompagnementFields'
import { EmptyState } from '../EmptyState'
import { ServicesEtAccompagnementView } from './ServicesEtAccompagnementView'

const ServicesEtAccompagnementEditCard = ({
  id,
  services,
  modalitesAccompagnement,
}: {
  id: string
  services?: string[]
  modalitesAccompagnement?: string[]
}) => {
  const mutation =
    trpc.lieuActivite.updateServicesEtAccompagnement.useMutation()
  const router = useRouter()
  const form = useForm<ServicesEtAccompagnementData>({
    resolver: zodResolver(ServicesEtAccompagnementValidation),
    defaultValues: {
      id,
      services,
      modalitesAccompagnement,
    },
  })

  const handleMutation = async (data: ServicesEtAccompagnementData) => {
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
      id="services-et-accompagnement"
      title="Services & types d’accompagnement"
      description="Renseignez ici les services et les types d’accompagnements proposés dans ce lieu."
      titleAs="h3"
      form={form}
      mutation={handleMutation}
      edition={<ServicesEtAccompagnementFields form={form} />}
      view={
        <ServicesEtAccompagnementView
          services={services}
          modalitesAccompagnement={modalitesAccompagnement}
        />
      }
      isEmpty={[services, modalitesAccompagnement].every(isEmpty)}
      emptyState={
        <EmptyState title="Compléter ces informations pour rendre visible votre offre de services aux aidants qui souhaitent orienter un bénéficiaire." />
      }
    />
  )
}

export default withTrpc(ServicesEtAccompagnementEditCard)
