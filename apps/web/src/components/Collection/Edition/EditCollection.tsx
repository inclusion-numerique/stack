'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import {
  CreateCollectionCommand,
  CreateCollectionCommandValidation,
} from '@app/web/server/collections/createCollection'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import CollectionInformationsEdition from './CollectionInformationsEdition'

const EditCollectionInformation = ({
  collection,
  base,
}: {
  collection: CollectionPageData
  base: { id: string; isPublic: boolean } | null
}) => {
  const router = useRouter()

  const mutate = trpc.collection.create.useMutation()

  const form = useForm<CreateCollectionCommand>({
    resolver: zodResolver(CreateCollectionCommandValidation),
    defaultValues: {
      baseId: base?.id,
      title: collection.title,
      description: collection.description ?? undefined,
      isPublic: collection.isPublic,
    },
  })
  const {
    handleSubmit,
    setError,
    // formState: { isSubmitting },
  } = form

  const onSubmit = async (data: CreateCollectionCommand) => {
    try {
      const collectionMutation = await mutate.mutateAsync({
        ...data,
      })
      router.refresh()
      router.push(`/collections/${collectionMutation.id}/modifier`)
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, setError)
    }
  }

  // const isLoading = isSubmitting || mutate.isPending || mutate.isSuccess

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CollectionInformationsEdition form={form} />
    </form>
  )
}

export default withTrpc(EditCollectionInformation)
