import Image from 'next/image'
import Link from 'next/link'

export const Contexte = () => (
  <div className="fr-container">
    <div className="fr-text--center">
      <Image
        width={68}
        height={64}
        src="/images/illustrations/landing-page/contexte/identifier.svg"
        alt=""
      />
      <div className="fr-text-mention--grey fr-text--bold fr-text--xl fr-text--uppercase fr-mt-3w fr-mb-0">
        Le contexte
      </div>
      <h2 className="fr-h1 fr-text-title--blue-france fr-mb-10w">
        L’inclusion numérique
      </h2>
    </div>
    <div className="fr-flex fr-direction-md-row fr-direction-column fr-flex-gap-6v">
      <div className="fr-col-md-6 fr-background-alt--blue-france fr-p-6w fr-border-radius--16">
        <Image
          className="fr-responsive-img fr-border-radius--16"
          src="/images/illustrations/landing-page/contexte/éloignement-numérique.svg"
          alt=""
          width={464}
          height={270}
        />
        <h3 className="fr-text-title--blue-france fr-h2 fr-mt-6w">
          Qui sont les personnes éloignées du numérique aujourd’hui&nbsp;?
        </h3>
        <p>
          De nos jours, la large diffusion des infrastructures et équipements
          numériques nous conduit à penser{' '}
          <strong>l’éloignement numérique</strong> moins par une approche
          centrée sur le manque (d’accès, d’équipement) mais plus en termes
          d’apport des technologies numériques pour les individus dans leur vie
          quotidienne, on parle de <strong>« capabilité numérique »</strong>.
        </p>
        <p>
          La nature capacitante ou non-capacitante des technologies numériques
          est grandement{' '}
          <strong>conditionnée par les conditions des individus</strong>.
        </p>
        <p>
          Ainsi, l’éloignement numérique ne peut plus être considéré comme un
          simple enjeu technique ou technologique :{' '}
          <strong>il s’agit d’abord d’un phénomène social</strong>.
        </p>
        <Link
          className="fr-link wip-outline"
          href="/"
          target="_blank"
          rel="noreferrer"
          title="En savoir plus à propos des personnes éloignées du numérique - nouvel onglet"
        >
          En savoir plus
        </Link>
      </div>
      <div className="fr-col-md-6 fr-background-alt--blue-france fr-p-6w fr-border-radius--16">
        <Image
          className="fr-responsive-img fr-border-radius--16"
          src="/images/illustrations/landing-page/contexte/médiation-numérique.svg"
          alt=""
          width={464}
          height={270}
        />
        <h3 className="fr-text-title--blue-france fr-h2 fr-mt-6w">
          Qui sont les médiateurs et médiatrices numériques ?
        </h3>
        <p>
          Les médiateurs et médiatrices numériques, qu’ils soient ou non
          conseillers numériques, sont{' '}
          <strong>
            des professionnels qui œuvrent pour une meilleure inclusion
            numérique
          </strong>{' '}
          de la population.
        </p>
        <p>
          Grâce à leurs{' '}
          <strong>
            compétences sociales, pédagogiques et leur connaissance des
            technologies numériques
          </strong>
          , ils accompagnent la montée en compétence de la population sur les
          sujets numériques.
        </p>
        <p>
          <strong>Œuvrant dans des structures variées</strong> comme des centres
          sociaux, médiathèques, collectivités territoriales, associations,
          espace France Services, ils sont répartis sur{' '}
          <Link
            className="fr-link wip-outline"
            href="/"
            target="_blank"
            rel="noreferrer"
            title="Répartition des structures sur le territoire français - nouvel onglet"
          >
            tout le territoire français
          </Link>
          .
        </p>
        <p className="fr-mb-0">
          Leur travail s’intègre à la feuille de route{' '}
          <Link
            className="fr-link"
            href="https://inclusion-numerique.anct.gouv.fr/"
            target="_blank"
            rel="noreferrer"
            title="Feuille de route France Numérique Ensemble - nouvel onglet"
          >
            France Numérique Ensemble
          </Link>
          .
        </p>
      </div>
    </div>
  </div>
)
