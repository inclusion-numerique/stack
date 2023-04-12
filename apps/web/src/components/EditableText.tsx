'use client'

import { useState } from 'react'
import { InputFormField } from '@stack/web/form/InputFormField'
import { useForm } from 'react-hook-form'

export const EditableText = () => {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<{ content: string }>()


  if (isEditing) {
    return <InputFormField
      onBlur={() => {
        setIsEditing(false)
      }}
      onKeypress={(event) => {
        if (event.key === 'Enter') {
          setIsEditing(false)
        }
      }}
      control={form.control}
      path='content' />
  }

  return <p style={{ cursor: 'pointer' }} onClick={() => {
    setIsEditing(true)
  }
  }>{form.getValues().content || 'Ajouter un texte'}</p>


}
