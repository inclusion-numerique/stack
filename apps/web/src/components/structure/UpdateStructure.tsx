'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const UpdateStructure = () => {
  const router = useRouter()
  const mutation =
    trpc.conseillersNumerique.mettreAJourStructureEmployeuse.useMutation()

  const updateStructure = async () => {
    await mutation.mutateAsync()
    router.refresh()
  }

  return (
    <Notice
      className="fr-notice--flex fr-align-items-center"
      title={
        <>
          <span className="fr-text--regular fr-text-default--grey fr-text--sm">
            Si cette structure n’est pas votre structure employeuse actuelle,
            cliquez sur le bouton “mettre à jour” pour l’actualiser. Si le
            problème persiste, veuillez contacter le support{' '}
            <Link href="mailto:conseiller-numerique@anct.gouv.fr">
              conseiller-numerique@anct.gouv.fr
            </Link>
          </span>
          <Button
            onClick={updateStructure}
            {...buttonLoadingClassname(mutation.isPending, 'fr-text--nowrap')}
            disabled={mutation.isPending}
            priority="tertiary no outline"
            type="button"
          >
            Mettre à jour
          </Button>
        </>
      }
    />
  )
}

export default withTrpc(UpdateStructure)
