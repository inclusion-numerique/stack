import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const DisplayOnCartography = () => (
  <div className="fr-px-8v fr-py-10v fr-background-alt--blue-france fr-border-radius-top--8">
    <div className="fr-flex fr-flex-gap-6v fr-align-items-center">
      <Image
        className="fr-display-block"
        src="/images/services/cartographie-logo.svg"
        alt=""
        width={56}
        height={56}
      />{' '}
      <p className="fr-text--lg fr-mb-0 fr-text-title--blue-france fr-text--bold">
        Vous souhaitez apparaître sur la cartographie nationale des lieux
        d’inclusion numérique&nbsp;?
      </p>
    </div>
    <div className="fr-flex fr-mt-8v fr-flex-gap-3v fr-align-items-center">
      <span
        className="fr-icon-edit-line fr-text-title--blue-france"
        aria-hidden
      />
      <p className="fr-text--sm fr-mb-0">
        Renseignez des informations sur le lieu et les services d’inclusion
        numérique qui y sont proposés
      </p>
    </div>
    <div className="fr-flex fr-mt-4v fr-mb-8v fr-flex-gap-3v fr-align-items-center">
      <span
        className="fr-icon-compass-3-line fr-text-title--blue-france"
        aria-hidden
      />
      <p className="fr-text--sm fr-mb-0">
        Gagnez en visibilité et orientez les bénéficiaires grâce à la
        cartographie
      </p>
    </div>
    <Link
      href="https://cartographie.societenumerique.gouv.fr/presentation"
      target="_blank"
      className="fr-link fr-link--sm fr-mb-0"
    >
      En savoir plus sur la cartographie
    </Link>
  </div>
)
