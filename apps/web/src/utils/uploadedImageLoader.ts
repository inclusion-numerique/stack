import { removeNullAndUndefinedValues } from '@app/web/utils/removeNullAndUndefinedValues'
import { ImageLoader } from 'next/image'

export const uploadedImageLoader: ImageLoader = ({
  src,
  ...params
}: {
  src: string
}) =>
  `/uploads/images/${src}.webp?${new URLSearchParams(
    removeNullAndUndefinedValues(params),
  ).toString()}`
