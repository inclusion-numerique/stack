import Image from 'next/image'
import Link from 'next/link'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'

export const Fonctionnalites = () => (
  <div className="fr-container">
    <div className="fr-text--center">
      <Image
        className="fr-border-radius--16"
        src="/images/illustrations/landing-page/fonctionnalites/deployer.svg"
        alt=""
        width={52}
        height={64}
      />
      <h2 className="fr-h1 fr-text-title--blue-france fr-px-md-16w fr-mb-0 fr-mt-3w">
        Des fonctionnalités adaptées aux besoins des médiateurs et médiatrices
        numériques
      </h2>
    </div>
    <div className="fr-grid-row fr-align-items-center fr-grid-row-sm--gutters fr-mt-md-15w fr-mt-6w">
      <div className="fr-col-lg-5 fr-col-sm-6 fr-col-12 fr-flex fr-direction-column fr-flex-gap-4v fr-my-2w">
        <h3 className="fr-mb-0">Valoriser son activité</h3>
        <p className="fr-mb-0">
          Des comptes rendus d’activités simples et une visualisation claire des
          statistiques pour faciliter le suivi d’activité et la communication
          auprès de différents partenaires.
        </p>
      </div>
      <div className="fr-col-sm-6 fr-col-offset-lg-1 fr-col-12">
        <Image
          className="fr-responsive-img"
          src="/images/illustrations/landing-page/fonctionnalites/mes-activités.svg"
          alt=""
          width={558}
          height={420}
        />
      </div>
    </div>
    <div className="fr-grid-row fr-direction-row-reverse fr-align-items-center fr-grid-row-sm--gutters fr-mt-md-15w fr-mt-6w">
      <div className="fr-col-lg-5 fr-col-sm-6 fr-col-offset-lg-1 fr-col-12 fr-flex fr-direction-column fr-flex-gap-4v fr-my-2w">
        <h3 className="fr-mb-0">Suivez l’évolution de vos bénéficiaires</h3>
        <p className="fr-mb-0">
          Accéder aux informations essentielles ainsi que l’historique des
          accompagnements d’un bénéficiaire pour suivre son parcours complet
          vers l’autonomie.
        </p>
        <span>
          <Link href="/" className="fr-link wip-outline">
            En savoir plus
          </Link>
        </span>
      </div>
      <div className="fr-col-sm-6  fr-col-12">
        <Image
          className="fr-responsive-img"
          src="/images/illustrations/landing-page/fonctionnalites/mes-bénéficiaire.svg"
          alt=""
          width={558}
          height={420}
        />
      </div>
    </div>
    <div className="fr-grid-row fr-align-items-center fr-grid-row-sm--gutters fr-mt-md-15w fr-mt-6w">
      <div className="fr-col-lg-5 fr-col-sm-6 fr-col-12 fr-flex fr-direction-column fr-flex-gap-4v fr-my-2w">
        <h3 className="fr-mb-0">Bénéficiez d’outils adaptés à vos pratiques</h3>
        <p className="fr-mb-0">
          De nombreux outils adaptés aux différents types d’accompagnements sont
          à disposition des médiateurs et médiatrices numériques. Leur
          inter-connexion permet une meilleure fluidité dans l’organisation du
          travail.
        </p>
        <span>
          <Link href="/" className="fr-link wip-outline">
            Voir la liste des outils
          </Link>
        </span>
      </div>
      <div className="fr-col-sm-6 fr-col-offset-lg-1 fr-col-12">
        <Image
          className="fr-responsive-img"
          src="/images/illustrations/landing-page/fonctionnalites/mes-outils.svg"
          alt=""
          width={558}
          height={420}
        />
      </div>
    </div>
    <div className="fr-border fr-border-md-none fr-p-md-5w fr-border-radius--16 fr-flex fr-direction-lg-row fr-direction-column fr-flex-gap-10v fr-mt-md-15w fr-mt-6w">
      <div className="fr-background-alt--blue-france fr-p-4w fr-col fr-border-radius--16">
        <Badge className="fr-text--uppercase" severity="new">
          prochainement !
        </Badge>
        <h3 className="fr-text-title--blue-france fr-mt-3w">
          Les évolutions à venir
        </h3>
        <p>
          Cette plateforme évolue en fonction des besoins de ses utilisateurs,
          et vous êtes tenu au courant des prochaines fonctionnalités à venir.
        </p>
        <Button
          className="fr-btn--responsive-sm"
          title="Voir la roadmap"
          priority="secondary"
          iconPosition="right"
          iconId="fr-icon-arrow-right-line"
          linkProps={{
            href: 'https://incubateurdesterritoires.notion.site/105744bf03dd80349c26e76cd8459eac?v=8949acfdde544d12860f5c0ca89af72f',
            target: '_blank',
          }}
        >
          Voir la roadmap
        </Button>
      </div>
      <div className="fr-col fr-py-3w">
        <Badge className="fr-text--uppercase fr-py-1w" severity="new" noIcon>
          <span className="ri-presentation-line fr-mr-1w ri-lg" aria-hidden />À
          Venir
        </Badge>
        <h3 className="fr-h6 fr-mt-3w">Planifiez des ateliers</h3>
        <p className="fr-mb-0">
          Créer des modèles d’ateliers, planifier des évènements et gérer la
          liste des participants. Retrouver automatiquement les informations
          dans les comptes rendus d’activités ainsi que dans l’historique des
          bénéficiaires.
        </p>
      </div>
      <div className="fr-col fr-py-3w">
        <Badge className="fr-text--uppercase fr-py-1w" severity="new" noIcon>
          <span className="ri-team-line fr-mr-1w ri-lg" aria-hidden />À Venir
        </Badge>
        <h3 className="fr-h6 fr-mt-3w">Faites partie d’une communauté</h3>
        <p className="fr-mb-0">
          Échanger avec les acteurs et actrices de la médiation numérique de son
          territoire, découvrir des évènements nationaux ou territoriaux, créer
          des partenariats, demander de l’aide en cas besoin.
        </p>
      </div>
    </div>
  </div>
)
