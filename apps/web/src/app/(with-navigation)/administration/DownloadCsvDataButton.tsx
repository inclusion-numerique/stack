'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { download } from '@app/web/utils/download'

const DownloadCsvDataButton = ({
  csvData,
  csvFilename,
}: {
  csvData: string
  csvFilename: string
}) => {
  const onClick = () => {
    const blob = new Blob([csvData], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    download(url, `${csvFilename}.csv`)
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
