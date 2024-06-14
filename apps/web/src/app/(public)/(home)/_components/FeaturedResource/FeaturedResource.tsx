import React from 'react'
import Link from 'next/link'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { CropText } from '@app/web/components/CropText/CropText'
import { RoundImageProps } from '@app/web/components/RoundImage'
import BaseImage from '@app/web/components/BaseImage'
import RoundProfileImage from '@app/web/components/RoundProfileImage'

export type FeaturedResourceProps = {
  title: string
  slug: string
  published: Date | string
  base?: {
    id: string
    slug: string
    title: string
    image: RoundImageProps['image']
  }
  createdBy?: {
    id: string
    slug: string
    name: string
    isPublic: boolean
    firstName: string
    lastName: string
    image: null
  }
}

const BaseMetadata = ({
  base,
}: {
  base: NonNullable<FeaturedResourceProps['base']>
}) => (
  <>
    <BaseImage base={base} />
    <span>
      Publiée&nbsp;dans&nbsp;la&nbsp;base{' '}
      <Link
        href={`bases/${base.slug}`}
        className="fr-link fr-position-relative"
        style={{ zIndex: 2 }}
      >
        {base.title}
      </Link>
    </span>
  </>
)

const ProfileMetadata = ({
  profile,
}: {
  profile: NonNullable<FeaturedResourceProps['createdBy']>
}) => (
  <>
    <RoundProfileImage user={profile} />
    <span>
      Publiée&nbsp;par{' '}
      {profile.isPublic ? (
        <Link
          href={`profils/${profile.slug}`}
          className="fr-link fr-position-relative"
          style={{ zIndex: 2 }}
        >
          {profile.name}
        </Link>
      ) : (
        profile.name
      )}
    </span>
  </>
)

export const FeaturedResource = ({
  title,
  slug,
  published,
  base,
  createdBy,
}: FeaturedResourceProps) => (
  <div className="fr-border-top fr-enlarge-link">
    <div className="fr-my-2w fr-flex fr-align-items-center fr-flex-gap-2v">
      {base != null && <BaseMetadata base={base} />}
      {base == null && createdBy != null && (
        <ProfileMetadata profile={createdBy} />
      )}
    </div>
    <h3 className="fr-text--lg fr-mb-1v">
      <Link href={`/ressources/${slug}`}>
        <CropText limit={79}>{title}</CropText>
      </Link>
    </h3>
    Publiée&nbsp;le&nbsp;{dateAsDay(new Date(published))}
  </div>
)
