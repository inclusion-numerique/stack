import React, { ReactNode } from 'react'
import Link from 'next/link'
import { htmlToText } from '@app/web/utils/htmlToText'
import { getDepartmentName } from '@app/web/utils/departments'
import BaseImage from '@app/web/components/BaseImage'
import { RoundImageProps } from '@app/web/components/RoundImage'

export const FeaturedBase = ({
  id,
  slug,
  title,
  excerpt,
  department,
  image,
  // resourcesCount,
  // followersCount,
  children,
}: {
  id: string
  slug: string
  title: string
  excerpt: string
  department: string
  image: RoundImageProps['image']
  // resourcesCount?: number
  // followersCount?: number
  children?: ReactNode
}) => (
  <>
    <div className="fr-mb-2w fr-enlarge-link fr-no-hover-bg">
      <Link href={`/bases/${slug}`}>
        <BaseImage base={{ id, image }} size={96} />
      </Link>
      <h3 className="fr-h6 fr-my-3v">{title}</h3>
      <p className="fr-text--sm fr-text-mention--grey fr-mb-0 fr-flex fr-flex-gap-1v">
        <span className="ri-map-pin-2-line" />
        {getDepartmentName(department)}
      </p>
      <div className="fr-text--sm fr-my-3v">{htmlToText(excerpt)}</div>
      {/* <div className="fr-text--sm fr-mb-0 fr-text-mention--grey fr-flex fr-flex-gap-2v"> */}
      {/*  <span className="ri-file-text-line" /> */}
      {/*  <b>{resourcesCount}</b>· */}
      {/*  <span className="ri-user-heart-line" /> */}
      {/*  <b>{followersCount}</b> */}
      {/* </div> */}
    </div>
    {children}
  </>
)
