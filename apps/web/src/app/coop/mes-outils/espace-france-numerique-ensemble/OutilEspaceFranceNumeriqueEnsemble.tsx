import React from 'react'
import Link from 'next/link'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import HeaderBackLink from '@app/web/components/HeaderBackLink'
import { getDepartementFromCodeInsee } from '@app/web/utils/getDepartementFromCodeInsee'
import { OutilPageData } from '../outilPageData'
import { Hero } from '../[slug]/_components/Hero'

export const OutilEspaceFranceNumeriqueEnsemble = ({
  title,
  illustration,
  illustrationWidth,
  logo,
  description,
  website,
  codeInsee,
}: OutilPageData & { codeInsee?: string | null }) => {
  const departement = codeInsee ? getDepartementFromCodeInsee(codeInsee) : null

  return (
    <CoopPageContainer size={894} className="fr-pt-8v">
      <CoopBreadcrumbs
        parents={[
          { label: 'Mes outils', linkProps: { href: '/coop/mes-outils' } },
        ]}
        currentPage={title}
      />
      <HeaderBackLink className="fr-mb-3w" />
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId}>
        <Hero
          title={title}
          illustration={illustration}
          illustrationWidth={illustrationWidth}
          logo={logo}
          description={description}
          website={website}
        />
        <section className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-xl-7 fr-col-12">
            <div className="fr-border fr-border-radius--8 fr-p-4w fr-height-full">
              <p className="fr-text--sm">
                Cet outil permet de suivre l’évolution et les effets des
                politiques publiques mises en place dans le cadre de la feuille
                de route{' '}
                <Link
                  className="fr-link"
                  href="https://inclusion-numerique.anct.gouv.fr/"
                  target="_blank"
                  rel="noreferrer"
                >
                  France Numérique Ensemble
                </Link>
                .
              </p>
              <p className="fr-text--sm fr-text-mention--grey fr-text--uppercase fr-text--bold fr-mb-2w">
                Retrouvez des données publiques à jour, à l’échelle de votre
                département, concernant&nbsp;:
              </p>
              <ul className="fr-text--sm">
                <li>
                  Le déploiement des dispositifs d’inclusion numérique portés
                  par le programme{' '}
                  <Link
                    className="fr-link"
                    href="https://societenumerique.gouv.fr"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Société Numérique de l’ANCT
                  </Link>
                  .
                </li>
                <li>
                  Les données relatives aux lieux de médiation numérique tels
                  que référencés sur la{' '}
                  <Link
                    className="fr-link"
                    href="https://cartographie.societenumerique.gouv.fr/presentation"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cartographie Nationale
                  </Link>
                  .
                </li>
                <li>
                  Des données statistiques territoriales révélatrices des{' '}
                  <Link
                    className="fr-link"
                    href="https://fragilite-numerique.fr"
                    target="_blank"
                    rel="noreferrer"
                  >
                    fragilités numériques
                  </Link>{' '}
                  des populations (Ref : Mednum).
                </li>
              </ul>
              <p className="fr-mb-0 fr-p-3w fr-background-alt--brown-caramel fr-border-radius--8 fr-flex fr-flex-gap-4v">
                <div
                  className="ri-chat-poll-fill ri-lg fr-mt-1v fr-text-label--brown-caramel"
                  aria-hidden
                />
                <div className="fr-text--sm fr-mb-0">
                  Vos statistiques d’activités contribuent à valoriser l’impact
                  de la médiation numérique sur votre territoire.
                  <br />
                  <Link
                    className="fr-link"
                    href="https://incubateurdesterritoires.notion.site/En-savoir-plus-sur-l-utilisation-des-donn-es-sur-la-Coop-de-la-m-diation-num-rique-82af14ef964b41c1bfb5cb4a01d6e40b"
                    target="_blank"
                  >
                    En savoir plus sur l’utilisation de vos données
                  </Link>
                </div>
              </p>
            </div>
          </div>
          <div className="fr-col-xl-5 fr-col-12">
            <div className="fr-p-3w fr-mb-3w fr-border-radius--8 fr-background-alt--blue-france">
              <div className="fr-flex fr-flex-gap-3v">
                <span
                  className="ri-bar-chart-box-line ri-lg fr-text-label--blue-france fr-mt-1v"
                  aria-hidden
                />
                <h2 className="fr-text--xs fr-text--uppercase fr-mb-0">
                  Le tableau de bord{' '}
                  {departement == null ? (
                    'national'
                  ) : (
                    <>
                      du département {departement.nom}&nbsp;·&nbsp;
                      {departement.code}
                    </>
                  )}
                </h2>
              </div>
              <p className="fr-my-10v">
                Découvrez un état des lieux de l’offre et de l’impact de
                l’inclusion numérique{' '}
                {departement == null ? 'en France' : 'dans votre département'}.
              </p>
              <Link
                className="fr-link"
                href={
                  departement == null
                    ? 'https://inclusion-numerique.anct.gouv.fr/donnees/national'
                    : `https://inclusion-numerique.anct.gouv.fr/donnees/departements/${departement.code}`
                }
                target="_blank"
                rel="noreferrer"
              >
                Voir le tableau de bord
              </Link>
            </div>
            {departement != null && (
              <div className="fr-p-3w fr-border-radius--8 fr-background-alt--blue-france">
                <div className="fr-flex fr-flex-gap-3v">
                  <span
                    className="fr-icon-france-line fr-text-label--blue-france"
                    aria-hidden
                  />
                  <h2 className="fr-text--xs fr-text--uppercase fr-mb-0">
                    La cartographie du département {departement.nom}
                    &nbsp;·&nbsp;{departement.code}
                  </h2>
                </div>
                <p className="fr-my-5w">
                  Découvrez le déploiement des acteurs de l’inclusion numérique
                  dans votre département.
                </p>
                <Link
                  className="fr-link"
                  href={`https://inclusion-numerique.anct.gouv.fr/donnees/departements/${departement.code}/cartographie`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir la cartographie
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </CoopPageContainer>
  )
}
