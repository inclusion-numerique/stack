'use client'

import FileFormField from '@app/ui/components/Form/FileFormField'
import {
  FileValidationOptions,
  fileValidation,
} from '@app/ui/components/Form/utils/fileValidation.client'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useFileUpload } from '@app/web/hooks/useFileUpload'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createUploadFileFormValidation = (options: FileValidationOptions) =>
  z.object({
    file: fileValidation(options),
    // Used for error setting
    fileUploadError: z.any().optional(),
  })

type UploadFileFormData = z.infer<
  ReturnType<typeof createUploadFileFormValidation>
>

const UploadImageForm = ({
  ...fileValidationOptions
}: FileValidationOptions) => {
  const validation = useMemo(
    () => createUploadFileFormValidation(fileValidationOptions),
    // biome-ignore lint/correctness/useExhaustiveDependencies: this is only needed to be computed when this changes
    [fileValidationOptions],
  )

  // Your actual use case mutation for this form
  const createImage = trpc.image.create.useMutation()
  const router = useRouter()

  // File upload hooks for storage
  const [uploadProgressInfo, setUploadProgressInfo] = useState('')
  const fileUpload = useFileUpload({
    onProgress: (progress) => {
      setUploadProgressInfo(`Envoi du fichier en cours... ${progress}%`)
    },
  })

  // Your form for your use case
  const {
    control,
    formState: { isSubmitting, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<UploadFileFormData>({
    resolver: zodResolver(validation),
  })

  const onSubmit = async (data: UploadFileFormData) => {
    // When the user submits a file, it has been validated client side by fileValidation()

    // 1. We create a signed url to upload the file to the storage
    const uploaded = await fileUpload.upload(data.file)
    if (!uploaded) {
      // Upload failed, error will be displayed from hooks states
      return
    }

    // 2. We submit the form with uploaded result data

    await createImage.mutateAsync({
      file: uploaded,
    })

    // 3. In this case we reset the form
    reset()
    setUploadProgressInfo('')
    router.refresh()
  }

  const disabled = isSubmitting
  const isSuccessful = isSubmitSuccessful && !fileUpload.error

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FileFormField
        control={control}
        path="file"
        disabled={disabled}
        info={uploadProgressInfo}
      />
      {fileUpload.error && (
        <p className={classNames('fr-error-text', 'fr-mt-1v')}>
          {fileUpload.error}
        </p>
      )}
      {isSuccessful && (
        <p className={classNames('fr-valid-text', 'fr-mt-1v')}>Image envoyée</p>
      )}
      {createImage.isSuccess ? (
        <p>{`Votre image ${createImage.data?.upload.name} a bien été envoyé`}</p>
      ) : (
        <Button type="submit" disabled={disabled} className="fr-mt-4v">
          Envoyer
        </Button>
      )}
    </form>
  )
}

export default withTrpc(UploadImageForm)
