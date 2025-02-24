import classNames from 'classnames'
import Image from 'next/image'
import { ReactNode } from 'react'

export const CardOutil = ({
  logo,
  title,
  inforef,
  children,
}: {
  logo: string
  title: string
  inforef: string
  children: ReactNode
}) => (
  <div className="fr-border-radius--16 fr-border fr-py-10v fr-px-8v fr-height-full fr-flex fr-direction-column fr-enlarge-link">
    <div
      className={classNames(
        'fr-flex fr-align-items-center fr-align-items-xl-start fr-flex-gap-6v fr-height-full fr-direction-xl-column',
      )}
    >
      <Image
        className="fr-background-alt--blue-france fr-border-radius--16 fr-p-2w"
        width={88}
        height={88}
        src={logo}
        alt=""
      />
      <div className=" fr-flex-grow-1">
        <h3 className="fr-h6 fr-mb-2w">{title}</h3>
        <p className="fr-mb-0 fr-text-mention--grey">{children}</p>
        <a
          className="fr-flex-basis-0"
          title={`En savoir plus à propos de ${title}`}
          href={`/coop/mes-outils/${inforef}`}
          aria-label={`En savoir plus à propos de ${title}`}
        />
      </div>
      <div className="fr-flex fr-justify-content-end fr-width-full">
        <span className="fr-icon-arrow-right-line fr-text-title--blue-france" />
      </div>
    </div>
  </div>
)
