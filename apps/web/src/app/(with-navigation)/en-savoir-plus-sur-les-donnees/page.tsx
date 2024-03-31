import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import Link from 'next/link'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle(`En savoir plus sur les données`),
}

const information = [
  {
    title: 'Des données sur les lieux d’inclusion numérique',
    description:
      'Retrouvez des données sur les typologies de lieux d’inclusion numérique, les différents labels ainsi que les territoires prioritaires (QPV et ZRR).',
    services: [
      {
        title: 'La Cartographie Nationale des lieux d’inclusion numérique',
        description:
          'Recenser les lieux d’inclusion numérique à l’échelle nationale & orienter les publics vers les structures répondant à leur besoin.',
        link: 'https://cartographie.societenumerique.gouv.fr/presentation',
        illustration: '/images/services/cartographie-nationale.svg',
      },
      {
        title: 'Data Inclusion',
        description:
          'Créer un référentiel commun de toutes les données de l’offre d’insertion des territoires.',
        link: 'https://www.data.inclusion.beta.gouv.fr',
        illustration: '/images/services/data-inclusion.svg',
      },
    ],
  },
  {
    title:
      'Des données sur les aidants numériques & leur déploiement sur le territoire',
    description:
      'Retrouvez des données sur le déploiement des conseillers numériques, leurs accompagnements et leurs bénéficiaires, ainsi que sur les aidants numériques habilités Aidants Connect et leurs accompagnements.',
    services: [
      {
        title: 'Aidants Connect',
        description:
          "Sécuriser l'aidant et la personne accompagnée dans la réalisation de démarches administratives en ligne.",
        link: 'https://aidantsconnect.beta.gouv.fr',
        illustration: '/images/services/aidants-connect.svg',
      },
      {
        title: 'Conseiller numérique',
        description:
          'Former et déployer des conseillers numériques pour accompagner les usagers vers l’autonomie numérique.',
        link: 'https://www.conseiller-numerique.gouv.fr',
        illustration: '/images/services/conseiller-numerique.svg',
      },
    ],
  },
  {
    title:
      'Des données sur les zones géographiques où il existe un risque accru de fragilité numérique',
    description:
      'Cinq indicateurs de l’indice de Fragilité Numérique sont présentés sur la cartographie : le taux de non-couverture au très haut débit, le taux de non-couverture 4G, la part des 65 ans et plus, la part des pas ou peu diplômés & le taux de pauvreté.',
    services: [
      {
        title: 'L’indice de Fragilité Numérique',
        description:
          'La cartographie pour comprendre le risque de fragilité numérique des territoires, réalisée par le Mednum.',
        link: 'https://lamednum.coop/actions/indice-de-fragilite-numerique',
        illustration: '/images/services/mednum.svg',
      },
    ],
  },
]

const ServiceCard = ({
  illustration,
  title,
  description,
  link,
}: {
  illustration: string
  title: string
  description: string
  link: string
}) => (
  <div className="fr-col-12 fr-col-md-6 fr-border--slim-grey fr-p-8v fr-pb-12v fr-flex fr-direction-column">
    <div className="fr-mb-6v">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={illustration} alt="" style={{ width: 88, height: 88 }} />
    </div>
    <h3 className="fr-h6 fr-mb-6v">{title}</h3>
    <p className="fr-mb-2v fr-flex-1">{description}</p>
    <div className="fr-flex-grow-1" />
    <div>
      <Link className="fr-link fr-link--lg" href={link} target="_blank">
        Découvrir
      </Link>
    </div>
  </div>
)

const Page = () => (
  <>
    <div className="fr-background-alt--blue-france fr-pt-4v fr-pb-6v fr-pb-md-14v">
      <div className="fr-container">
        <Breadcrumb
          className="fr-mb-6v fr-mt-0"
          currentPageLabel="En savoir plus sur les données"
          segments={[
            {
              label: 'Page d’accueil',
              linkProps: {
                href: '/',
              },
            },
          ]}
        />
        <div className="fr-flex fr-direction-column fr-flex-gap-6v fr-direction-md-row fr-align-items-md-center fr-justify-content-space-between">
          <div className="fr-mr-3w">
            <h1 className="fr-h2 fr-text-title--blue-france fr-mb-4v">
              Les services qui partagent leurs données
            </h1>
            <p className="fr-text--xl fr-mb-0">
              Retrouvez ici les différents services & outils dont le tableau de
              bord présente des données utiles pour comprendre et suivre
              l’évolution de l’inclusion numérique.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/dsfr/artwork/pictograms/leisure/community.svg" />
        </div>
      </div>
    </div>
    <div className="fr-container fr-container--medium fr-pt-20v fr-pb-50v">
      {information.map((info, index) => (
        <Fragment key={info.title}>
          {index !== 0 && <hr className="fr-separator-10v fr-mt-16v" />}
          <h2 className="fr-h3 fr-mb-8v">{info.title}</h2>
          <p className="fr-mb-8v">{info.description}</p>
          <div className="fr-flex fr-flex-gap-6v">
            {info.services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  </>
)

export default Page
