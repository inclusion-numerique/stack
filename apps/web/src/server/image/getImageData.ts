import sharp from 'sharp'
import {
  GetObjectCommand,
  NoSuchKey,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import * as Sentry from '@sentry/nextjs'
import { Image } from '@prisma/client'
import { s3 } from '@app/web/server/s3/s3'
import { imageCropToRegion, isImageCropped } from '@app/web/utils/imageCrop'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

const computeImageVersionCacheKey = ({
  id,
  quality,
  width,
}: {
  id: string
  quality: number
  width?: number
}) => `images/${id}/${width ?? 'original'}_${quality}.webp`

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
  const cachedImageKey = computeImageVersionCacheKey({
    id: image.id,
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
    // Image is already cached
    return cachedImageObject.Body.transformToWebStream()
  }

  // Image is not cached, we need to compute it for given quality and width
  const originalImageObject = await s3.send(
    new GetObjectCommand({
      Bucket: ServerWebAppConfig.S3.uploadsBucket,
      Key: image.uploadKey,
    }),
  )

  if (!originalImageObject.Body) {
    throw new Error('Image not found')
  }

  const sharpImage = sharp(
    await originalImageObject.Body.transformToByteArray(),
  )
  const { height: originalHeight, width: originalWidth } =
    await sharpImage.metadata()

  if (!originalHeight || !originalWidth) {
    // This is an invalid image
    // TODO Tell sentry about it
    throw new Error('Invalid image file')
  }

  if (isImageCropped(image)) {
    sharpImage.extract(
      imageCropToRegion(image, {
        height: originalHeight,
        width: originalWidth,
      }),
    )
  }

  // Do not resize if image is smaller than requested target width
  if (width && originalWidth > width) {
    sharpImage.resize(width)
  }

  const imageData = await sharpImage.webp({ quality }).toBuffer()

  // Caching result in background for speeding up response time
  s3.send(
    new PutObjectCommand({
      Bucket: ServerWebAppConfig.S3.uploadsBucket,
      Key: cachedImageKey,
      Body: imageData,
    }),
  ).catch((error) => {
    Sentry.captureException(error)
  })

  return imageData
}
