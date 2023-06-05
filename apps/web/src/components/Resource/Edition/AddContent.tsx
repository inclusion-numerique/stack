import React, { Dispatch, SetStateAction } from 'react'
import { ContentType } from '@prisma/client'
import ContentForm from '@app/web/components/Resource/Contents/ContentForm'
import AddContentButton from '@app/web/components/Resource/Edition/AddContentButton'
import type { SendCommand } from '@app/web/components/Resource/Edition/Edition'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'

const AddContent = ({
  resource,
  editing,
  setEditing,
  sendCommand,
}: {
  resource: ResourceProjectionWithContext
  editing: string | null
  setEditing: Dispatch<SetStateAction<string | null>>
  sendCommand: SendCommand
}) => {
  const onAdd = (contentType: ContentType) => {
    setEditing(`add-${contentType}`)
  }

  const onDelete = () => {
    setEditing(null)
  }

  const isAddingContentType =
    !!editing && editing.startsWith('add-')
      ? (editing?.split('-')[1] as ContentType)
      : null

  return isAddingContentType ? (
    <ContentForm
      type={isAddingContentType}
      data-testid="add-content_form"
      mode="add"
      resource={resource}
      setEditing={setEditing}
      sendCommand={sendCommand}
      onDelete={onDelete}
    />
  ) : (
    <AddContentButton
      disabled={!!editing && !isAddingContentType}
      onAdd={onAdd}
    />
  )
}

export default AddContent
