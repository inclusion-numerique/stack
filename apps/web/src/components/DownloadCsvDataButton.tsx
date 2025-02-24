'use client'

import { download } from '@app/web/utils/download'
import Button from '@codegouvfr/react-dsfr/Button'

const DownloadCsvDataButton = ({
  csvData,
  csvFilename,
}: {
  csvData: string
  csvFilename: string
}) => {
  const onClick = () => {
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvData], { type: 'text/csv;charset=utf-8;' })
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
