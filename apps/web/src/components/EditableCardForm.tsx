'use client'

import React, { ReactNode, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { useRouter } from 'next/navigation'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import EditableCard from './EditableCard'

const EditableCardForm = <T extends FieldValues>({
  id,
  title,
  subtitle,
  preview,
  editing,
  form,
  onSave,
  buttons = [],
}: {
  id: string
  title: ReactNode
  subtitle?: ReactNode
  preview: ReactNode
  editing: ReactNode
  form: UseFormReturn<T>
  onSave: (data: T) => Promise<void>
  buttons?: {
    children: ReactNode
    form?: string
    type?: 'button' | 'submit' | 'reset'
  }[]
}) => {
  const isLoading =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful
  const [isEditMode, setEditMode] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: T) => {
    try {
      await onSave(data)
      setTimeout(() => form.reset(data))
      router.refresh()
      setEditMode(false)
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, form.setError)
    }
  }

  return (
    <EditableCard
      id={id}
      title={title}
      subtitle={subtitle}
      editModeState={[isEditMode, setEditMode]}
      preview={preview}
      editing={
        <form id={`${id}-form`} onSubmit={form.handleSubmit(onSubmit)}>
          {editing}
        </form>
      }
      buttons={[
        {
          children: 'Enregistrer',
          type: 'submit',
          form: `${id}-form`,
          nativeButtonProps: {
            'data-testid': 'editable-card-form-save-button',
          },
          ...buttonLoadingClassname(isLoading),
        },
        ...buttons,
      ]}
    />
  )
}

export default EditableCardForm
