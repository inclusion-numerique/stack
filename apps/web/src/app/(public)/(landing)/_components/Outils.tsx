import Image from 'next/image'
import Link from 'next/link'

export const Outils = () => (
  <div className="fr-container">
    <div className="fr-text--center fr-container--medium fr-px-md-8w fr-mx-auto">
      <Image
        width={69}
        height={64}
        src="/images/illustrations/landing-page/outils/outiller.svg"
        alt=""
      />
      <div className="fr-text-mention--grey fr-text--bold fr-text--xl fr-text--uppercase fr-mt-3w fr-mb-0">
        Une suite d’outils à votre disposition
      </div>
      <h2 className="fr-h1 fr-text-title--blue-france">
        Découvrez les outils intégrés
      </h2>
      <p className="fr-mb-15v">
        La Coop de la médiation numérique intègre un panel d’outils à
        destination des médiateurs et médiatrices numériques. Elle a vocation à
        faciliter l’interconnexion entre les outils développés par le programme
        Société Numérique de l’Agence Nationale de la Cohésion des Territoires
        et les acteurs de la médiation numérique.
      </p>
    </div>
    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-lg-4 fr-col-md-6 fr-col-12">
        <div className="fr-background-default--grey fr-border-radius--16 fr-p-6w fr-height-full fr-flex fr-direction-column">
          <Image
            className="fr-background-alt--blue-france fr-border-radius--16 fr-p-2w"
            width={88}
            height={88}
            src="/images/services/cartographie-icon.svg"
            alt=""
          />
          <div className="fr-my-3w">
            <h3 className="fr-h6 fr-mb-2w">
              La Cartographie Nationale des lieux d’inclusion numérique
            </h3>
            <p className="fr-mb-0 fr-text-mention--grey">
              Rendre visible vos lieux et services d’inclusion numérique pour
              faciliter l’orientation des bénéficiaires.
            </p>
          </div>
          <span className="fr-mt-auto">
            <Link
              className="fr-link"
              href="https://cartographie.societenumerique.gouv.fr"
              target="_blank"
              rel="noreferrer"
              title="Accéder à la cartographie Nationale des lieux d’inclusion numérique - nouvel onglet"
            >
              Découvrir
            </Link>
          </span>
        </div>
      </div>
      <div className="fr-col-lg-4 fr-col-md-6 fr-col-12">
        <div className="fr-background-default--grey fr-border-radius--16 fr-p-6w fr-height-full fr-flex fr-direction-column">
          <Image
            className="fr-background-alt--blue-france fr-border-radius--16 fr-p-2w"
            width={88}
            height={88}
            src="/images/services/les-bases.svg"
            alt=""
          />
          <div className="fr-my-3w">
            <h3 className="fr-h6 fr-mb-2w">
              Les Bases du numérique d’intérêt général
            </h3>
            <p className="fr-mb-0 fr-text-mention--grey">
              La plateforme collaborative de partage de ressources & communs
              numériques à l’échelle nationale.
            </p>
          </div>
          <span className="fr-mt-auto">
            <Link
              className="fr-link"
              href="https://lesbases.anct.gouv.fr/"
              target="_blank"
              rel="noreferrer"
              title="Accéder aux bases du numérique d’intérêt général - nouvel onglet"
            >
              Découvrir
            </Link>
          </span>
        </div>
      </div>
      <div className="fr-col-lg-4 fr-col-md-6 fr-col-12">
        <div className="fr-background-default--grey fr-border-radius--16 fr-p-6w fr-height-full fr-flex fr-direction-column">
          <Image
            className="fr-background-alt--blue-france fr-border-radius--16 fr-p-2w"
            width={88}
            height={88}
            src="/images/services/conseillers-numerique-logo-small.svg"
            alt=""
          />
          <div className="fr-my-3w">
            <h3 className="fr-h6 fr-mb-2w">Espace France Numérique Ensemble</h3>
            <p className="fr-mb-0 fr-text-mention--grey">
              Les données utiles pour comprendre l’inclusion numérique sur votre
              territoire.
            </p>
          </div>
          <span className="fr-mt-auto">
            <Link
              className="fr-link"
              href="https://inclusion-numerique.anct.gouv.fr/"
              target="_blank"
              rel="noreferrer"
              title="Accéder à l'espace France Numérique Ensemble - nouvel onglet"
            >
              Découvrir
            </Link>
          </span>
        </div>
      </div>
      <div className="fr-col-lg-4 fr-col-md-6 fr-col-12">
        <div className="fr-background-default--grey fr-border-radius--16 fr-p-6w fr-height-full fr-flex fr-direction-column">
          <Image
            className="fr-background-alt--blue-france fr-border-radius--16 fr-p-2w"
            width={88}
            height={88}
            src="/images/services/rdv-aide-numerique.svg"
            alt=""
          />
          <div className="fr-my-3w">
            <h3 className="fr-h6 fr-mb-2w">RDV Aide Numérique</h3>
            <p className="fr-mb-0 fr-text-mention--grey">
              Faciliter la gestion des rendez-vous avec vos bénéficiaires.
            </p>
          </div>
          <span className="fr-mt-auto">
            <Link
              className="fr-link"
              href="https://www.rdv-aide-numerique.fr"
              target="_blank"
              rel="noreferrer"
              title="Accéder à RDV Aide Numérique - nouvel onglet"
            >
              Découvrir
            </Link>
          </span>
        </div>
      </div>
      <div className="fr-col-lg-4 fr-col-md-6 fr-col-12">
        <div className="fr-background-default--grey fr-border-radius--16 fr-p-6w fr-height-full fr-flex fr-direction-column">
          <Image
            className="fr-background-alt--blue-france fr-border-radius--16 fr-p-2w"
            width={88}
            height={88}
            src="/images/services/aidants-connect.svg"
            alt=""
          />
          <div className="fr-my-3w">
            <h3 className="fr-h6 fr-mb-2w">Aidants Connect</h3>
            <p className="fr-mb-0 fr-text-mention--grey">
              Sécuriser l’aidant et la personne accompagnée dans la réalisation
              de démarches administratives en ligne.
            </p>
          </div>
          <span className="fr-mt-auto">
            <Link
              className="fr-link"
              href="https://aidantsconnect.beta.gouv.fr"
              target="_blank"
              rel="noreferrer"
              title="Accéder à Aidants Connect - nouvel onglet"
            >
              Découvrir
            </Link>
          </span>
        </div>
      </div>
      <div className="fr-col-lg-4 fr-col-md-6 fr-col-12">
        <div className="fr-background-default--grey fr-border-radius--16 fr-p-6w fr-height-full fr-flex fr-direction-column">
          <Image
            className="fr-background-alt--blue-france fr-border-radius--16 fr-p-2w"
            width={88}
            height={88}
            src="/images/services/pix.svg"
            alt=""
          />
          <div className="fr-my-3w">
            <h3 className="fr-h6 fr-mb-2w">Pix</h3>
            <p className="fr-mb-0 fr-text-mention--grey">
              Proposez des parcours Pix adaptés aux besoins de vos apprenants et
              suivez leur progression.
            </p>
          </div>
          <span className="fr-mt-auto">
            <Link
              className="fr-link"
              href="https://pix.fr"
              target="_blank"
              rel="noreferrer"
              title="Accéder à Pix - nouvel onglet"
            >
              Découvrir
            </Link>
          </span>
        </div>
      </div>
    </div>
  </div>
)
