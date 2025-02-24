'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'
import React from 'react'

const ValiderInscriptionForm = ({ userId }: { userId: string }) => {
  const mutation = trpc.inscription.validerInscription.useMutation()

  const isLoading = mutation.isPending || mutation.isSuccess

  const router = useRouter()

  const onValiderInscription = async () => {
    try {
      await mutation.mutateAsync({ userId })
      router.push('/en-savoir-plus')
      router.refresh()
      createToast({
        priority: 'success',
        message: 'Votre inscription a bien été validée !',
      })
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }

  return (
    <div className="fr-btns-group">
      <Button
        type="button"
        priority="primary"
        {...buttonLoadingClassname(isLoading, 'fr-mb-0')}
        onClick={onValiderInscription}
      >
        Valider mon inscription
      </Button>
    </div>
  )
}

export default withTrpc(ValiderInscriptionForm)
