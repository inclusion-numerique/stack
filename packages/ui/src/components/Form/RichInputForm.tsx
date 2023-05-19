import React from 'react'
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import Link from '@tiptap/extension-link'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from './RichInputForm.module.css'
import RichInputFormMenuBar from './RichInputFormMenuBar'

const RichInputForm = <T extends FieldValues>({
  form,
  path,
  id,
  ariaDescribedBy,
  placeholder,
  disabled,
  'data-testid': dataTestId,
  onChange,
}: {
  form: UseFormReturn<T>
  path: FieldPath<T>
  id: string
  ariaDescribedBy?: string
  placeholder?: string
  disabled?: boolean
  ['data-testid']?: string
  onChange: (text: string) => void
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: form.getValues(path),
    onUpdate: (event) => {
      onChange(event.editor.getHTML())
    },
  })

  return editor ? (
    <>
      <RichInputFormMenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className={styles.input}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        data-testid={dataTestId}
      />
    </>
  ) : null
}

export default RichInputForm
