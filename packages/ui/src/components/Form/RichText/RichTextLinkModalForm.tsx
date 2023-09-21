'use client'

import React, {
  FormEventHandler,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
} from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import z from 'zod'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactDOM from 'react-dom'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import InputFormField from '@app/ui/components/Form/InputFormField'

// React-dom types are broken at the moment !
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
const { createPortal } = ReactDOM as {
  createPortal: (
    children: ReactNode,
    container: Element | DocumentFragment,
    key?: null | string,
  ) => ReactPortal
}

export const RichTextLinkModal = createModal({
  id: 'rich-input-form-link-config',
  isOpenedByDefault: false,
})

const RichTextLinkValidation = z.object({
  url: z
    .string({ required_error: 'Veuillez renseigner le lien' })
    .url({ message: 'Veuillez renseigner un lien valide' }),
})
export type RichTextLink = z.infer<typeof RichTextLinkValidation>

const RichTextLinkModalForm = ({
  onSubmit: onSubmitProperty,
  onCancel: onCancelProperty,
  url,
}: {
  onSubmit: (data: RichTextLink) => void
  onCancel?: () => void
  url?: string
}) => {
  const { title, cancelLabel, confirmLabel } = url
    ? {
        title: 'Modifier le lien',
        cancelLabel: 'Supprimer le lien',
        confirmLabel: 'Modifier',
      }
    : {
        title: 'Ajouter un lien',
        cancelLabel: 'Annuler',
        confirmLabel: 'Ajouter',
      }

  // Forward ref do not work with modal, we have to make a workaround with form ref
  const formRef = useRef<HTMLFormElement>(null)
  const modalRef = useRef<HTMLDialogElement>()
  if (!modalRef.current) {
    // Will only execute while first form element render is done
    modalRef.current = formRef.current?.querySelector('dialog') ?? undefined
  }
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RichTextLink>({
    resolver: zodResolver(RichTextLinkValidation),
    defaultValues: {
      url,
    },
  })

  useModalVisibility(modalRef.current, {
    onClosed: () => {
      reset({ url: undefined })
    },
  })

  const onSubmitHandler: FormEventHandler = (event) => {
    event.stopPropagation()
    handleSubmit((data: RichTextLink) => {
      if (isSubmitting) {
        return
      }
      onSubmitProperty(data)
    })(event)
  }

  useEffect(() => {
    reset({ url })
  }, [reset, url])

  const disabled = isSubmitting

  return createPortal(
    <form ref={formRef} onSubmit={onSubmitHandler}>
      <RichTextLinkModal.Component
        title={title}
        buttons={[
          {
            title: cancelLabel,
            priority: 'secondary',
            doClosesModal: true,
            children: cancelLabel,
            type: 'button',
            onClick: onCancelProperty,
            disabled,
          },
          {
            type: 'submit',
            priority: 'primary',
            title: confirmLabel,
            doClosesModal: false,
            children: confirmLabel,
            disabled,
          },
        ]}
      >
        <InputFormField
          control={control}
          path="url"
          label="Copier le lien ici"
          placeholder="https://"
          disabled={disabled}
        />
      </RichTextLinkModal.Component>
    </form>,
    document.body,
  )
}

export default RichTextLinkModalForm
