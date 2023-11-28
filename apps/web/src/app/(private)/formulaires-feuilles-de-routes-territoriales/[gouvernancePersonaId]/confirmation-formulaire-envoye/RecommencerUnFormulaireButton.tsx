'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'

const RecommencerUnFormulaireButton = ({
  formulaireGouvernanceId,
}: {
  formulaireGouvernanceId: string
}) => {
  const mutation = trpc.formulaireGouvernance.recommencer.useMutation({
    onError: () => {
      // TODO Error toast
    },
  })

  const router = useRouter()

  const onClick = async () => {
    const { etapeInfo } = await mutation.mutateAsync({
      formulaireGouvernanceId,
    })
    router.refresh()
    router.push(etapeInfo.absolutePath)
  }

  const isLoading = mutation.isPending || mutation.isSuccess

  return (
    <Button
      priority="secondary"
      className={classNames('fr-mt-6v fr-mb-0', isLoading && 'fr-btn--loading')}
      data-testid="recommencer-un-formulaire-button"
      onClick={onClick}
    >
      Renseigner un nouveau formulaire
    </Button>
  )
}

export default withTrpc(RecommencerUnFormulaireButton)
