import Button from '@codegouvfr/react-dsfr/Button'
import Image from 'next/image'
import Quote from '@codegouvfr/react-dsfr/Quote'
import styles from './Home.module.css'

export const revalidate = 0

const HomePage = () => (
  <div className="fr-grid-row  fr-grid-row--gutters fr-mt-14v fr-pb-14v">
    <div className="fr-col-12 fr-col-md-7">
      <h1>France Numérique Ensemble</h1>
      <h3 className="fr-mt-12v">Œuvrer Ensemble pour un Numérique Inclusif</h3>
      <p className="fr-mt-12v">
        L’ANCT, dans le cadre de la feuille de route France Numérique Ensemble
        issue du Conseil National de la Refondation, vise à soutenir les acteurs
        territoriaux en fournissant des outils de diagnostic quantitatif et en
        développant des stratégies d’inclusion numérique.
      </p>

      <p className="fr-mb-2v">Principales fonctionnalités&nbsp;:</p>
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
          améliorer l’accès aux services publics pour tous.
        </li>
      </ul>
      <p>
        Initialement dédié aux services préfectoraux, ce site sera
        progressivement étendu à tous les acteurs territoriaux pour la
        coordination de la mise en œuvre de la feuille de route France Numérique
        Ensemble.
      </p>
      <Button
        className="fr-mt-12v"
        linkProps={{ href: '/tableau-de-bord/departement' }}
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
    <div className="fr-col-12 fr-mt-8v">
      <Quote
        text="La Plateforme de l'Inclusion Numérique offre un panorama sans précédent de notre territoire. Elle nous permet de prioriser efficacement nos initiatives et d'agir où l'action est le plus nécessaire."
        imageUrl="/images/prefet/prefet-a.png"
        author="Sophie Martin, Préfète de Mont-Royal"
      />
      <Quote
        text="Ce qui est remarquable avec cette plateforme, c'est sa capacité à fournir des données actualisées et pertinentes. C'est un outil inestimable pour planifier et suivre le progrès de l'inclusion numérique."
        imageUrl="/images/prefet/prefet-b.png"
        author="Jean Dupont, Préfet de Saint-Claire"
      />
      <Quote
        text="En rendant les données accessibles à tous les acteurs territoriaux, la Plateforme de l'Inclusion Numérique favorise une véritable collaboration. C'est un pas en avant considérable pour notre gouvernance locale."
        imageUrl="/images/prefet/prefet-c.png"
        author="Claire Dubois, Préfète de Verdania"
      />
    </div>
  </div>
)

export default HomePage
