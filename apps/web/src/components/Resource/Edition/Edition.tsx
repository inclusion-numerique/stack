'use client'

import classNames from 'classnames'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SessionUser } from '@app/web/auth/sessionUser'
import AddContent from '@app/web/components/Resource/Edition/AddContent'
import ContentListEdition from '@app/web/components/Resource/Edition/ContentListEdition'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import { Resource } from '@app/web/server/resources/getResource'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { trpc } from '@app/web/trpc'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import BaseEdition from './BaseEdition'
import styles from './Edition.module.css'
import EditionActionBar from './EditionActionBar'
import ResourceImageEdition from './ResourceImageEdition'
import TitleEdition from './TitleEdition'

export type SendCommandResult = Awaited<
  ReturnType<ReturnType<typeof trpc.resource.mutate.useMutation>['mutateAsync']>
>
export type SendCommand = (
  command: ResourceMutationCommand,
) => Promise<SendCommandResult>

const Edition = ({
  resource,
  draftResource,
  user,
}: {
  resource: Resource
  draftResource: ResourceProjectionWithContext
  user: SessionUser
}) => {
  const router = useRouter()

  // Content or resource data currently being edited
  // Determines which component is in edition mode, and other component cannot switch to edit mode
  const [editing, setEditing] = useState<string | null>(null)

  // Resource data currently being edited, will update after each edition save
  const [updatedDraftResource, setUpdatedDraftResource] =
    useState<ResourceProjectionWithContext>(draftResource)

  // Mutation used to send commands to change the draft resource (and publish)
  const mutate = trpc.resource.mutate.useMutation()

  const isPublished = !!updatedDraftResource.published

  const hasUnpublishedChanges =
    // Has been updated after published (or created) event
    (updatedDraftResource.published?.getTime() ??
      updatedDraftResource.created.getTime()) !==
    updatedDraftResource.updated.getTime()

  const publishedState: ResourcePublishedState = isPublished
    ? updatedDraftResource.isPublic
      ? ResourcePublishedState.PUBLIC
      : ResourcePublishedState.PRIVATE
    : ResourcePublishedState.DRAFT

  // Current edition state displayed in the action bar
  const editionState: ResourceEditionState =
    editing === null
      ? mutate.isLoading
        ? ResourceEditionState.SAVING
        : ResourceEditionState.SAVED
      : ResourceEditionState.EDITING

  // Do not display state in action bar if no changes have been made
  const actionBarEditionState =
    editionState === ResourceEditionState.SAVED && !hasUnpublishedChanges
      ? null
      : editionState

  // Publish command is only available if publishedResource is older than updatedDraftResource
  const canPublish =
    editionState === ResourceEditionState.SAVED && hasUnpublishedChanges

  const publishButtonLabel = isPublished
    ? 'Publier les modifications'
    : 'Publier la ressource'

  const sendCommand: SendCommand = async (command: ResourceMutationCommand) => {
    const result = await mutate.mutateAsync(command)
    setUpdatedDraftResource(result.resource)

    return result
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onPublish = async () => {
    try {
      // TODO this will first navigate to a "Publication" page for additional input
      const result = await sendCommand({
        name: 'Publish',
        payload: {
          resourceId: resource.id,
          isPublic: true,
        },
      })
      router.push(`/ressources/${result.resource.slug}`)
    } catch (error) {
      console.error('Could not publish resource', error)
      // TODO Have a nice error and handle edge cases server side
      // TODO for example a linked base or file or resource has been deleted since last publication
      throw error
    }
  }

  return (
    <>
      <div className={classNames('fr-container', styles.container)}>
        <BaseEdition
          resource={updatedDraftResource}
          user={user}
          sendCommand={sendCommand}
        />
        <hr className="fr-mt-6v fr-pb-8v fr-mb-0" />
        <div className="fr-mb-8v">
          <ResourceImageEdition
            resource={updatedDraftResource}
            sendCommand={sendCommand}
            editing={editing}
            setEditing={setEditing}
          />
        </div>
        <TitleEdition
          resource={updatedDraftResource}
          sendCommand={sendCommand}
          editing={editing}
          setEditing={setEditing}
        />
        <hr className="fr-mt-4w" />
        <p className={styles.title}>Contenu de la ressource</p>
        <ContentListEdition
          contents={updatedDraftResource.contents}
          resource={draftResource}
          sendCommand={sendCommand}
          editionState={editionState}
          editing={editing}
          setEditing={setEditing}
        />
        <AddContent
          resource={updatedDraftResource}
          sendCommand={sendCommand}
          editing={editing}
          setEditing={setEditing}
        />
      </div>
      <EditionActionBar
        publishedState={publishedState}
        editionState={actionBarEditionState}
        actionDisabled={!canPublish}
        actionLabel={publishButtonLabel}
        unPublishedEdits={isPublished && hasUnpublishedChanges}
        action={onPublish}
      />
    </>
  )
}

export default withTrpc(Edition)
