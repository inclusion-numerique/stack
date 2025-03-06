'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { Input } from '@codegouvfr/react-dsfr/Input'
import { useState } from 'react'
import * as Sentry from '@sentry/nextjs'

const DatePickerDownload = () => {
  const [date, setDate] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    const url = `/api/ppg/accompagnements-departements.csv${date ? `?date=${date}` : ''}`

    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Download failed')

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = date ? `accompagnements-${date}.csv` : 'accompagnements.csv'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)
      a.remove()
    } catch (error) {
      Sentry.captureException(error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
      <div className="fr-input-group">
        <Input
          label="Date des accompagnements"
          nativeInputProps={{
            type: 'date',
            value: date,
            onChange: (e) => setDate(e.target.value),
          }}
        />
      </div>

      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        iconId={
          isDownloading ? 'fr-icon-refresh-line' : 'fr-icon-download-line'
        }
        title="Télécharger la liste des accompagnements par département"
        priority="secondary"
        className={isDownloading ? 'fr-btn--loading' : ''}
      >
        {isDownloading
          ? 'Téléchargement en cours...'
          : 'Télécharger la liste des accompagnements par département'}
      </Button>
    </>
  )
}

export default DatePickerDownload
