import React from 'react'
import { FilteredBase } from '@app/web/server/bases/authorization'
import { BasePageData } from '@app/web/server/bases/getBase'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import RoundImage from '../RoundImage'
import styles from './Images.module.css'

const Images = ({ base }: { base: BasePageData | FilteredBase }) => (
  <>
    <div className={styles.banner}>
      {base.coverImage ? (
        <ResponsiveUploadedImage
          id={base.coverImage.id}
          alt={base.coverImage.altText ?? ''}
          breakpoints={[
            { media: '(max-width: 320px)', width: 320 - 32 },
            { media: '(max-width: 576px)', width: 576 - 32 },
            { media: '(max-width: 768px)', width: 768 - 32 },
            { media: '(min-width: 768px)', width: 1200 },
          ]}
        />
      ) : null}
    </div>
    <RoundImage
      className={styles.logo}
      size={128}
      image={base.image}
      borderWidth={2}
    />
  </>
)

export default Images
