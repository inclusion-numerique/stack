import { isBrowser } from '@app/web/utils/isBrowser'
import 'client-only'
import { useEffect } from 'react'
import { FieldValues } from 'react-hook-form'
import { FormState } from 'react-hook-form/dist/types/form'

export const usePreventUnsavedChanges = <T extends FieldValues>({
  formState: { isDirty },
}: {
  formState: FormState<T>
}) => {
  useEffect(() => {
    if (isBrowser) {
      return
    }
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = 'Your unsaved changes will be lost'
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty])
}
