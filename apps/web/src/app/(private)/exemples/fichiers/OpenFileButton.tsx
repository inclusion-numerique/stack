'use client'

import { PropsWithChildren } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useFileOpen } from '@app/web/hooks/useFileOpen'

const OpenFileButton = ({
  children,
  fileKey,
  className,
}: PropsWithChildren<{
  className?: string
  fileKey: string
}>) => {
  const fileOpen = useFileOpen()

  const onClick = () => {
    fileOpen.open(fileKey).catch((error) => {
      console.error('Error opening file', error)
    })
  }

  return (
    <Button
      size="small"
      type="button"
      iconId="fr-icon-eye-line"
      priority="secondary"
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default withTrpc(OpenFileButton)
