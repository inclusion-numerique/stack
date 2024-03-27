'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { download } from '@app/web/utils/download'

const DownloadCsvDataButton = ({
  data,
  title,
}: {
  data: string
  title: string
}) => {
  const onClick = () => {
    const blob = new Blob([data], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    download(url, `${title}.csv`)
  }

  return (
    <Button
      onClick={onClick}
      size="small"
      type="button"
      iconId="fr-icon-download-line"
      priority="tertiary"
    >
      Télécharger en .csv
    </Button>
  )
}

export default DownloadCsvDataButton
