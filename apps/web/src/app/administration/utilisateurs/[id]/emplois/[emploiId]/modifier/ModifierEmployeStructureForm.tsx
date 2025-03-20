'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import {
  ModifierEmployeStructureData,
  ModifierEmployeStructureValidation,
} from '@app/web/app/employe-structure/ModifierEmployeStructureValidation'
import type { SessionUser } from '@app/web/auth/sessionUser'
import StructureCard, {
  StructureCardStructure,
} from '@app/web/components/structure/StructureCard'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React from 'react'
import { DefaultValues, useForm } from 'react-hook-form'

const DeleteEmployeStructureModal = createModal({
  id: 'delete-employe-structure',
  isOpenedByDefault: false,
})

const ModifierEmployeStructureForm = ({
  user,
  structure,
  defaultValues,
}: {
  user: Pick<SessionUser, 'id' | 'name'>
  structure: StructureCardStructure
  defaultValues: DefaultValues<ModifierEmployeStructureData> & { id: string }
}) => {
  const form = useForm<ModifierEmployeStructureData>({
    resolver: zodResolver(ModifierEmployeStructureValidation),
    defaultValues,
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form

  const mutation = trpc.employeStructure.modifier.useMutation()
  const deleteMutation = trpc.employeStructure.supprimer.useMutation()

  const router = useRouter()

  const onSubmit = async (data: ModifierEmployeStructureData) => {
    try {
      await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message: `La structure employeuse de ${user.name} a bien été modifiée.`,
      })
      router.push(`/administration/utilisateurs/${user.id}/emplois`)
      router.refresh()
    } catch (mutationError) {
      if (applyZodValidationMutationErrorsToForm(mutationError, setError)) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }

  const onDelete = async () => {
    await deleteMutation.mutateAsync({
      id: defaultValues.id,
    })
    createToast({
      priority: 'success',
      message: `La structure employeuse de ${user.name} a bien été supprimée.`,
    })
    router.push(`/administration/utilisateurs/${user.id}/emplois`)
    router.refresh()
  }

  const isLoading =
    isSubmitting ||
    isSubmitSuccessful ||
    deleteMutation.isPending ||
    deleteMutation.isSuccess

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StructureCard className="fr-mt-6v fr-mb-6v" structure={structure} />
      <InputFormField
        control={control}
        path="creation"
        label="Date de début de l’emploi"
        asterisk
        disabled={isLoading}
        type="date"
      />
      <InputFormField
        control={control}
        hint="Renseigner uniquement si c’est une structure employeuse historique qui n’est plus d’actualité"
        path="suppression"
        label="Date de fin de l’emploi"
        disabled={isLoading}
        type="date"
      />

      <div className="fr-btns-group fr-btns-group--icon-left fr-mt-6v">
        <Button
          type="submit"
          priority="primary"
          {...buttonLoadingClassname(isLoading, 'fr-mb-0 ')}
        >
          Enregistrer
        </Button>
        <Button
          priority="tertiary"
          className="fr-mt-4v"
          linkProps={{
            href: `/administration/utilisateurs/${user.id}/emplois`,
          }}
        >
          Annuler
        </Button>
        <Notice
          className="fr-mt-4v fr-mx-2v"
          title={
            <>
              Si cette structure employeuse a été ajoutée par erreur et vous
              souhaitez la supprimer de l’historique des emplois de cet
              utilisateur, vous pouvez la supprimer.
            </>
          }
        />
        <Button
          type="button"
          className="fr-mt-4v fr-btn--danger"
          {...DeleteEmployeStructureModal.buttonProps}
        >
          Supprimer définitivement
        </Button>
      </div>
      <DeleteEmployeStructureModal.Component
        title="Supprimer l’emploi ?"
        buttons={[
          {
            title: 'Annuler',
            priority: 'secondary',
            doClosesModal: true,
            children: 'Annuler',
            type: 'button',
            disabled: isLoading,
          },
          {
            title: 'Supprimer',
            doClosesModal: false,
            className: classNames(
              'fr-btn--danger',
              isLoading && 'fr-btn--loading',
            ),
            children: 'Supprimer',
            type: 'button',
            onClick: onDelete,
          },
        ]}
      >
        <p className="fr-mb-2v">
          Vous allez supprimer cet emploi de l’historique des structures
          employeuses de cet utilisateur. Cette action est irréversible.
        </p>
      </DeleteEmployeStructureModal.Component>
    </form>
  )
}

export default withTrpc(ModifierEmployeStructureForm)
