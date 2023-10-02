import type { Metadata } from 'next'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { gouvernancePersonas } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import LinkCard from '@app/web/ui/LinkCard'
import BackLink from '@app/web/components/BackLink'
import styles from './Gouvernance.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Participer à l’élaboration des feuilles de routes territoriales',
} satisfies Metadata

const GouvernanceCtaPage = () => (
  <>
    <div className="fr-container">
      <Breadcrumbs currentPage="Formulaires feuilles de routes territoriales" />
    </div>
    <div className={styles.contentContainer}>
      <BackLink href="/" label="Retour à l’accueil" />
      <h1 className="fr-mt-8v">{metadata.title}</h1>
      <p className="fr-text--lg fr-mt-8v">
        Dans le cadre du déploiement de{' '}
        <strong>la feuille de route France Numérique Ensemble</strong>, en tant
        que collectivité ou acteur territorial, vous êtes invité à manifester
        votre souhait de participer à l’élaboration des feuilles de route
        d’Inclusion Numérique sur votre territoire. En tant que Conseil
        Régional, Conseil Département ou EPCI, vous pouvez également porter une
        feuille de route.
      </p>
      <Notice title="Les informations récoltés seront mises à disposition des préfectures pour organiser la gouvernance d’Inclusion Numérique sur leur territoire." />
      <p className="fr-text--lg fr-mt-8v fr-mb-8v">
        Retrouvez, par type de collectivité ou d’acteur territorial, les
        informations qui vous seront demandées :
      </p>
      {Object.values(gouvernancePersonas).map((gouvernance) => (
        <LinkCard
          title={gouvernance.title}
          text={gouvernance.cta}
          href={`/gouvernance/${gouvernance.id}`}
          key={gouvernance.id}
        />
      ))}
    </div>
  </>
)

export default GouvernanceCtaPage
