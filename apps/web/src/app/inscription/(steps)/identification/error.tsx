'use client'

import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import React from 'react'

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
