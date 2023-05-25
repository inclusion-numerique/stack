/* eslint react/jsx-props-no-spreading: off */
import React, { ComponentProps } from 'react'
import {
  GenerateUploadedImageSourceSetsInput,
  generateUploadedImageSourceSets,
} from '@app/web/utils/responsiveImage'

const ResponsiveUploadedImage = ({
  id,
  quality,
  breakpoints,
  ...imgProps
}: Omit<ComponentProps<'img'>, 'src' | 'srcSet'> &
  GenerateUploadedImageSourceSetsInput) => {
  const sources = generateUploadedImageSourceSets({ id, quality, breakpoints })
  return (
    <picture>
      {sources.map(({ media, srcSet }) => (
        <source key={media} media={media} srcSet={srcSet} />
      ))}
      <img srcSet={sources.at(-1)?.srcSet} {...imgProps} />
    </picture>
  )
}

export default ResponsiveUploadedImage
