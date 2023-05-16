import React, { Dispatch, SetStateAction, useState } from 'react'
import ContentForm from '@app/web/components/Resource/Contents/ContentForm'
import AddContentButton from '@app/web/components/Resource/Edition/AddContentButton'
import { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import { ContentType } from '@prisma/client'

const AddContent = ({
  resource,
  editing,
  setEditing,
  sendCommand,
}: {
  resource: ResourceProjection
  editing: string | null
  setEditing: Dispatch<SetStateAction<string | null>>
  sendCommand: (command: ResourceMutationCommand) => Promise<void>
}) => {
  const [adding, setAdding] = useState<ContentType | null>(null)

  const onAdd = (contentType: ContentType) => {
    setEditing('add')
    setAdding(contentType)
  }

  return adding ? (
    <ContentForm
      type={adding}
      mode="add"
      resource={resource}
      setEditing={setEditing}
      sendCommand={sendCommand}
    />
  ) : (
    <AddContentButton disabled={!!editing && editing !== 'add'} onAdd={onAdd} />
  )
}

export default AddContent
