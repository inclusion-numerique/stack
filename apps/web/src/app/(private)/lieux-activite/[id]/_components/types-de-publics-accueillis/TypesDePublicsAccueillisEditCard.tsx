'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createToast } from '@app/ui/toast/createToast'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import EditCard from '@app/web/components/EditCard'
import {
  TypesDePublicsAccueillisValidation,
  TypesDePublicsAccueillisData,
} from '@app/web/app/structure/TypesDePublicsAccueillisValidation'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { isEmpty } from '@app/web/utils/isEmpty'
import { TypesDePublicsAccueillisFields } from '@app/web/components/structure/fields/TypesDePublicsAccueillisFields'
import { EmptyState } from '../EmptyState'
import { TypesDePublicsAccueillisView } from './TypesDePublicsAccueillisView'

const TypesDePublicsAccueillisEditCard = ({
  id,
  priseEnChargeSpecifique,
  toutPublic,
  publicsSpecifiquementAdresses,
}: {
  id: string
  priseEnChargeSpecifique?: string[]
  toutPublic?: boolean
  publicsSpecifiquementAdresses?: string[]
}) => {
  const mutation =
    trpc.lieuActivite.updateTypesDePublicsAccueillis.useMutation()
  const router = useRouter()
  const form = useForm<TypesDePublicsAccueillisData>({
    resolver: zodResolver(TypesDePublicsAccueillisValidation),
    defaultValues: {
      id,
      priseEnChargeSpecifique,
      toutPublic,
      publicsSpecifiquementAdresses,
    },
  })

  const handleMutation = async (data: TypesDePublicsAccueillisData) => {
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
      id="types-publics-accueillis"
      title="Types de publics accueillis"
      description="Indiquez si ce lieu accueille des publics spécifiques."
      titleAs="h3"
      form={form}
      mutation={handleMutation}
      edition={<TypesDePublicsAccueillisFields form={form} />}
      view={
        <TypesDePublicsAccueillisView
          priseEnChargeSpecifique={priseEnChargeSpecifique}
          publicsSpecifiquementAdresses={publicsSpecifiquementAdresses}
          toutPublic={toutPublic}
        />
      }
      isEmpty={[priseEnChargeSpecifique, publicsSpecifiquementAdresses].every(
        isEmpty,
      )}
      emptyState={
        <EmptyState title="Compléter ces informations pour préciser les publics qui peuvent bénéficier de vos services." />
      }
    />
  )
}

export default withTrpc(TypesDePublicsAccueillisEditCard)
