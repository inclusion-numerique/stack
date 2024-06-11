import React, { ReactNode } from 'react'
import classNames from 'classnames'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import CustomTag, { TagColor } from '../CustomTag'

const ResourcesViewsAndMetadata = ({
  className,
  resource,
  children,
}: {
  className?: string
  resource: ResourceListItem
  children?: ReactNode
}) => (
  <span
    data-testid="resources-views-and-metadata"
    className={classNames(
      'fr-text--sm fr-mb-0 fr-text-mention--grey fr-flex fr-direction-column-reverse fr-direction-sm-row fr-flex-gap-2v',
      className,
    )}
  >
    <span className="fr-flex fr-flex-gap-2v">
      <span className="fr-flex fr-flex-gap-1v">
        <span className="fr-icon-eye-line fr-icon--sm" aria-hidden />
        <span className="fr-text--bold" data-testid="resource-views-count">
          {resource._count.views}
        </span>
      </span>
      <span>·</span>
      <span className="fr-flex fr-flex-gap-1v">
        <span className="fr-icon-bookmark-line fr-icon--sm" aria-hidden />
        <span
          className="fr-text--bold"
          data-testid="resource-collections-count"
        >
          {resource._count.collections}
        </span>
      </span>
      {!resource.isPublic && (
        <span className="fr-unhidden fr-hidden-sm">
          <span className="fr-mr-1w">·</span>
          <span className="fr-tag fr-tag--sm">
            <span className="ri-lock-line" aria-hidden="true" />
            <span className="fr-sr-only">Privée</span>
          </span>
        </span>
      )}
      <span className="fr-hidden fr-unhidden-sm">·</span>
    </span>
    {children && <span className="fr-flex fr-flex-gap-2v">{children}</span>}
    {!resource.isPublic && (
      <span className="fr-hidden fr-unhidden-sm">
        <span className="fr-mr-1w ">·</span>
        <CustomTag
          small
          color={TagColor.GREY}
          icon="fr-icon-lock-line"
          label="Privée"
        />
      </span>
    )}
  </span>
)
export default ResourcesViewsAndMetadata
