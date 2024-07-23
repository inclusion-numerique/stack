'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createToast } from '@app/ui/toast/createToast'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import EditCard from '@app/web/components/EditCard'
import {
  ModalitesAccesAuServiceValidation,
  ModalitesAccesAuServiceData,
} from '@app/web/app/structure/ModalitesAccesAuServiceValidation'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { isEmpty } from '@app/web/utils/isEmpty'
import { ModalitesAccesAuServiceFields } from '@app/web/components/structure/fields/ModalitesAccesAuServiceFields'
import { EmptyState } from '../EmptyState'
import { ModalitesAccesAuServiceView } from './ModalitesAccesAuServiceView'

const ModalitesAccesAuServiceEditCard = ({
  id,
  fraisACharge,
  modalitesAcces,
}: {
  id: string
  fraisACharge?: string[]
  modalitesAcces?: {
    surPlace?: boolean | null
    parTelephone?: boolean | null
    parMail?: boolean | null
    numeroTelephone?: string | null
    adresseMail?: string | null
  }
}) => {
  const mutation = trpc.lieuActivite.updateModalitesAccesAuService.useMutation()
  const router = useRouter()
  const form = useForm<ModalitesAccesAuServiceData>({
    resolver: zodResolver(ModalitesAccesAuServiceValidation),
    defaultValues: {
      id,
      fraisACharge,
      modalitesAcces,
    },
  })

  const handleMutation = async (data: ModalitesAccesAuServiceData) => {
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
      id="modalites-acces-au-service"
      title="Modalités d’accès au service"
      description="Indiquez comment bénéficier des services d’inclusion numérique."
      titleAs="h3"
      form={form}
      mutation={handleMutation}
      edition={<ModalitesAccesAuServiceFields form={form} />}
      view={
        <ModalitesAccesAuServiceView
          modalitesAcces={modalitesAcces}
          fraisACharge={fraisACharge}
        />
      }
      isEmpty={
        [fraisACharge].every(isEmpty) &&
        !modalitesAcces?.parMail &&
        !modalitesAcces?.parTelephone &&
        !modalitesAcces?.surPlace
      }
      emptyState={
        <EmptyState title="Compléter ces informations pour permettre l’orientation des bénéficiaires vers vos services." />
      }
    />
  )
}

export default withTrpc(ModalitesAccesAuServiceEditCard)
