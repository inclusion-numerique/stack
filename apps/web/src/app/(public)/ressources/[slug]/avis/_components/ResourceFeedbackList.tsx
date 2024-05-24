'use client'

import React, { useState } from 'react'
import { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResourceFeedback from './ResourceFeedback'
import ResourceFeedbackForm from './ResourceFeedbackForm'

const isGivenBy =
  (user: SessionUser | null) =>
  ({ sentById }: { sentById: string }) =>
    sentById === user?.id

export const ResourceFeedbackList = ({
  resource,
  user,
  canGiveFeedback,
}: {
  resource: ResourceProjection
  user: SessionUser | null
  canGiveFeedback: boolean
}) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <h1 className="fr-sr-only">Avis - {resource.title}</h1>
      {canGiveFeedback && !resource.resourceFeedback.some(isGivenBy(user)) && (
        <div className="fr-border fr-border-radius--8 fr-pt-4w fr-px-4w fr-mb-6w">
          <h2 className="fr-sr-only">
            Quel est votre avis à propos de cette ressource ?
          </h2>
          <ResourceFeedbackForm resource={resource} />
        </div>
      )}
      <div className="fr-mb-15w">
        <h2 className="fr-h4">
          {resource.resourceFeedback.length} Avis sur la ressource
        </h2>
        {resource.resourceFeedback.length === 0 && (
          <div className="fr-border fr-p-4w fr-mb-6w fr-text--center fr-text-mention--grey">
            Il n’y a pas encore d’avis sur cette ressource
            <br />
            Soyez le premier à partager votre avis.
          </div>
        )}
        {resource.resourceFeedback.map((feedback) => {
          const isOwner = feedback.sentById === user?.id

          return isOwner && isEditing ? (
            <ResourceFeedbackForm
              resource={resource}
              feedback={feedback}
              onDismiss={() => setIsEditing(false)}
            />
          ) : (
            <ResourceFeedback
              feedback={feedback}
              isOwner={isOwner}
              key={`${feedback.sentById}_${feedback.resourceId}`}
              onEdit={() => setIsEditing(true)}
            />
          )
        })}
      </div>
    </>
  )
}
