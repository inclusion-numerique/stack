import { ImageLoader } from 'next/image'
import { removeNullAndUndefinedValues } from '@app/web/utils/removeNullAndUndefinedValues'

export const uploadedImageLoader: ImageLoader = ({
  src,
  ...params
}: {
  src: string
}) =>
  `/uploads/images/${src}.webp?${new URLSearchParams(
    removeNullAndUndefinedValues(params),
  ).toString()}`
