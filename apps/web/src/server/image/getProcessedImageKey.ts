import { isImageCropped } from '@app/web/utils/imageCrop'
import { Image } from '@prisma/client'

const computeCropKey = ({
  cropTop,
  cropHeight,
  cropLeft,
  cropWidth,
}: {
  cropTop: number
  cropHeight: number
  cropLeft: number
  cropWidth: number
}) =>
  isImageCropped({ cropTop, cropHeight, cropLeft, cropWidth })
    ? `${cropTop}_${cropHeight}_${cropLeft}_${cropWidth}`
    : 'nocrop'

// When an original image is processed, we store it with a unique key depending on the processing parameters
export const getProcessedImageKey = ({
  image: { id, uploadKey, cropTop, cropHeight, cropLeft, cropWidth },
  quality,
  width,
}: {
  image: Pick<
    Image,
    'id' | 'uploadKey' | 'cropWidth' | 'cropTop' | 'cropLeft' | 'cropHeight'
  >
  quality: number
  width?: number
}) =>
  // Add the numbers cropTop, cropHeight, cropLeft, cropWidth as a unique string separted by _
  `images/${id}/${uploadKey}_${computeCropKey({
    cropTop,
    cropHeight,
    cropLeft,
    cropWidth,
  })}_${width ?? 'original'}_${quality}.webp`
