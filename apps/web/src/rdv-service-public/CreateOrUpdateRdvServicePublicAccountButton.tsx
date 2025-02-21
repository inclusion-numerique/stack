'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import type { FrIconClassName } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

/**
 * This creates an account for the user email if it does not exist yet.
 * It sends organization (team) and lieux activités to the rdv service public api so the account is set up correctly.
 * If the account already exists, it just updates the organization and lieux activités.
 */
const CreateOrUpdateRdvServicepublicAccountButton = ({
  className,
  user,
  variant,
}: {
  className?: string
  user: Pick<SessionUser, 'id' | 'rdvAccount'>
  variant?: 'creation' | 'synchronisation'
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const createAccountMutation =
    trpc.rdvServicePublic.createAccount.useMutation()

  const creation = variant
    ? variant === 'creation'
    : user.rdvAccount
      ? 'synchronisation'
      : 'creation'

  const router = useRouter()

  const onClick = async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      await createAccountMutation.mutateAsync({
        userId: user.id,
      })

      createToast({
        priority: 'success',
        message: creation
          ? 'Votre compte à bien été créé sur RDV Service Public. Veuillez finaliser la création de votre compte depuis l’email d’invitation que nous vous avons envoyé.'
          : 'Votre compte à bien été synchronisé RDV Service Public.',
      })
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la création de votre compte, veuillez réessayer ultérieurement.',
      })
    }
    setIsLoading(false)
    router.refresh()
  }

  const title = creation
    ? 'Créer mon compte RDV Service Public'
    : 'Synchroniser mon compte'

  const iconId: FrIconClassName = creation
    ? 'fr-icon-user-add-line'
    : 'fr-icon-refresh-line'

  return (
    <div
      className={classNames(
        'fr-flex fr-direction-column fr-align-items-center fr-width-full',
        className,
      )}
    >
      <Button
        type="button"
        {...buttonLoadingClassname(isLoading, 'fr-mb-4v')}
        onClick={onClick}
        iconId={iconId}
        priority={creation ? 'primary' : 'tertiary'}
      >
        {title}
      </Button>
    </div>
  )
}

export default withTrpc(CreateOrUpdateRdvServicepublicAccountButton)
