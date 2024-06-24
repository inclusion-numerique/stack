import Link from 'next/link'
import classNames from 'classnames'

const ConseillerNumeriqueInscriptionNotice = ({
  className,
}: {
  className?: string
}) => (
  <div
    className={classNames(
      'fr-border-radius--8 fr-background-alt--blue-france fr-flex-gap-4v fr-px-6v fr-py-4v fr-width-full fr-flex fr-justify-content-center fr-mb-12v',
      className,
    )}
  >
    <img src="/images/services/conseillers-numerique-logo.svg" />
    <div>
      <p className="fr-text--bold fr-mb-1v">
        Vous avez été identifié en tant que conseiller numérique
      </p>
      <p className="fr-text-mention--grey fr-text--xs fr-mb-0">
        Source&nbsp;:{' '}
        <Link target="_blank" href="https://conseiller-numerique.gouv.fr">
          conseiller-numerique.gouv.fr
        </Link>
      </p>
    </div>
  </div>
)

export default ConseillerNumeriqueInscriptionNotice
