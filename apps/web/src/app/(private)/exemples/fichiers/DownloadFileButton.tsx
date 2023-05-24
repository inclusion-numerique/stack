'use client'

import { PropsWithChildren } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useFileDownload } from '@app/web/hooks/useFileDownload'

const DownloadFileButton = ({
  children,
  fileKey,
  filename,
  className,
}: PropsWithChildren<{
  className?: string
  fileKey: string
  filename: string
}>) => {
  const fileDownload = useFileDownload()

  const onClick = () => {
    fileDownload.download(fileKey, filename).catch((error) => {
      console.error('Error downloading file', error)
    })
  }

  return (
    <Button
      size="small"
      type="button"
      iconId="fr-icon-download-line"
      priority="secondary"
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default withTrpc(DownloadFileButton)
