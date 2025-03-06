'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { Input } from '@codegouvfr/react-dsfr/Input'
import { useState } from 'react'
import { download } from '@app/web/utils/download'
import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'

const DatePickerDownload = () => {
  const [date, setDate] = useState('')

  const handleDownload = async () => {
    const url = `/api/ppg/accompagnements-departements.csv${date ? `?date=${date}` : ''}`
    download(url, date ? `accompagnements-${date}.csv` : 'accompagnements.csv')
    createToast({
      priority: 'success',
      message: 'Le téléchargement des accompagnements est en cours.',
    })
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
        iconId={'fr-icon-download-line'}
        title="Télécharger la liste des accompagnements par département"
        priority="secondary"
      >
        Télécharger la liste des accompagnements par département
      </Button>
    </>
  )
}

export default DatePickerDownload
