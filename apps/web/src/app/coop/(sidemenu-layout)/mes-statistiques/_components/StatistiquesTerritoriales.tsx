import Link from 'next/link'
import { getDepartementFromCodeInsee } from '@app/web/utils/getDepartementFromCodeInsee'

export const StatistiquesTerritoriales = ({
  codeInsee,
}: {
  codeInsee?: string | null
}) => {
  const departement = codeInsee ? getDepartementFromCodeInsee(codeInsee) : null

  return (
    <div className="fr-background-alt--blue-france fr-p-4w fr-mb-3w fr-border-radius--16">
      <div className="fr-text--uppercase fr-text--medium fr-text--sm fr-mb-2w">
        <span
          className="fr-icon-france-line fr-text-label--blue-france fr-mr-1w"
          aria-hidden
        />
        Les données publiques de l’Inclusion Numérique{' '}
        {departement == null ? (
          'en France'
        ) : (
          <>
            du département {departement.nom}&nbsp;·&nbsp;{departement.code}
          </>
        )}
      </div>
      <p>
        Vos statistiques contribuent à valoriser et comprendre l’impact de
        l’inclusion numérique sur votre territoire.{' '}
        <Link
          className="fr-link fr-text--sm fr-mb-0"
          href="https://incubateurdesterritoires.notion.site/En-savoir-plus-sur-l-utilisation-des-donn-es-sur-la-Coop-de-la-m-diation-num-rique-82af14ef964b41c1bfb5cb4a01d6e40b"
          target="_blank"
          rel="noreferrer"
        >
          En savoir plus sur l’utilisation de vos données
        </Link>
      </p>
      <Link
        className="fr-link"
        href={
          departement == null
            ? 'https://inclusion-numerique.anct.gouv.fr/donnees/national'
            : `https://inclusion-numerique.anct.gouv.fr/donnees/departements/${departement.code}`
        }
        target="_blank"
        rel="noreferrer"
      >
        Voir les données publiques de mon département sur France Numérique
        Ensemble
      </Link>
    </div>
  )
}
