'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import {
  InviterMembreData,
  InviterMembreValidation,
} from '@app/web/equipe/InviterMembreValidation'
import { useMediateursSearch } from '@app/web/hooks/useMediateurSearch'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { FormatOptionLabel } from './FormatOptionLabel'
import { MediateurToAddOption } from './MediateurToAddOption'

const EMAIL_REGEXP =
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/

const toEmail = ({ email }: { email: string }) => email

const isEmail = (email: string) => EMAIL_REGEXP.test(email)

const alreadyAddedIn = (fields: { email: string }[]) => (email: string) =>
  fields.map(toEmail).includes(email)

const emailNotIn =
  (fields: { email: string }[]) =>
  ({ data }: { data: MediateurToAddOption }) =>
    data.value != null &&
    isEmail(data.value.email) &&
    !alreadyAddedIn(fields)(data.value.email)

const InviterMembreForm = () => {
  const { loadOptions } = useMediateursSearch({
    initialMediateursOptions: [],
    allowTextValue: true,
  })

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const form = useForm<InviterMembreData>({
    resolver: zodResolver(InviterMembreValidation),
    defaultValues: { members: [] },
  })

  const mutation = trpc.mediateur.invite.useMutation()

  const router = useRouter()

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: 'members',
  })

  const onSubmit = async (data: InviterMembreData) => {
    try {
      await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message:
          data.members.length > 1
            ? 'Un email d’invitation a été envoyé aux membres que vous souhaitez ajouter à votre équipe'
            : `Un email d’invitation a été envoyé à ${data.members[0].nom ?? data.members[0].email}`,
      })
      router.push('/coop/mon-equipe')
      router.refresh()
    } catch (mutationError) {
      if (
        applyZodValidationMutationErrorsToForm(mutationError, form.setError)
      ) {
        return
      }
      if (
        mutationError instanceof Error &&
        mutationError.message === 'No new invitations to send'
      ) {
        createToast({
          priority: 'error',
          message: `Aucune invitation à envoyer pour ${data.members.length > 1 ? 'ces membres' : 'ce membre'}`,
        })
        return
      }

      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’invitation, veuillez réessayer ultérieurement.',
      })

      throw mutationError
    }
  }

  const onSelectMediateurAInviter = (option: MediateurToAddOption | null) => {
    if (option?.value?.email == null) return

    append([
      ...fields,
      {
        email: option.value.email,
        nom: option.value.mediateurId ? option?.label : undefined,
        mediateurId: option.value.mediateurId,
      },
    ])
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CustomSelectFormField
        label={
          <span className="fr-display-block fr-mt-12v fr-mb-4v">
            Rechercher par nom ou adresse e-mail
          </span>
        }
        path="members"
        control={form.control}
        placeholder="Nom ou adresse e-mail"
        className="fr-mb-2v fr-mt-3v"
        loadOptions={loadOptions}
        filterOption={emailNotIn(fields)}
        onChange={onSelectMediateurAInviter}
        clearInputOnChange
        getOptionLabel={FormatOptionLabel}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />
      {fields.length > 0 && (
        <ul className="fr-list-group fr-flex fr-flex-wrap fr-flex-gap-1v fr-mt-6v">
          {fields.map((mediateurToAdd, index) => (
            <li key={mediateurToAdd.email}>
              <Tag
                nativeButtonProps={{
                  type: 'button',
                  onClick: () => remove(index),
                }}
              >
                {mediateurToAdd.nom ?? mediateurToAdd.email}&nbsp;
                <span className="fr-icon-close-line fr-icon--sm" />
              </Tag>
            </li>
          ))}
        </ul>
      )}
      <hr className="fr-separator-12v" />
      <ButtonsGroup
        buttonsSize="large"
        buttons={[
          {
            children: 'Inviter',
            type: 'submit',
            disabled: fields.length === 0 || mutation.isPending || isMenuOpen,
            ...buttonLoadingClassname(mutation.isPending),
          },
          {
            children: 'Annuler',
            priority: 'secondary',
            linkProps: { href: '/coop/mon-equipe' },
          },
        ]}
      />
    </form>
  )
}

export default withTrpc(InviterMembreForm)
