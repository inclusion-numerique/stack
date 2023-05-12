'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResourceBaseRichRadio from '@app/web/components/Resource/ResourceBaseRichRadio'
import { Resource } from '@app/web/server/resources'
import {
  EditResourceBase,
  editResourceBaseValidation,
} from '@app/web/server/rpc/resource/editResource'
import PublishedInInformation from '../PublishedInInformation'
import EditableContent from './EditableContent'

const { BaseModal, openBaseModal } = createModal({
  name: 'base',
  isOpenedByDefault: false,
})

const BaseEdition = ({
  resource,
  user,
  updateResource,
}: {
  resource: Resource
  user: SessionUser
  updateResource: (data: EditResourceBase) => Promise<void>
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EditResourceBase>({
    resolver: zodResolver(editResourceBaseValidation),
    defaultValues: {
      id: resource.id,
      baseId: resource.base?.id ?? null,
    },
  })
  const disabled = isSubmitting

  return (
    <EditableContent
      showIcon
      onEditClick={openBaseModal}
      data-testid="edit-base-button"
    >
      <PublishedInInformation resource={resource} />
      <form onSubmit={handleSubmit(updateResource)}>
        <BaseModal
          title="Où souhaitez-vous ajouter cette ressource ?"
          buttons={[
            {
              title: 'Annuler',
              priority: 'secondary',
              doClosesModal: true,
              children: 'Annuler',
              type: 'button',
              disabled,
            },
            {
              title: 'Valider',
              doClosesModal: true,
              children: 'Valider',
              type: 'submit',
              disabled,
            },
          ]}
        >
          <ResourceBaseRichRadio
            control={control}
            path="baseId"
            user={user}
            disabled={isSubmitting}
          />
        </BaseModal>
      </form>
    </EditableContent>
  )
}

export default BaseEdition