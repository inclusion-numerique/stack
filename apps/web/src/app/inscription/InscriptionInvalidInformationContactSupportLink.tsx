import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'

const InscriptionInvalidInformationContactSupportLink = ({
  className,
  linkClassName,
}: {
  className?: string
  linkClassName?: string
}) => (
  <div
    className={classNames('fr-width-full fr-text--center fr-mt-6v', className)}
  >
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <Link
      className={classNames(
        'wip-outline fr-link fr-link--sm fr-mb-0 ',
        linkClassName,
      )}
      href="#"
    >
      Ce ne sont pas vos informations&nbsp;? Contactez le support
    </Link>
  </div>
)

export default InscriptionInvalidInformationContactSupportLink
