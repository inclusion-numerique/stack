import React, { useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { City } from '@app/web/types/City'
import { formatIfnScore } from '@app/web/components/Prefet/Cartographie/Layers/ifn'
import styles from './CityDetails.module.css'

const CityDetails = ({
  city: {
    nom,
    population,
    structuresCount,
    ifnTotal,
    ifnOlder65Rate,
    ifnNscol15pRate,
    ifnPovertyRate,
    ifnNo4gCoverageRate,
    ifnNoThdCoverageRate,
    aidants,
    conseillersNumeriques,
    habilitesAidantsConnect,
  },
  viewIndiceFN,
}: {
  city: City
  viewIndiceFN: boolean
}) => {
  // TODO Proper button element for click on title
  const [structuresDetailOpen, setStructuresDetailOpen] = useState(false)

  const [publicStructuresDetailOpen, setPublicStructuresDetailOpen] =
    useState(false)

  const onStructureDetailsClick = () => {
    setStructuresDetailOpen(!structuresDetailOpen)
  }

  const onPublicStructureDetailsClick = () => {
    setPublicStructuresDetailOpen(!publicStructuresDetailOpen)
  }

  return (
    <>
      <h6 className="fr-mt-1v">{nom}</h6>
      <p>Commune de {population} hab.</p>
      <p className="fr-hint-text">
        Source :{' '}
        <Link
          href="https://geo.api.gouv.fr/decoupage-administratif/communes"
          target="_blank"
        >
          geo.api.gouv.fr
        </Link>
      </p>
      <hr className="fr-mt-6v" />

      <button
        type="button"
        title={structuresDetailOpen ? 'Fermer le détail' : 'Ouvrir le détail'}
        onClick={onStructureDetailsClick}
        className={styles.collapseButton}
      >
        <div className={styles.row}>
          <h6 className="fr-mt-1v">
            Lieux d&apos;Inclusion Numérique
            <span
              className={classNames(
                'fr-icon',
                structuresDetailOpen
                  ? 'fr-icon-arrow-up-s-line'
                  : 'fr-icon-arrow-down-s-line',
                styles.collapseIcon,
              )}
            />
          </h6>
          <h6 className="fr-mt-1v">{structuresCount.total}</h6>
        </div>
      </button>
      {structuresDetailOpen && (
        <div className={styles.collapseSection}>
          <div className={styles.row}>
            <p className="fr-text--lg fr-mt-6v fr-text--bold fr-mb-3v">
              Typologie de structures
            </p>
          </div>
          <button
            type="button"
            title={
              publicStructuresDetailOpen
                ? 'Fermer le détail'
                : 'Ouvrir le détail'
            }
            onClick={onPublicStructureDetailsClick}
            className={styles.collapseButton}
          >
            <div className={classNames(styles.row, 'fr-mb-1v')}>
              <p className="fr-text--sm">
                <span className="fr-icon-government-fill fr-mr-1w fr-icon--sm" />{' '}
                Public
                <span
                  className={classNames(
                    'fr-icon fr-icon--sm',
                    publicStructuresDetailOpen
                      ? 'fr-icon-arrow-up-s-line'
                      : 'fr-icon-arrow-down-s-line',
                    styles.collapseIcon,
                  )}
                />
              </p>
              <p className=" fr-text--bold">
                {structuresCount.typologie.publique}
              </p>
            </div>
          </button>

          {publicStructuresDetailOpen && (
            <div className="fr-pl-5w">
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">Commune</p>
                <p className="fr-text--sm">
                  {structuresCount.typologie.commune}
                </p>
              </div>
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">EPCI</p>
                <p className="fr-text--sm">{structuresCount.typologie.epci}</p>
              </div>
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">Département</p>
                <p className="fr-text--sm">
                  {structuresCount.typologie.departement}
                </p>
              </div>
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">Autre</p>
                <p className="fr-text--sm">{structuresCount.typologie.autre}</p>
              </div>
            </div>
          )}

          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              <span className="fr-icon-team-fill fr-mr-1w fr-icon--sm" />{' '}
              Associations
            </p>
            <p className=" fr-text--bold">
              {structuresCount.typologie.association}
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              <span className="fr-icon-building-fill fr-mr-1w fr-icon--sm" />{' '}
              Autre acteurs privés
            </p>
            <p className=" fr-text--bold">{structuresCount.typologie.privee}</p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              <span className="fr-icon-map-pin-2-fill fr-mr-1w fr-icon--sm" />{' '}
              Non défini
            </p>
            <p className=" fr-text--bold">
              {structuresCount.typologie.nonDefini}
            </p>
          </div>
          <div className={styles.row}>
            <p className="fr-text--lg fr-mt-6v fr-text--bold fr-mb-3v">
              Labels
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              Structures accueillant un Conseiller Numérique
            </p>
            <p className=" fr-text--bold">
              {structuresCount.labels.conseillerNumerique}
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              Structures labellisées France Services
            </p>
            <p className=" fr-text--bold">
              {structuresCount.labels.franceServices}
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">Structures habilitées Aidants Connect</p>
            <p className=" fr-text--bold">
              {structuresCount.labels.aidantConnect}
            </p>
          </div>
          <div className={styles.row}>
            <p className="fr-text--lg fr-mt-6v fr-text--bold fr-mb-3v">
              Territoires prioritaires
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              Structures en quartier prioritaire de la ville (QPV)
            </p>
            <p className=" fr-text--bold">
              {structuresCount.territoiresPrioritaires.qpv}
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              Structures en zone de revitalisation rurale (ZRR)
            </p>
            <p className=" fr-text--bold">
              {structuresCount.territoiresPrioritaires.zrr}
            </p>
          </div>
        </div>
      )}

      {viewIndiceFN && (
        <>
          <hr className="fr-mt-6v" />
          <div className={styles.row}>
            <p className="fr-text--lg fr-text--bold fr-mb-3v">
              Indicateurs de fragilité numérique
            </p>
            <p className="fr-text--lg fr-text--bold fr-mb-3v">
              {formatIfnScore(ifnTotal)}
            </p>
          </div>
          {ifnTotal === null ? (
            <p className="fr-text--sm">Indisponible</p>
          ) : (
            <>
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">
                  Taux de non-couverture Très-Haut-Débit
                </p>
                <p className=" fr-text--bold">
                  {formatIfnScore(ifnNoThdCoverageRate)}
                </p>
              </div>
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">Taux de non-couverture 4G</p>
                <p className=" fr-text--bold">
                  {formatIfnScore(ifnNo4gCoverageRate)}
                </p>
              </div>
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">Part des 65 ans et plus</p>
                <p className=" fr-text--bold">
                  {formatIfnScore(ifnOlder65Rate)}
                </p>
              </div>
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">Part des pas ou peu diplômés</p>
                <p className=" fr-text--bold">
                  {formatIfnScore(ifnNscol15pRate)}
                </p>
              </div>
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">Taux de pauvreté</p>
                <p className=" fr-text--bold">
                  {formatIfnScore(ifnPovertyRate)}
                </p>
              </div>
            </>
          )}
        </>
      )}
      <hr className="fr-mt-6v" />
      <div className={styles.row}>
        <p className="fr-text--lg fr-text--bold fr-mb-3v">
          Aidants Numériques identifiés
        </p>
        <p className="fr-text--lg fr-text--bold fr-mb-3v">{aidants}</p>
      </div>
      <div className={classNames(styles.row, 'fr-mb-1v')}>
        <p className="fr-text--sm">Conseillers Numériques</p>
        <p className=" fr-text--bold">{conseillersNumeriques}</p>
      </div>
      <div className={classNames(styles.row, 'fr-mb-1v')}>
        <p className="fr-text--sm">Aidants habilités à Aidants Connect</p>
        <p className=" fr-text--bold">{habilitesAidantsConnect}</p>
      </div>
    </>
  )
}

export default CityDetails
