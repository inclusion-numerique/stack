import classNames from 'classnames'
import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const CardOutil = ({
  logo,
  title,
  href,
  children,
  inline = false,
}: {
  logo: string
  title: string
  href: string
  children: ReactNode
  inline?: boolean
}) => (
  <div className="fr-background-default--grey fr-border-radius--16 fr-border fr-p-6w fr-height-full fr-flex fr-direction-column">
    <div
      className={classNames(
        'fr-flex fr-align-items-center fr-flex-gap-8v',
        !inline && 'fr-display-block-xl',
      )}
    >
      <Image
        className="fr-background-alt--blue-france fr-border-radius--16 fr-p-2w"
        width={88}
        height={88}
        src={logo}
        alt=""
      />
      <div className="fr-my-3w">
        <h3 className="fr-h6 fr-mb-2w">{title}</h3>
        <p className="fr-mb-0 fr-text-mention--grey">{children}</p>
      </div>
    </div>
    <span className="fr-mt-auto fr-flex fr-flex-gap-4v fr-justify-content-space-between">
      <Link
        className="fr-link fr-link--no-underline fr-icon-question-line fr-link--icon-left"
        title={`En savoir plus à propos de ${title}`}
        href="/"
      >
        En savoir plus
      </Link>
      <Link
        className="fr-link fr-link--no-underline"
        target="_blank"
        rel="noreferrer"
        title={`Accéder à ${title} - nouvel onglet`}
        href={href}
      >
        Accéder
      </Link>
    </span>
  </div>
)
