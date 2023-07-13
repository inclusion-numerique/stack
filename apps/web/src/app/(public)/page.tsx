import Button from '@codegouvfr/react-dsfr/Button'
import Image from 'next/image'
import styles from './Home.module.css'

export const revalidate = 0

const HomePage = () => (
  <div className="fr-grid-row  fr-grid-row--gutters fr-mt-14v fr-pb-14v">
    <div className="fr-col-12 fr-col-md-7">
      <h1>Les données de l&apos;Inclusion Numérique</h1>
      <h3 className="fr-mt-12v">Œuvrer Ensemble pour un Numérique Inclusif</h3>
      <p className="fr-mt-12v">
        L’ANCT, en accord avec la feuille de route France Numérique Ensemble
        issue du Conseil National de la Refondation, vise à soutenir les acteurs
        territoriaux en fournissant des outils de diagnostic quantitatif et en
        développant des stratégies d’inclusion numérique.
      </p>
      <p className="fr-mb-2v">En naviguant sur ce site, vous pouvez&nbsp;:</p>
      <ul className="fr-mb-4v">
        <li>
          Accéder à une analyse détaillée par département sur l’inclusion
          numérique, permettant d’identifier les défis spécifiques à chaque
          territoire.
        </li>
        <li>
          Collaborer à l’identification des priorités et des engagements
          territoriaux, facilitant la mise en œuvre des actions locales.
        </li>
        <li>
          Participer à un effort commun pour renforcer l’inclusion numérique et
          améliorer l’accès aux services pour tous.
        </li>
      </ul>
      <p>
        Initialement dédié aux services préfectoraux, ce site sera
        progressivement étendu à tous les acteurs territoriaux, soulignant le
        rôle essentiel des collectivités locales dans la mise en œuvre de
        l’inclusion numérique.
      </p>
      <Button
        className="fr-mt-12v"
        linkProps={{ href: '/prefet' }}
        iconPosition="left"
        iconId="fr-icon-account-circle-line"
        data-testid="prefet-button"
      >
        Se connecter à l&apos;Espace Préfet
      </Button>
    </div>
    <div className="fr-col-12 fr-col-md-5">
      <Image
        src="/images/home.png"
        alt="Accueil"
        className={styles.homeImage}
        width={972}
        height={1032}
      />
    </div>
  </div>
)

export default HomePage
