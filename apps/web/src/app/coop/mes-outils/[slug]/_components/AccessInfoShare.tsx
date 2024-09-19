'use client'

import { ReactNode, useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { OutilPageData } from '../../outilPageData'

export const AccessInfoShare = ({
  how,
  info,
}: Pick<NonNullable<OutilPageData['access']>, 'info'> & { how: ReactNode }) => {
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    navigator.clipboard.writeText(info.link).catch()
  }

  return (
    <div className="fr-text--center">
      <p className="fr-mt-1w">{how}</p>
      <div className="fr-position-relative">
        {copied && (
          <span className="copied">Lien copié dans le presse-papier</span>
        )}
        <Button
          title={`Copier le lien ${info.link} dans le presse-papier`}
          iconId="fr-icon-link"
          iconPosition="right"
          size="large"
          className="fr-btn--responsive fr-mb-4w"
          priority="tertiary"
          onClick={onCopy}
        >
          {info.label}
        </Button>
      </div>
    </div>
  )
}
