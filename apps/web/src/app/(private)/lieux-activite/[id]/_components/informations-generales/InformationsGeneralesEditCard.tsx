'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createToast } from '@app/ui/toast/createToast'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import EditCard from '@app/web/components/EditCard'
import { validateValidRnaDigits } from '@app/web/rna/rnaValidation'
import {
  InformationsGeneralesValidation,
  InformationsGeneralesData,
} from '@app/web/app/structure/InformationsGeneralesValidation'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { InformationsGeneralesFields } from './InformationsGeneralesFields'
import { InformationsGeneralesView } from './InformationsGeneralesView'

const InformationsGeneralesEditCard = (props: {
  id: string
  nom: string
  adresse: string
  commune: string
  codePostal: string
  codeInsee?: string | null
  complementAdresse?: string | null
  siret?: string | null
  rna?: string | null
}) => {
  const mutation = trpc.lieuActivite.updateInformationsGenerales.useMutation()
  const router = useRouter()
  const form = useForm<InformationsGeneralesData>({
    resolver: zodResolver(InformationsGeneralesValidation),
    defaultValues: props,
  })

  const handleMutation = async (data: InformationsGeneralesData) => {
    if (data.siret && validateValidRnaDigits(data.siret)) {
      // eslint-disable-next-line no-param-reassign
      data.rna = data.siret
      // eslint-disable-next-line no-param-reassign
      data.siret = undefined
    }

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
      id="informations-generales"
      title={
        <span className="fr-text-label--blue-france">
          Informations générales
        </span>
      }
      titleAs="h2"
      form={form}
      mutation={handleMutation}
      edition={<InformationsGeneralesFields {...props} form={form} />}
      view={<InformationsGeneralesView {...props} />}
    />
  )
}

export default withTrpc(InformationsGeneralesEditCard)
