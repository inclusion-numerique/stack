'use client'

import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { zodResolver } from '@hookform/resolvers/zod'
import FileFormField from '@app/ui/components/Form/FileFormField'
import { fileValidation } from '@app/ui/components/Form/utils/fileValidation.client'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import type { SendCommand } from '@app/web/components/Resource/Edition/Edition'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { useFileUpload } from '@app/web/hooks/useFileUpload'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import {
  imageAllowedExtensions,
  imageFileValidationOptions,
  imageMaxSize,
} from '@app/web/server/rpc/image/imageValidation'
import { trpc } from '@app/web/trpc'
import styles from './EditableImage.module.css'

const imageFileValidation = fileValidation({
  ...imageFileValidationOptions,
  required: true,
})

const ImageEditionFormValidation = z.object({
  file: imageFileValidation,
})

type ImageEditionFormData = z.infer<typeof ImageEditionFormValidation>

const ResourceImageEdition = ({
  resource,
  sendCommand,
  setEditing,
  editing,
}: {
  resource: ResourceProjectionWithContext
  sendCommand: SendCommand
  editing: string | null
  setEditing: Dispatch<SetStateAction<string | null>>
}) => {
  const { id, image } = resource

  const isEditingImage = editing === 'image'
  const isEditingAnotherContent = !!editing && !isEditingImage

  // File upload hooks for storage
  const [uploadProgressInfo, setUploadProgressInfo] = useState('')
  const fileUpload = useFileUpload({
    onProgress: (progress) => {
      setUploadProgressInfo(`Téléversement de l'image en cours... ${progress}%`)
    },
  })

  // Image creation mutation
  const createImage = trpc.image.create.useMutation()

  const {
    control,
    formState: { isSubmitting },
    reset,
    handleSubmit,
    watch,
  } = useForm<ImageEditionFormData>({
    resolver: zodResolver(ImageEditionFormValidation),
  })

  const onSubmit = async (data: ImageEditionFormData) => {
    // When the user submits a file, it has been validated client side by fileValidation()

    // 1. We create a signed url and upload the file to the storage
    const uploaded = await fileUpload.upload(data.file)
    if (!uploaded) {
      // Upload failed, error will be displayed from hooks states
      return
    }

    // 2. We create an image based on the uploaded file
    const imageCreationResult = await createImage.mutateAsync({
      file: uploaded,
    })

    // 3. We send the edition command with the created image id
    await sendCommand({
      name: 'EditImage',
      payload: {
        imageId: imageCreationResult.id,
        resourceId: id,
      },
    })

    // 4. We reset the form
    if (isEditingImage) {
      setEditing(null)
    }
    reset()
    setUploadProgressInfo('')
  }

  const fileFieldHint = `Taille maximale : ${formatByteSize(
    imageMaxSize,
  )}. Formats
              supportés : ${imageAllowedExtensions.join(', ')}.`
  const disabled = isSubmitting || isEditingAnotherContent

  const onCancel = () => {
    reset()
    setEditing(null)
  }

  // Notify edition page that we are editing image when user is chosing a different image
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.file && !isEditingImage) {
        setEditing('image')
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, isEditingImage, setEditing])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={image ? styles.container : styles.emptyContainer}>
        <div className={styles.imageAndInput}>
          {image ? (
            <ResponsiveUploadedImage
              id={image.id}
              alt={image.altText ?? ''}
              data-testid="resource-image"
              breakpoints={[
                { media: '(max-width: 320px)', width: 320 - 32 },
                { media: '(max-width: 576px)', width: 576 - 32 },
                { media: '(max-width: 768px)', width: 768 - 32 },
                { media: '(min-width: 768px)', width: 800 },
              ]}
            />
          ) : (
            <Image
              src="/images/image-placeholder.svg"
              alt="Image vide"
              data-testid="resource-image-placeholder"
              width={40}
              height={40}
            />
          )}
          <div>
            <FileFormField
              label={
                image
                  ? "Remplacer l'image"
                  : 'Ajouter une image de présentation pour attirer les visiteurs'
              }
              hint={fileFieldHint}
              data-testid="resource-image-file-field"
              control={control}
              path="file"
              disabled={disabled}
              info={uploadProgressInfo}
            />
          </div>
        </div>
        {isEditingImage && (
          <ButtonsGroup
            inlineLayoutWhen="md and up"
            className="fr-mt-8v"
            buttonsSize="small"
            buttons={[
              {
                disabled,
                priority: 'tertiary',
                iconId: 'fr-icon-close-line',
                children: 'Annuler',
                type: 'button',
                onClick: onCancel,
                nativeButtonProps: { 'data-testid': 'edit-image-cancel' },
              },
              {
                disabled,
                priority: 'tertiary',
                iconId: 'fr-icon-check-line',
                children: 'Valider',
                type: 'submit',
                nativeButtonProps: { 'data-testid': 'edit-image-submit' },
              },
            ]}
          />
        )}
      </div>
    </form>
  )
}

export default ResourceImageEdition
