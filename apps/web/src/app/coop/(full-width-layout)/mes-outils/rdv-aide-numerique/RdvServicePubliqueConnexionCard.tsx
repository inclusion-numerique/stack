import React, { PropsWithChildren } from 'react'

const RdvServicePubliqueConnexionCard = ({
  children,
  title,
}: PropsWithChildren<{
  title: string
}>) => (
  <div className="fr-width-full fr-border-radius--8 fr-background-default--grey fr-border">
    <div className="fr-flex fr-align-items-center fr-width-full fr-justify-content-center fr-pt-4v fr-pb-2v fr-px-12v fr-border--bottom">
      <img src="/images/services/pro-connect-logo.svg" alt="" />
      <p className="fr-m-0 fr-text--bold fr-text--xs fr-text--uppercase">
        {title}
      </p>
    </div>
    <div className="fr-p-12v">{children}</div>
  </div>
)

export default RdvServicePubliqueConnexionCard
