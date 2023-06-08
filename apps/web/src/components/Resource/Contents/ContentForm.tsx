import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContentType } from '@prisma/client'
import SectionTitleEdition from '@app/web/components/Resource/Contents/SectionTitleEdition'
import type { SendCommand } from '@app/web/components/Resource/Edition/Edition'
import styles from '@app/web/components/Resource/Edition/Edition.module.css'
import { AddContentCommand } from '@app/web/server/resources/feature/AddContent'
import { EditContentCommand } from '@app/web/server/resources/feature/EditContent'
import {
  ContentProjection,
  ResourceProjection,
} from '@app/web/server/resources/feature/createResourceProjection'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { removeNullAndUndefinedValues } from '@app/web/utils/removeNullAndUndefinedValues'
import {
  ContentPayload,
  ContentPayloadCommandValidation,
} from '@app/web/server/resources/feature/Content'
import LinkEdition from './LinkEdition'
import TextEdition from './TextEdition'

const ContentForm = ({
  content,
  setEditing,
  sendCommand,
  resource,
  mode,
  type,
  'data-testid': dataTestId,
}: {
  type: ContentType
  resource: ResourceProjection
  setEditing: Dispatch<SetStateAction<string | null>>
  sendCommand: SendCommand
  'data-testid'?: string
} & (
  | { mode: 'add'; content?: undefined }
  | { mode: 'edit'; content: ContentProjection }
)) => {
  if (mode === 'edit' && !content) {
    throw new Error('Content is required in edit mode')
  }
  const form = useForm<ContentPayload>({
    resolver: zodResolver(ContentPayloadCommandValidation),
    mode: 'onChange',
    defaultValues: {
      type,
      ...(content ? removeNullAndUndefinedValues(content) : null),
    },
  })

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isDirty },
  } = form

  const onSubmit = async (data: ContentPayload) => {
    if (!isDirty) {
      // No change
      setEditing(null)
      return
    }
    try {
      const command =
        mode === 'add'
          ? ({
              name: 'AddContent',
              payload: { resourceId: resource.id, ...data },
            } satisfies AddContentCommand)
          : ({
              name: 'EditContent',
              payload: { resourceId: resource.id, id: content.id, ...data },
            } satisfies EditContentCommand)

      await sendCommand(command)
      setEditing(null)
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, setError)
    }
  }

  const onDelete = async () => {
    if (mode === 'add') {
      setEditing(null)
      return
    }
    try {
      await sendCommand({
        name: 'RemoveContent',
        payload: { resourceId: resource.id, id: content.id },
      })
      setEditing(null)
    } catch (error) {
      console.error(error)
      // TODO handle deletion error (no internet / already deleted)
    }
  }

  let formContent: ReactNode
  switch (type) {
    case 'SectionTitle': {
      formContent = <SectionTitleEdition form={form} />
      break
    }
    case 'Text': {
      formContent = <TextEdition form={form} />
      break
    }
    case 'Link': {
      formContent = <LinkEdition form={form} />
      break
    }
    default: {
      formContent = (
        <Alert
          severity="info"
          title={`Formulaire de contenu ${type} en cours d'implémentation`}
        />
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid={dataTestId}>
      {formContent}
      <div className={styles.contentAction}>
        {mode === 'edit' && (
          <Button
            type="button"
            iconId={'ri-draggable' as never}
            title="Drag"
            priority="tertiary no outline"
            className={styles.dragButton}
          />
        )}
        <Button
          data-testid={dataTestId && `${dataTestId}__submit`}
          priority="tertiary no outline"
          iconId="fr-icon-check-line"
          type="submit"
          size="small"
          disabled={isSubmitting}
        >
          Valider
        </Button>
        <Button
          data-testid={dataTestId && `${dataTestId}__delete`}
          type="button"
          title="Supprimer le contenu"
          priority="tertiary no outline"
          iconId="fr-icon-delete-line"
          size="small"
          onClick={onDelete}
        />
      </div>
    </form>
  )
}

export default ContentForm
