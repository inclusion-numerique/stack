'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useRdvOauthStatus } from '@app/web/hooks/useRdvOauthStatus'
import { hasFeatureFlag } from '@app/web/security/hasFeatureFlag'
import { trpc } from '@app/web/trpc'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Button from '@codegouvfr/react-dsfr/Button'

const PrendreRendezVousAvecBeneficiaireButton = ({
  beneficiaire,
  user,
  returnPath,
}: {
  beneficiaire: { id: string }
  user: SessionUser
  returnPath: string // path on the app (e.g. /beneficiaires/12)
}) => {
  // const router = useRouter()

  const mutation = trpc.rdvServicePublic.oAuthApiCreateRdvPlan.useMutation()

  const oauthStatus = useRdvOauthStatus({ user })

  if (!hasFeatureFlag(user, 'RdvServicePublic')) {
    return null
  }

  const onClick = async () => {
    if (!oauthStatus.isSuccess) {
      return
    }

    try {
      const result = await mutation.mutateAsync({
        beneficiaireId: beneficiaire.id,
        returnUrl: getServerUrl(returnPath, { absolutePath: true }),
      })

      console.log('TRPC RESULT', result)

      // TODO push when return URL works (CF rdvRouter)
      // router.push(result.rdv_plan.url)
      window.open(result.rdv_plan.url, '_blank')
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors de la création du RDV',
      })
    }
  }

  const isLoading = oauthStatus.isLoading || mutation.isPending

  return (
    <Button
      disabled={oauthStatus.isEmpty || oauthStatus.isError}
      priority="secondary"
      iconId="fr-icon-calendar-line"
      {...buttonLoadingClassname(isLoading)}
      onClick={onClick}
      type="button"
    >
      Planifier un rendez-vous
    </Button>
  )
}

export default withTrpc(PrendreRendezVousAvecBeneficiaireButton)
