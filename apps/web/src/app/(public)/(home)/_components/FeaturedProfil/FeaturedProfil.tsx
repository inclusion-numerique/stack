import React from 'react'
import Link from 'next/link'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { RoundImageProps } from '@app/web/components/RoundImage'

export const FeaturedProfil = ({
  slug,
  name,
  firstName,
  lastName,
  image = null,
  // resourcesCount = 0,
  // followersCount = 0,
}: {
  slug: string
  name: string
  firstName: string
  lastName: string
  image?: RoundImageProps['image']
  // resourcesCount?: number
  // followersCount?: number
}) => (
  <div className="fr-flex fr-align-items-center fr-flex-gap-4v fr-enlarge-link fr-no-hover-bg">
    <RoundProfileImage user={{ firstName, lastName, image }} size={48} />
    <div>
      <h3 className="fr-text--md fr-mb-0">
        <Link href={`/profils/${slug}`}>{name}</Link>
      </h3>
      {/* <div className="fr-text--sm fr-mb-0 fr-text-mention--grey fr-flex fr-flex-gap-2v"> */}
      {/*  <span className="ri-file-text-line" /> */}
      {/*  <span className="fr-flex fr-flex-gap-2v"> */}
      {/*    <b>{resourcesCount}</b> */}
      {/*    <span className="fr-hidden fr-unhidden-md"> Ressources</span> */}
      {/*  </span> */}
      {/*  · */}
      {/*  <span className="ri-user-heart-line" /> */}
      {/*  <span className="fr-flex fr-flex-gap-2v"> */}
      {/*    <b>{followersCount}</b> */}
      {/*    <span className="fr-hidden fr-unhidden-md"> Suivis</span> */}
      {/*  </span> */}
      {/* </div> */}
    </div>
  </div>
)
