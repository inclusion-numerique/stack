import Link from 'next/link'

type CodeDepartement = '04'

const departementNameFromCode: Record<CodeDepartement, string> = {
  '04': 'des Alpes de Haute-Provence',
}

export const StatistiquesTerritoriales = ({
  codeDepartement,
}: {
  codeDepartement: '04'
}) => (
  <div className="fr-background-alt--blue-france fr-p-4w fr-mb-3w fr-border-radius--16">
    <div className="fr-text--uppercase fr-text--medium fr-text--sm fr-mb-2w">
      <span
        className="fr-icon-france-line fr-text-label--blue-france fr-mr-1w"
        aria-hidden
      />
      Les données publiques de l’Inclusion Numérique{' '}
      {departementNameFromCode[codeDepartement]}· {codeDepartement}
    </div>
    <p>
      Vos statistiques contribuent à valoriser et comprendre l’impact de
      l’inclusion numérique sur votre territoire.{' '}
      <Link
        className="fr-link wip fr-text--sm fr-mb-0"
        href="/"
        target="_blank"
        rel="noreferrer"
      >
        En savoir plus sur l’utilisation de vos données
      </Link>
    </p>
    <Link className="fr-link wip" href="/" target="_blank" rel="noreferrer">
      Voir les données publiques de mon département sur France Numérique
      Ensemble
    </Link>
  </div>
)
