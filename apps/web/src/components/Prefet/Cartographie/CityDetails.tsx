import React, { useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { DepartementCartographieDataCommune } from '@app/web/app/(cartographie)/tableau-de-bord/departement/[codeDepartement]/cartographie/getDepartementCartographieData'
import { formatIfnScore } from '@app/web/data/ifnData'
import { numberToString } from '@app/web/utils/formatNumber'
import InfoButton from '@app/web/components/InfoButton'
import { TerritoiresPrioritairesInformationModal } from '@app/web/components/Prefet/TerritoiresPrioritairesInformationModal'
import styles from './CityDetails.module.css'

const CityDetails = ({
  commune: { nom, population, count, ifn, codesPostaux, code },
}: {
  commune: DepartementCartographieDataCommune
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
      <h6 data-testid="city-details-title" className="fr-mt-1v">
        {nom}
      </h6>
      <p className="fr-mb-1v">Commune de {population} hab.</p>
      <p className="fr-hint-text fr-mb-0">
        {codesPostaux.length === 1 ? `Code postal` : `Code postaux`} :
        {codesPostaux.join(', ')} - INSEE : {code}
      </p>
      <p className="fr-hint-text">
        Source&nbsp;:{' '}
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
            Lieux d’inclusion numérique
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
          <h6 className="fr-mt-1v">{count.structures.total}</h6>
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
                {numberToString(count.structures.type.publique)}
              </p>
            </div>
          </button>

          {publicStructuresDetailOpen && (
            <div className="fr-pl-7v">
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">Commune</p>
                <p className="fr-text--sm">
                  {numberToString(count.structures.sousTypePublic.commune)}
                </p>
              </div>
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">EPCI</p>
                <p className="fr-text--sm">
                  {count.structures.sousTypePublic.epci}
                </p>
              </div>
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">Département</p>
                <p className="fr-text--sm">
                  {numberToString(count.structures.sousTypePublic.departement)}
                </p>
              </div>
              <div className={classNames(styles.row, 'fr-mb-1v')}>
                <p className="fr-text--sm">Autre</p>
                <p className="fr-text--sm">
                  {numberToString(count.structures.sousTypePublic.autre)}
                </p>
              </div>
            </div>
          )}

          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              <span className="fr-icon-team-fill fr-mr-1w fr-icon--sm" />{' '}
              Associations
            </p>
            <p className=" fr-text--bold">
              {numberToString(count.structures.type.association)}
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              <span className="fr-icon-building-fill fr-mr-1w fr-icon--sm" />{' '}
              Autre acteurs privés
            </p>
            <p className=" fr-text--bold">
              {numberToString(count.structures.type.privee)}
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              <span className="fr-icon-map-pin-2-fill fr-mr-1w fr-icon--sm" />{' '}
              Non défini
            </p>
            <p className=" fr-text--bold">
              {numberToString(count.structures.type.nonDefini)}
            </p>
          </div>
          <div className={styles.row}>
            <p className="fr-text--lg fr-mt-6v fr-text--bold fr-mb-3v">
              Labels
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              Lieux accueillant des conseillers numérique
            </p>
            <p className=" fr-text--bold">
              {numberToString(count.structures.label.conseillerNumerique)}
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              Points d’accueil numérique labellisés France Services
            </p>
            <p className=" fr-text--bold">
              {numberToString(count.structures.label.franceServices)}
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              Points d’accueil habilités Aidants Connect
            </p>
            <p className=" fr-text--bold">
              {numberToString(count.structures.label.aidantsConnect)}
            </p>
          </div>
          <div className={styles.row}>
            <p className="fr-text--lg fr-mt-6v fr-text--bold fr-mb-3v">
              Territoires prioritaires{' '}
              <InfoButton
                iconId="fr-icon-information-line"
                title="Informations sur les territoires prioritaires"
                onClick={TerritoiresPrioritairesInformationModal.open}
              />
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              Structures en quartier prioritaire de la ville (QPV)
            </p>
            <p className=" fr-text--bold">
              {numberToString(count.structures.territoire.qpv)}
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              Structures en zone de revitalisation rurale (ZRR)
            </p>
            <p className=" fr-text--bold">
              {numberToString(count.structures.territoire.zrr)}
            </p>
          </div>
        </div>
      )}

      <hr className="fr-mt-6v" />
      <div className={styles.row}>
        <p className="fr-text--lg fr-text--bold fr-mb-3v">
          Indicateurs de fragilité numérique
        </p>
        <p className="fr-text--lg fr-text--bold fr-mb-3v">
          {ifn?.total ? formatIfnScore(ifn.total) : 'Non disponible'}
        </p>
      </div>
      {ifn === null ? (
        <p className="fr-text--sm">Indisponible</p>
      ) : (
        <>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">
              Taux de non-couverture Très-Haut-Débit
            </p>
            <p className=" fr-text--bold">
              {formatIfnScore(ifn.noThdCoverageRate)}
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">Taux de non-couverture 4G</p>
            <p className=" fr-text--bold">
              {formatIfnScore(ifn.no4gCoverageRate)}
            </p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">Part des 65 ans et plus</p>
            <p className=" fr-text--bold">{formatIfnScore(ifn.older65Rate)}</p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">Part des pas ou peu diplômés</p>
            <p className=" fr-text--bold">{formatIfnScore(ifn.nscol15pRate)}</p>
          </div>
          <div className={classNames(styles.row, 'fr-mb-1v')}>
            <p className="fr-text--sm">Taux de pauvreté</p>
            <p className=" fr-text--bold">{formatIfnScore(ifn.povertyRate)}</p>
          </div>
        </>
      )}
      <hr className="fr-mt-6v" />
      <div className={styles.row}>
        <p className="fr-text--lg fr-text--bold fr-mb-3v">
          Aidants numériques identifiés
        </p>
        <p className="fr-text--lg fr-text--bold fr-mb-3v">
          {numberToString(count.aidantsConnect + count.conseillersNumeriques)}
        </p>
      </div>
      <div className={classNames(styles.row, 'fr-mb-1v')}>
        <p className="fr-text--sm">Conseillers Numériques</p>
        <p className=" fr-text--bold">
          {numberToString(count.conseillersNumeriques)}
        </p>
      </div>
      <div className={classNames(styles.row, 'fr-mb-1v')}>
        <p className="fr-text--sm">Aidants habilités à Aidants Connect</p>
        <p className=" fr-text--bold">{numberToString(count.aidantsConnect)}</p>
      </div>
    </>
  )
}

export default CityDetails
