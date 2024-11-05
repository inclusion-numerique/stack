import Link from 'next/link'
import classNames from 'classnames'
import React from 'react'

const RoleInscriptionNotice = ({
  roleInscription,
  className,
}: {
  roleInscription: string
  className?: string
}) => (
  <div
    className={classNames(
      'fr-background-contrast--info fr-flex fr-flex-gap-4v fr-border-radius--8 fr-p-3w',
      className,
    )}
  >
    <img alt="" src="/images/illustrations/role/conseillers-numerique.svg" />
    <div>
      <p className="fr-text--bold fr-mb-0">
        Vous avez été identifié en tant que {roleInscription}
      </p>
      <div className="fr-text--xs fr-mb-0 fr-text-mention--grey">
        Source&nbsp;:{' '}
        <Link
          href="https://conseiller-numerique.gouv.fr"
          target="_blank"
          rel="noreferrer"
        >
          conseiller-numerique.gouv.fr
        </Link>
      </div>
    </div>
  </div>
)

export default RoleInscriptionNotice
