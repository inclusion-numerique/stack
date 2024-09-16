import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Notice from '@codegouvfr/react-dsfr/Notice'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import CoopBreadcrumbs from '../CoopBreadcrumbs'
import CoopPageContainer from '../CoopPageContainer'
import { CardOutil } from './_components/CardOutil'

export const MesOutils = () => (
  <CoopPageContainer size={794} className="fr-pt-8v">
    <CoopBreadcrumbs currentPage="Mes outils" />
    <SkipLinksPortal links={defaultSkipLinks} />
    <main id={contentId}>
      <h1 className="fr-text-title--blue-france">Mes outils</h1>
      <p>
        Retrouvez ici des outils et des services numériques utiles dans votre
        pratique de la médiation numérique. Découvrez, pour chacun d’eux, plus
        d’informations sur leurs principaux usages et comment avoir accès à
        chacun de ces outils en cliquant sur ‘En savoir plus’.
      </p>
      <Notice
        className="fr-notice--new fr-notice--flex"
        isClosable
        title={
          <span className="fr-text--regular">
            <span className="fr-text-default--grey fr-text--bold fr-display-block">
              Prochaines évolutions à venir !
            </span>
            <span className="fr-display-block fr-text--sm fr-my-1v">
              Amélioration du partage d’informations entre ces outils pour
              fluidifier l’organisation du travail.
            </span>
            <Link href="/" className="wip-outline fr-link fr-text--sm">
              En savoir plus
            </Link>
          </span>
        }
      />
      <section className="fr-mt-6w">
        <h2 className="fr-h5 fr-text-mention--grey">
          <span className="ri-service-line fr-mr-1w" aria-hidden="true" />
          Des outils pour vos accompagnements
        </h2>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-xl-6 fr-col-12">
            <CardOutil
              logo="/images/services/rdv-aide-numerique.svg"
              title="RDV Aide Numérique"
              inforef="rdv-aide-numerique"
              href="https://www.rdv-aide-numerique.fr"
            >
              Faciliter la gestion des rendez-vous avec vos bénéficiaires.
            </CardOutil>
          </div>
          <div className="fr-col-xl-6 fr-col-12">
            <CardOutil
              logo="/images/services/aidants-connect.svg"
              title="Aidants Connect"
              inforef="aidants-connect"
              href="https://aidantsconnect.beta.gouv.fr"
            >
              Sécuriser l’aidant et la personne accompagnée dans la réalisation
              de démarches administratives en ligne.
            </CardOutil>
          </div>
        </div>
      </section>
      <section className="fr-mt-6w">
        <h2 className="fr-h5 fr-text-mention--grey fr-flex fr-align-items-center">
          <Image
            className="fr-mr-1w fr-img--grayscale"
            width={26}
            height={26}
            src="/images/services/pix.svg"
            alt=""
          />
          Les outils PIX dédiés à la médiation numérique
        </h2>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-xl-6 fr-col-12">
            <CardOutil
              logo="/images/services/pix.svg"
              title="PIX"
              inforef="pix"
              href="https://pix.fr"
            >
              Proposez des tutoriels PIX adaptés aux besoins de vos apprenants
              et suivez leur progression.
            </CardOutil>
          </div>
          <div className="fr-col-xl-6 fr-col-12">
            <CardOutil
              logo="/images/services/abc-diag.svg"
              title="ABC Diag"
              inforef="abc-diag"
              href="https://pix.fr/abc-diag"
            >
              Diagnostiquez en 10 questions la maîtrise de compétences
              numériques de base.
            </CardOutil>
          </div>
        </div>
      </section>
      <section className="fr-mt-6w">
        <h2 className="fr-h5 fr-text-mention--grey">
          <span
            className="fr-icon-france-line fr-text-mention--grey fr-mr-1w"
            aria-hidden="true"
          />
          Des données utiles sur les lieux et dispositifs d’inclusion numérique
        </h2>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-xl-6 fr-col-12">
            <CardOutil
              logo="/images/services/conseillers-numerique-logo-small.svg"
              title="Espace France Numérique Ensemble"
              inforef="espace-france-numerique-ensemble"
              href="https://inclusion-numerique.anct.gouv.fr"
            >
              Les données utiles pour comprendre l’inclusion numérique sur votre
              territoire.
            </CardOutil>
          </div>
          <div className="fr-col-xl-6 fr-col-12">
            <CardOutil
              logo="/images/services/cartographie-icon.png"
              title="La Cartographie Nationale des lieux d’inclusion numérique"
              inforef="cartographie-nationale-des-lieux-d-inclusion-numerique"
              href="https://cartographie.societenumerique.gouv.fr"
            >
              Rendre visible vos lieux et services d’inclusion numérique pour
              faciliter l’orientation des bénéficiaires.
            </CardOutil>
          </div>
        </div>
      </section>
      <section className="fr-mt-6w">
        <h2 className="fr-h5 fr-text-mention--grey">
          <span className="ri-search-line fr-mr-1w" aria-hidden="true" />
          Découvrez des ressources autour de l’inclusion numérique
        </h2>
        <CardOutil
          inline
          logo="/images/services/les-bases.svg"
          title="Les Bases du numérique d’intérêt général"
          inforef="les-bases-du-numerique-d-interet-general"
          href="https://lesbases.anct.gouv.fr"
        >
          La plateforme collaborative de partage de ressources & communs
          numériques à l’échelle nationale.
        </CardOutil>
      </section>
    </main>
  </CoopPageContainer>
)
