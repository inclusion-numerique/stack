import React, { PropsWithChildren } from 'react'

const InscriptionStepsLayout = ({ children }: PropsWithChildren) => (
  <main className="fr-layout__main fr-background-alt--blue-france">
    <div className="fr-container fr-container--narrow">{children}</div>
  </main>
)

export default InscriptionStepsLayout
