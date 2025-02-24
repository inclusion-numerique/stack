'use client'

import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/navigation'

const CompleteOnboardingButton = ({
  className,
  next,
}: {
  className?: string
  next: { href: string; label?: string }
}) => {
  const router = useRouter()
  const mutation = trpc.user.markOnboardingAsSeen.useMutation()

  const onClick = async () => {
    try {
      await mutation.mutateAsync()
    } catch (error) {
      Sentry.captureException(error)
    }
    router.push(next.href)
    router.refresh()
  }

  return (
    <Button
      onClick={onClick}
      {...buttonLoadingClassname(!mutation.isIdle, className)}
    >
      {next.label ?? 'J’ai compris'}
    </Button>
  )
}

export default withTrpc(CompleteOnboardingButton)
