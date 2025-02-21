'use client'

import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import Card from './Card'

const EditCard = <T extends FieldValues, V>({
  id,
  className,
  noBorder,
  contentSeparator = true,
  title,
  titleAs: CardTitle = 'h3',
  description,
  edition,
  view,
  emptyState,
  canEdit = true,
  isEmpty = false,
  form,
  mutation,
  noRefresh,
}: {
  id?: string
  className?: string
  noBorder?: boolean
  contentSeparator?: boolean
  title: ReactNode
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  description?: string
  edition: ReactNode
  view: ReactNode
  canEdit?: boolean
  isEmpty?: boolean
  emptyState?: ReactNode
  form: UseFormReturn<T>
  mutation: (data: T) => Promise<V>
  noRefresh?: boolean
}) => {
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)

  const onSubmit = async (data: T) => {
    try {
      await mutation(data)
      setEditMode(false)
      if (!noRefresh) {
        router.refresh()
      }
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, form.setError)
    }
  }

  return (
    <Card
      noBorder={noBorder}
      contentSeparator={contentSeparator}
      id={id}
      className={className}
      title={
        <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
          <CardTitle className="fr-mb-0 fr-py-1v fr-h5">{title}</CardTitle>
          {!editMode && canEdit && (
            <Button
              data-testid="edit-card-button"
              size="small"
              priority="tertiary no outline"
              iconId="fr-icon-edit-line"
              title={isEmpty ? 'Compléter' : 'Modifier'}
              onClick={() => setEditMode(true)}
            >
              {isEmpty ? 'Compléter' : 'Modifier'}
            </Button>
          )}
        </div>
      }
      description={description}
      titleAs="div"
    >
      {editMode && (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {edition}
          <ButtonsGroup
            inlineLayoutWhen="always"
            alignment="right"
            buttons={[
              {
                children: 'Annuler',
                priority: 'secondary',
                onClick: () => setEditMode(false),
                disabled: form.formState.isSubmitting,
              },
              {
                children: 'Enregistrer',
                type: 'submit',
                disabled: form.formState.isSubmitting,
                nativeButtonProps: {
                  'data-testid': 'edit-card-save-button',
                },
              },
            ]}
          />
        </form>
      )}
      {!editMode && (isEmpty ? emptyState : view)}
    </Card>
  )
}

export default EditCard
