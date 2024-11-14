import React from 'react'

const LieuActiviteFullWidthLayout = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div className="fr-layout__inner fr-height-full">
    <div className="fr-layout__main fr-background-alt--blue-france ">
      {children}
    </div>
  </div>
)

export default LieuActiviteFullWidthLayout
