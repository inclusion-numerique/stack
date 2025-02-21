import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { Spinner } from '@app/web/ui/Spinner'
import React from 'react'

const InscriptionLoading = () => (
  <InscriptionCard
    title="Finaliser votre inscription pour accéder à votre espace."
    titleClassName="fr-text-title--blue-france"
  >
    <div className="fr-width-full fr-flex fr-justify-content-center fr-align-items-center fr-py-12v">
      <Spinner />
    </div>
  </InscriptionCard>
)

export default InscriptionLoading
