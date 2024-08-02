import styles from './BeneficiairePageNavigationBar.module.css'
import Link from 'next/link'

const BeneficiairePageNavigationBar = ({
  accompagnementsCount,
  current,
  beneficiaireId,
}: {
  beneficiaireId: string
  accompagnementsCount: number
  current: 'informations' | 'accompagnements'
}) => (
  <div className={styles.navigationBar}>
    <nav className="fr-nav">
      <ul className="fr-nav__list">
        <li className="fr-nav__item">
          <Link
            className="fr-nav__link fr-link--md"
            href={`/coop/mes-beneficiaires/${beneficiaireId}`}
            aria-current={current === 'informations' ? 'page' : undefined}
          >
            Informations
          </Link>
        </li>
        <li className="fr-nav__item">
          <Link
            className="fr-nav__link fr-link--md"
            href={`/coop/mes-beneficiaires/${beneficiaireId}/accompagnements`}
            aria-current={current === 'accompagnements' ? 'page' : undefined}
          >
            Historique des accompagnements&nbsp;·&nbsp;
            <span className="fr-text--bold">{accompagnementsCount}</span>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
)

export default BeneficiairePageNavigationBar
