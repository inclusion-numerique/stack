'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'

const PrintButton = () => (
  <Button
    priority="secondary"
    iconId="fr-icon-printer-line"
    onClick={() => window.print()}
  >
    Imprimer
  </Button>
)

export default PrintButton
