import React, { PropsWithChildren, ReactNode } from 'react'
import WhiteCard from '@app/web/ui/WhiteCard'

const GouvernanceFormSectionCard = ({
  title,
  info,
  details,
  id,
  children,
}: PropsWithChildren<{
  id: string
  title: string
  info?: ReactNode
  details?: ReactNode
}>) => (
  // Padding is used for anchor navigation offset
  <section id={id} className="fr-pt-6v">
    <WhiteCard>
      <h5 className="fr-mb-2v">{title}</h5>
      {info && <p className="fr-mt-2v">{info}</p>}
      {details && <p className="fr-mt-4v">{details}</p>}
      <hr className="fr-separator-8v" />
      {children}
    </WhiteCard>
  </section>
)

export default GouvernanceFormSectionCard
