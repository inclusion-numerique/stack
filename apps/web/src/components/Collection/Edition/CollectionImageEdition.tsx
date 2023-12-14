'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  UpdateCollectionInformationsCommand,
  UpdateCollectionInformationsCommandValidation,
} from '@app/web/server/collections/updateCollection'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import { trpc } from '@app/web/trpc'
import EditableCardForm from '@app/web/components/EditableCardForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const CollectionImageEdition = ({
  collection,
}: {
  collection: CollectionPageData
}) => {
  const form = useForm<UpdateCollectionInformationsCommand>({
    resolver: zodResolver(UpdateCollectionInformationsCommandValidation),
    defaultValues: {
      id: collection.id,
      title: collection.title,
      description: collection.description ?? undefined,
    },
  })

  const mutate = trpc.collection.updateInformations.useMutation()

  const handleSave = async (data: UpdateCollectionInformationsCommand) => {
    await mutate.mutateAsync(data)
  }

  // {/*  <ImageEdition */}
  // {/*    control={control} */}
  // {/*    disabled={isLoading} */}
  // {/*    onChange={setImage} */}
  // {/*  /> */}

  return (
    <EditableCardForm
      id="apercu"
      title="Aperçu de la collection"
      form={form}
      onSave={handleSave}
      preview={<>TODO preview</>}
      editing={<>TODO editing</>}
    />
  )
}

export default withTrpc(CollectionImageEdition)
