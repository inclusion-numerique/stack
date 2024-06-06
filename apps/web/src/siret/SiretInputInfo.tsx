import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

const SiretInputInfo = ({ className }: { className?: string }) => (
  <Link
    href="https://annuaire-entreprises.data.gouv.fr"
    target="_blank"
    className={classNames(
      'fr-mt-2v fr-display-inline-block fr-text-action-high--blue-france fr-text--sm',
      className,
    )}
  >
    Retrouvez le SIRET sur l’Annuaire des Entreprises
  </Link>
)

export default SiretInputInfo
