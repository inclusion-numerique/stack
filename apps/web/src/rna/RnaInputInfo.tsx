import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

const RnaInputInfo = ({ className }: { className?: string }) => (
  <Link
    href="https://www.journal-officiel.gouv.fr/pages/associations-recherche"
    target="_blank"
    className={classNames(
      'fr-mt-2v fr-display-inline-block fr-text-action-high--blue-france fr-text--sm',
      className,
    )}
  >
    Retrouvez le RNA sur le Journal Officiel
  </Link>
)

export default RnaInputInfo
