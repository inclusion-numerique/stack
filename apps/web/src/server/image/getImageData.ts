import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { processImage } from '@app/web/server/image/processImage'
import { s3 } from '@app/web/server/s3/s3'
import { isImageCropped } from '@app/web/utils/imageCrop'
import { output } from '@app/web/utils/output'
import {
  GetObjectCommand,
  NoSuchKey,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import type { Image, Upload } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import { getProcessedImageKey } from './getProcessedImageKey'

export const getImageData = async ({
  image,
  quality,
  width,
}: {
  image: Pick<
    Image,
    'id' | 'uploadKey' | 'cropWidth' | 'cropTop' | 'cropLeft' | 'cropHeight'
  >
  quality: number
  width?: number
}): Promise<Buffer | ReadableStream> => {
  const cachedImageKey = getProcessedImageKey({
    image,
    quality,
    width,
  })

  const cachedImageObject = await s3
    .send(
      new GetObjectCommand({
        Bucket: ServerWebAppConfig.S3.uploadsBucket,
        Key: cachedImageKey,
      }),
    )
    .catch((error) => {
      if (error instanceof NoSuchKey) {
        return null
      }
      throw error
    })

  if (cachedImageObject?.Body) {
    // Image is already computed and cached in the bucket
    return cachedImageObject.Body.transformToWebStream()
  }

  // Check if image is already being processed
  const queuedPromise = imageProcessingQueue.get(cachedImageKey)
  if (queuedPromise) {
    return queuedPromise
  }

  // Create new processing promise
  const imageProcessingPromise = processImageAndCache({
    image,
    quality,
    width,
    cachedImageKey,
  }).finally(() => {
    // Remove from queue when processing is complete (success or failure)
    imageProcessingQueue.remove({ cachedImageKey })
  })

  // Add to queue
  imageProcessingQueue.add({
    cachedImageKey,
    imagePromise: imageProcessingPromise,
  })

  return imageProcessingPromise
}
