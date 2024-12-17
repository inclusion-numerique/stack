'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import React, { useState } from 'react'
import { createToast } from '@app/ui/toast/createToast'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const RotateApiClientSecretForm = ({ clientId }: { clientId: string }) => {
  const mutation = trpc.apiClient.rotateApiClientSecret.useMutation()

  const [secret, setSecret] = useState('')

  const onGenerate = async () => {
    setSecret('')
    try {
      const result = await mutation.mutateAsync({ clientId })
      createToast({
        priority: 'success',
        message: `Un secret unique a bien été généré`,
      })
      setSecret(result.secret)
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la génération, veuillez réessayer ultérieurement.',
      })
    }
  }

  const isLoading = mutation.isPending

  return secret ? (
    <>
      <Notice
        className="fr-notice--warning fr-mb-4v"
        title="Ce secret est unique, vous ne pourrez pas le consulter à nouveau après
        avoir quitté la page."
      />
      <pre className="fr-text--sm fr-p-4v fr-border-radius--8 fr-background-alt--blue-ecume">
        {secret}
      </pre>
      <p className="fr-text---sm fr-mb-4v">
        Vous pouvez maintenant utiliser ce secret pour authentifier les requêtes
        vers l’API avec le header &quot;Authorization&quot;&nbsp;:
      </p>
      <pre className="fr-text--sm fr-p-4v fr-border-radius--8 fr-background-alt--blue-ecume">
        Bearer {clientId}:{secret}
      </pre>
      <Button
        iconId="fr-icon-lock-line"
        onClick={onGenerate}
        {...buttonLoadingClassname(isLoading)}
      >
        Générer un nouveau secret unique
      </Button>
    </>
  ) : (
    <>
      <Notice
        className="fr-notice--new fr-mb-4v"
        title="Générer un secret désactive les secrets précédents."
      />
      <Button
        iconId="fr-icon-refresh-line"
        onClick={onGenerate}
        {...buttonLoadingClassname(isLoading)}
      >
        Générer un client secret
      </Button>
    </>
  )
}

export default withTrpc(RotateApiClientSecretForm)
