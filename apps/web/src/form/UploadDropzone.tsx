'use client'

/* eslint react/jsx-props-no-spreading: 0 */

import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import { ChangeEventHandler } from 'react'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

export const DropzoneField = <T extends FieldValues>({
  path,
  control,
  multiple,
  onDrop,
}: {
  control: Control<T>
  path: FieldPath<T>
  disabled?: boolean
  multiple?: boolean
  onDrop: OnDropCallback
}) => {
  const id = `upload-form-field__${path}`

  return (
    <Controller
      name={path}
      control={control}
      render={({ field: { onChange } }) => (
        <Dropzone
          multiple={multiple}
          onDrop={onDrop}
          onChange={(e) =>
            onChange(
              multiple
                ? e.target.files
                : e.target.files
                ? e.target.files[0]
                : null,
            )
          }
        />
      )}
    />
  )
}
export type OnDropCallback = <T extends File>(
  acceptedFiles: T[],
  fileRejections: FileRejection[],
  event: DropEvent,
) => void

const Dropzone = ({
  multiple,
  onChange,
  onDrop,
  ...rest
}: {
  multiple?: boolean
  onDrop: OnDropCallback
  onChange: ChangeEventHandler<HTMLInputElement>
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    onDrop,
    ...rest,
  })

  return (
    <div {...getRootProps()}>
      Yo Yo Yo
      <input {...getInputProps({ onChange })} />
    </div>
  )
}
