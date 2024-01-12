import React, { ReactNode } from 'react'

const BlockWithLabel = ({
  label,
  canDisplay,
  children,
  mapTo,
}: {
  label: ReactNode
  canDisplay: string | boolean | null
  children: ReactNode
  mapTo?: (value: string) => ReactNode
}) =>
  canDisplay && (
    <div className="fr-mb-2w">
      <div className="fr-text-mention--grey">{label}</div>
      {mapTo && children ? mapTo(children.toString()) : children}
    </div>
  )

export default BlockWithLabel
