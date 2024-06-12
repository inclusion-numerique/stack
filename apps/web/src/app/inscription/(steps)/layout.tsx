import React, { PropsWithChildren } from 'react'

const InscriptionStepsLayout = ({ children }: PropsWithChildren) => (
  <div style={{ flex: 1, backgroundColor: 'var(--blue-france-975-75)' }}>
    <div className="fr-container fr-container--narrow">{children}</div>
  </div>
)

export default InscriptionStepsLayout
