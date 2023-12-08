import React, { ReactNode } from 'react'

export const AttributePreview = ({
  attribute,
  children,
}: {
  attribute: string | null
  children: ReactNode
}) =>
  attribute && (
    <div className="fr-mb-2w">
      <div className="fr-text-mention--grey">{children}</div>
      <span className="fr-text--bold fr-text-title--grey">{attribute}</span>
    </div>
  )
