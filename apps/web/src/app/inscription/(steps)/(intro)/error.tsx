'use client'

import React from 'react'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'

const InscriptionError = () => (
  <InscriptionCard
    title="Finaliser votre inscription pour accéder à votre espace."
    titleClassName="fr-text-title--blue-france"
  >
    <p className="fr-error-text">
      Une erreur est survenue lors de la vérification de votre compte. Merci de
      réessayer ultérieurement ou de contacter le support.
    </p>
  </InscriptionCard>
)

export default InscriptionError
