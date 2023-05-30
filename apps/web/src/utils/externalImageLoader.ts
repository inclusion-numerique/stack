import { ImageLoader } from 'next/image'
import { removeNullAndUndefinedValues } from '@app/web/utils/removeNullAndUndefinedValues'

export const externalImageLoader: ImageLoader = ({
  src,
  ...params
}: {
  src: string
}) =>
  `/images/external?${new URLSearchParams({
    ...removeNullAndUndefinedValues(params),
    src,
  }).toString()}`
