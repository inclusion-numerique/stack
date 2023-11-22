'use client'

import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { modifierBesoinsIngenieriePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'

const CreateBesoinsEnIngenierieFinanciereButton = ({
  gouvernanceId,
  codeDepartement,
  className,
}: {
  gouvernanceId: string
  codeDepartement: string
  className?: string
}) => {
  const mutation = trpc.besoinsIngenierieFinanciere.create.useMutation()

  const router = useRouter()

  const onClick = async () => {
    await mutation.mutateAsync({
      gouvernanceId,
    })

    router.push(
      modifierBesoinsIngenieriePath(
        { codeDepartement },
        { gouvernanceId, step: 'selection' },
      ),
    )

    router.refresh()
  }

  return (
    <Button
      type="button"
      onClick={onClick}
      iconPosition="right"
      iconId="fr-icon-arrow-right-line"
      className={classNames(
        mutation.isPending || mutation.isSuccess ? 'fr-btn--loading' : '',
        className,
      )}
    >
      Renseigner les besoins de ma gouvernance
    </Button>
  )
}

export default withTrpc(CreateBesoinsEnIngenierieFinanciereButton)
