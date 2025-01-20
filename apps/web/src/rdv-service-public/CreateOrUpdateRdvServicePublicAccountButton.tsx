'use client'

import React, { useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import classNames from 'classnames'
import { createToast } from '@app/ui/toast/createToast'
import { SessionUser } from '@app/web/auth/sessionUser'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { FrIconClassName } from '@codegouvfr/react-dsfr'

/**
 * This creates an account for the user email if it does not exist yet.
 * It sends organization (team) and lieux activités to the rdv service public api so the account is set up correctly.
 * If the account already exists, it just updates the organization and lieux activités.
 */
const CreateOrUpdateRdvServicepublicAccountButton = ({
  className,
  user,
}: {
  className?: string
  user: Pick<SessionUser, 'id' | 'rdvAccount'>
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const createAccountMutation =
    trpc.rdvServicePublic.createAccount.useMutation()

  const onClick = async () => {
    if (isLoading) return
    setIsLoading(true)

    console.log('CREATE ACCOUNT')
    try {
      const createAccountResult = await createAccountMutation.mutateAsync({
        userId: user.id,
      })
      console.log('CREATE ACCOUNT RESULT', createAccountResult)

      createToast({
        priority: 'success',
        message: 'Votre compte à bien été mis à jour sur RDV Aide Numérique.',
      })
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la création de votre compte, veuillez réessayer ultérieurement.',
      })
    }
    setIsLoading(false)
  }

  const title = user.rdvAccount
    ? 'Mettre à jour mon compte RDV Aide Numérique'
    : 'Créer mon compte RDV Aide Numérique'
  
  const iconId: FrIconClassName = user.rdvAccount
    ? 'fr-icon-refresh-line'
    : 'fr-icon-user-add-line'

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
      >
        {title}
      </Button>
    </div>
  )
}

export default withTrpc(CreateOrUpdateRdvServicepublicAccountButton)
