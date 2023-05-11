'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { Resource } from '@app/web/server/resources'
import {
  EditResourceContent,
  editResourceContentValidation,
} from '@app/web/server/rpc/resource/editContent'
import {
  EditResourceBase,
  EditResourceTitle,
} from '@app/web/server/rpc/resource/editResource'
import { resourceEditionValues } from '@app/web/server/rpc/resource/utils'
import { trpc } from '@app/web/trpc'
import { getEditContent } from '../Contents/EditionContents'
import { getContent } from '../Contents/ViewContents'
import { ResourceModificationState } from '../enums/ResourceModificationState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import AddContentButton from './AddContentButton'
import BaseEdition from './BaseEdition'
import EditableImage from './EditableImage'
import styles from './Edition.module.css'
import EditionActionBar from './EditionActionBar'
import TitleEdition from './TitleEdition'

const hasChanged = (resource: Resource, updatedResource: Resource) =>
  Object.keys(resourceEditionValues).some(
    (key) =>
      resource[key as keyof Resource] !==
      updatedResource[key as keyof Resource],
  )

const publishedState = (canPublished: boolean, resource: Resource) => {
  if (canPublished) {
    return ResourcePublishedState.DRAFT
  }

  return resource.isPublic
    ? ResourcePublishedState.PUBLIC
    : ResourcePublishedState.PRIVATE
}

const Edition = ({
  resource,
  user,
}: {
  resource: Resource
  user: SessionUser
}) => {
  const [modificationState, setModificationState] =
    useState<ResourceModificationState | null>(null)
  const [modifyingIndex, setModifyingIndex] = useState<number | null>(null)

  const [updatedResource, setUpdatedResource] = useState<Resource>(resource)
  const [publishedResource, setPublishedResource] = useState<Resource>(resource)

  const canPublished = hasChanged(publishedResource, updatedResource)

  const updateTitleMutation = trpc.resource.editTitle.useMutation()
  const updateBaseMutation = trpc.resource.editBase.useMutation()

  const updateTitleResource = async (data: EditResourceTitle) => {
    setModificationState(ResourceModificationState.SAVING)
    const result = await updateTitleMutation.mutateAsync(data)
    setUpdatedResource(result)
    setModificationState(ResourceModificationState.SAVED)
  }

  const updateBaseResource = async (data: EditResourceBase) => {
    setModificationState(ResourceModificationState.SAVING)
    const result = await updateBaseMutation.mutateAsync(data)
    setUpdatedResource(result)
    setModificationState(ResourceModificationState.SAVED)
  }

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<EditResourceContent>({
    resolver: zodResolver(editResourceContentValidation),
    mode: 'onChange',
  })

  const onSubmit = (data: EditResourceContent) => {
    console.log(data)
  }

  return (
    <>
      <div className="fr-container fr-pb-30v">
        <BaseEdition
          resource={updatedResource}
          user={user}
          updateResource={updateBaseResource}
        />
        <hr className="fr-my-4w" />
        <div className="fr-mb-5w">
          <EditableImage />
        </div>
        <TitleEdition
          resource={updatedResource}
          updateResource={updateTitleResource}
          setModificationState={setModificationState}
        />
        <hr className="fr-mt-4w" />
        <div className={styles.title}>Contenu de la ressource</div>
        <hr className="fr-mt-4w fr-mb-2w" />
        {updatedResource.contents.map((content, index) => (
          <div
            key={content.id}
            id={`section-${index + 1}`}
            className={styles.content}
          >
            {modifyingIndex === index ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                {getEditContent(content, control)}
                <div className={styles.contentAction}>
                  <Button
                    iconId="ri-draggable"
                    title="Drag"
                    priority="tertiary no outline"
                    className={styles.dragButton}
                  />
                  <Button
                    priority="tertiary no outline"
                    iconId="fr-icon-edit-line"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Valider
                  </Button>
                  <Button
                    title="Supprimer le contenu"
                    priority="tertiary no outline"
                    iconId="fr-icon-delete-line"
                    size="small"
                  />
                </div>
              </form>
            ) : (
              <>
                {getContent(content)}
                <div className={styles.contentHoverableAction}>
                  <Button
                    iconId="ri-draggable"
                    title="Drag"
                    priority="tertiary no outline"
                    className={styles.dragButton}
                  />
                  <Button
                    priority="tertiary no outline"
                    iconId="fr-icon-edit-line"
                    onClick={() => {
                      setModificationState(ResourceModificationState.MODIFIED)
                      setModifyingIndex(index)
                      reset(content)
                    }}
                  >
                    Modifier
                  </Button>
                  <Button
                    title="Supprimer le contenu"
                    priority="tertiary no outline"
                    iconId="fr-icon-delete-line"
                    size="small"
                  />
                </div>
              </>
            )}
            <hr className="fr-mt-5w fr-mb-2w" />
          </div>
        ))}
        <AddContentButton />
      </div>
      <EditionActionBar
        publishedState={publishedState(canPublished, resource)}
        modificationState={
          modificationState === ResourceModificationState.SAVED && !canPublished
            ? null
            : modificationState
        }
        actionDisabled={!canPublished}
        actionLabel="Publier la ressource"
        action={() => {
          setModificationState(null)
          setPublishedResource(updatedResource)
        }}
      />
    </>
  )
}

export default withTrpc(Edition)
