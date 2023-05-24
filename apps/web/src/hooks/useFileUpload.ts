import axios from 'axios'
import { useState } from 'react'
import { trpc } from '@app/web/trpc'

export const useFileUpload = ({
  onProgress,
}: {
  onProgress?: (progressPercentage: number) => void
}) => {
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)

  const generateUploadUrl = trpc.upload.generateUploadUrl.useMutation()

  const upload = async (
    file: File,
  ): Promise<
    undefined | { key: string; mimeType: string; name: string; size: number }
  > => {
    setUploadError(null)
    setUploading(true)
    onProgress?.(0)
    const uploadInfo = await generateUploadUrl
      .mutateAsync({
        filename: file.name,
        mimeType: file.type,
      })
      .catch((error) => {
        // TODO Sentry capture exception
        console.error(error)
        setUploadError(
          "Une erreur est survenue lors de l'envoi du fichier. Veuillez réessayer.",
        )
        setUploading(false)
      })

    if (!uploadInfo) {
      return
    }

    let totalUploaded = 0

    await axios
      .put(uploadInfo.url, file, {
        headers: {
          'Content-Type': file.type,
          'Access-Control-Allow-Origin': '*',
        },
        onUploadProgress: onProgress
          ? (progressEvent) => {
              if (!progressEvent.total || progressEvent.total === 0) {
                return
              }
              if (totalUploaded !== progressEvent.total) {
                totalUploaded = progressEvent.total
              }
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              )

              onProgress(percentCompleted)
            }
          : undefined,
      })
      .catch((error) => {
        // TODO Sentry capture exception
        console.error(error)
        setUploadError(
          "Une erreur est survenue lors de l'envoi du fichier. Veuillez réessayer.",
        )
        setUploading(false)
      })

    return {
      key: uploadInfo.key,
      name: file.name,
      mimeType: file.type,
      size: totalUploaded,
    }
  }

  return {
    error: uploadError ?? generateUploadUrl.error?.message ?? null,
    uploading,
    upload,
  }
}
