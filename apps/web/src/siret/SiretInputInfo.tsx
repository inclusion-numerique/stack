import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

const SiretInputInfo = ({
  className,
  searchTerm,
}: {
  className?: string
  searchTerm?: string
}) => (
  <Link
    href={`https://annuaire-entreprises.data.gouv.fr${searchTerm ? `/rechercher?terme=${searchTerm}` : ''}`}
    target="_blank"
    className={classNames(
      'fr-mt-2v fr-display-inline-block fr-text-action-high--blue-france fr-text--sm fr-mb-0',
      className,
    )}
  >
    Retrouvez le SIRET sur l’Annuaire des Entreprises
  </Link>
)

export default SiretInputInfo
