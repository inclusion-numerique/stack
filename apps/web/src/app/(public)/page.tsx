import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import styles from './Home.module.css'

export const revalidate = 0

const HomePage = () => (
  <>
    <div className="fr-background-alt--blue-france fr-py-20v">
      <section
        className={classNames('fr-container', styles.section, styles.hero)}
      >
        <h1 className="fr-text-title--blue-france">
          L’outil de diagnostic de l’inclusion numérique pour les territoires
        </h1>
        <p className="fr-text--bold fr-text--lg">
          porté par l’Agence nationale de la cohésion des territoires
        </p>
        <p className="fr-text--lg">
          Cet outil doit permettre, dans le cadre du déploiement de{' '}
          <strong>la feuille de route France Numérique Ensemble</strong>, de
          faciliter la réalisation des diagnostics ainsi que l’élaboration des
          priorités et engagements des feuilles de routes territoriales.
        </p>
      </section>
    </div>
    <div className="fr-py-20v">
      <section className={classNames('fr-container', styles.section)}>
        <div className={classNames('fr-grid-row', styles.rowReverse)}>
          <div
            className={classNames(
              'fr-col-12 fr-col-md-5 fr-col-offset-md-1',
              styles.homeImageContainer,
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home-map.svg"
              alt=""
              className={styles.homeImage}
            />
          </div>
          <div className="fr-col-12 fr-col-md-6  fr-text--lg">
            <h2 className="fr-mt-8v fr-mt-md-0 ">
              Les données utiles pour comprendre l’inclusion numérique sur votre
              territoire
            </h2>

            <p className="fr-mb-3v fr-mt-8v  fr-text--lg">
              Retrouvez via cet outil des données à jour, à l’échelle de votre
              département, concernant&nbsp;:
            </p>
            <ul>
              <li className="fr-mb-3v">
                Le déploiement des dispositifs d’inclusion numérique portés par
                le programme{' '}
                <a
                  href="https://societenumerique.gouv.fr/"
                  title="Site internet du programme Société Numérique de l'ANCT"
                  target="_blank"
                >
                  Société Numérique de l’ANCT
                </a>
                .
              </li>
              <li className="fr-mb-2v">
                Les données relatives aux lieux de médiation numérique tels que
                référencés sur la{' '}
                <a
                  href="https://cartographie.societenumerique.gouv.fr/cartographie"
                  title="Site internet de la cartographie nationale de la médiation numérique"
                  target="_blank"
                >
                  Cartographie Nationale
                </a>
                .
              </li>
              <li className="fr-mb-2v">
                Des données statistiques territoriales révélatrices des{' '}
                <a
                  href="https://lamednum.coop/actions/indice-de-fragilite-numerique/"
                  title="Site internet de la Mednum - fragilité numérique"
                  target="_blank"
                >
                  fragilités numériques
                </a>{' '}
                des populations.
              </li>
            </ul>
            <Button
              linkProps={{ href: '/tableau-de-bord' }}
              className="fr-mt-8v"
            >
              Accéder au tableau de bord
            </Button>
          </div>
        </div>
      </section>
    </div>
    <div className="fr-py-20v fr-background-alt--blue-france ">
      <section className={classNames('fr-container', styles.section)}>
        <div className="fr-grid-row">
          <div
            className={classNames(
              'fr-col-12 fr-col-md-5 fr-col-offset-md-1--right',
              styles.homeImageContainer,
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home-collectivites.svg"
              alt=""
              className={styles.homeImage}
            />
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <h2 className="fr-mt-8v fr-mt-md-0">
              Participer à l’élaboration des feuilles de routes territoriales
            </h2>

            <p className="fr-mb-2v fr-mt-8v fr-text--lg">
              <strong>En tant que collectivité ou acteur territorial</strong>,
              vous êtes invité à manifester votre souhait de participer à
              l’élaboration des feuilles de route France Numérique Ensemble sur
              votre territoire. En tant que Conseil Régional, Conseil
              Département ou EPCI, vous pouvez également porter une feuille de
              route.
            </p>
            <Button linkProps={{ href: '/gouvernance' }} className="fr-mt-8v">
              Accéder au formulaire
            </Button>
          </div>
        </div>
      </section>
    </div>
    <div className="fr-py-20v">
      <section className={classNames('fr-container', styles.section)}>
        <div className="fr-grid-row">
          <div className={classNames('fr-col-12', styles.homeCardsContainer)}>
            <h2>Quand et comment utiliser cet outil&nbsp;?</h2>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.roundNumber}>1</span>
                <h3>D’ici au 30 septembre 2023</h3>
              </div>
              <hr />
              <h6>
                <span
                  className={classNames(
                    'fr-icon-government-line',
                    styles.cardSubtitleIcon,
                  )}
                />
                Pour les services préfectoraux
              </h6>
              <p>
                Prenez connaissance des communes les plus exposées à des
                situations de vulnérabilités numériques de leurs population et
                la couverture existante en matière d’aide et de médiation
                numérique.
                <br />-<br />
                Invitez les collectivités locales et leurs groupements à
                s’impliquer dans l’élaboration des feuilles de route France
                Numérique Ensemble via le formulaire en ligne.
              </p>
              <h6>
                <span
                  className={classNames(
                    'fr-icon-map-pin-user-line',
                    styles.cardSubtitleIcon,
                  )}
                />
                Pour les collectivités & acteurs territoriaux
              </h6>
              <p>
                Remplissez le formulaire en ligne pour signaler votre souhait
                d’être associé à l’élaboration et au portage d’une feuille de
                route territoriale France Numérique Ensemble, en mobilisant
                largement vos partenaires envisagés.
              </p>
              <Button linkProps={{ href: '/gouvernance' }} className="fr-mt-8v">
                Accéder au formulaire
              </Button>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.roundNumber}>2</span>
                <h3>Entre octobre et décembre 2023</h3>
              </div>
              <hr />
              <h6>
                <span
                  className={classNames(
                    'fr-icon-government-line',
                    styles.cardSubtitleIcon,
                  )}
                />
                Pour les services préfectoraux
              </h6>
              <p>
                Enrichi au fil de l’eau, le diagnostic territorial peut être
                partagé avec les acteurs locaux et discuté dans le cadre des
                différentes réunions locales partenariales.
              </p>
              <h6>
                <span
                  className={classNames(
                    'fr-icon-map-pin-user-line',
                    styles.cardSubtitleIcon,
                  )}
                />
                Pour les collectivités & acteurs territoriaux
              </h6>
              <p>
                Mobilisez-vous dans le cadre des concertations locales afin
                d’affiner le diagnostic quantitatif et de définir, aux côtés des
                services préfectoraux, le périmètre de gouvernance le plus
                adapté à votre territoire.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.roundNumber}>3</span>
                <h3>À partir de janvier 2024</h3>
              </div>
              <hr />
              <h6>
                Pour les services préfectoraux, les collectivités & acteurs
                territoriaux
              </h6>
              <p>
                Le diagnostic territorial doit vous permettre de fixer,
                collectivement les valeurs cibles des différents indicateurs
                locaux France Numérique Ensemble.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
)

export default HomePage
