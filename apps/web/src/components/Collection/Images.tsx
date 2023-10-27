import React from 'react'
import classNames from 'classnames'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { resourceCardImageBreakpoints } from '@app/web/components/Resource/resourceCardImageBreakpoints'
import styles from './Images.module.css'
import EmptyImage from './EmptyImage'

/**
 * For now we reuse resource card breakpoints to minimize the number of image processed on the backend
 * And also to minimize the number of images downloaded by the client (same size is not downloaded twice)
 */
const collectionMainImageBreakpoints = resourceCardImageBreakpoints

const collectionBigImageBreakpoints = resourceCardImageBreakpoints

const collectionSmallImageBreakpoints = resourceCardImageBreakpoints

const Images = ({
  className,
  image,
  resources,
}: {
  className?: string
  image?: { id: string; altText?: string | null } | null
  resources: { image: { id: string; altText: string | null } | null }[]
}) => {
  // Display the collection main image if it exists

  if (image) {
    return (
      <div className={classNames(styles.container, className)}>
        <ResponsiveUploadedImage
          id={image.id}
          alt={image.altText ?? ''}
          breakpoints={collectionMainImageBreakpoints}
        />
      </div>
    )
  }

  // Get resources with images
  const [bigImage, secondImage, thirdImage] = resources
    .map((resource) => resource.image)
    .filter(
      (
        resourceImage,
      ): resourceImage is { id: string; altText: string | null } =>
        !!resourceImage,
    )

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.column}>
        <div className={styles.firstImageContainer}>
          {bigImage ? (
            <ResponsiveUploadedImage
              id={bigImage.id}
              alt={bigImage.altText ?? ''}
              breakpoints={collectionBigImageBreakpoints}
            />
          ) : (
            <EmptyImage size="medium" />
          )}
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.smallImageContainer}>
          {secondImage ? (
            <ResponsiveUploadedImage
              id={secondImage.id}
              alt={secondImage.altText ?? ''}
              breakpoints={collectionSmallImageBreakpoints}
            />
          ) : (
            <EmptyImage size="small" position="top" />
          )}
        </div>
        <div className={styles.smallImageContainer}>
          {thirdImage ? (
            <ResponsiveUploadedImage
              id={thirdImage.id}
              alt={thirdImage.altText ?? ''}
              breakpoints={collectionSmallImageBreakpoints}
            />
          ) : (
            <EmptyImage size="small" position="bottom" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Images
