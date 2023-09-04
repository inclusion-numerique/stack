import Link from 'next/link'
import React from 'react'

const SiretInputInfo = () => (
  <Link
    href="https://annuaire-entreprises.data.gouv.fr"
    target="_blank"
    className="fr-mt-2v fr-text-action-high--blue-france fr-text--sm"
  >
    Retrouvez le SIRET sur l’Annuaire des Entreprises
  </Link>
)

export default SiretInputInfo
