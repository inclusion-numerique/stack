import classNames from 'classnames'
import React from 'react'
import {
  BesoinsIngenierieFinanciereForForm,
  GouvernanceForForm,
} from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import {
  getPerimetreString,
  getPorteurString,
} from '@app/web/app/(private)/gouvernances/gouvernanceHelpers'
import BackLink from '@app/web/components/BackLink'
import {
  gouvernanceHomePath,
  GouvernanceScope,
} from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import PrintButton from '@app/web/app/(private-print)/PrintButton'
import WhiteCard from '@app/web/ui/WhiteCard'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { nameOrEmail } from '@app/web/utils/nameOrEmail'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import styles from '@app/web/app/(private)/gouvernances/Gouvernances.module.css'
import WorkInProgressNotice from '@app/web/components/WorkInProgressNotice'
import BesoinCardContent from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/BesoinCardContent'
import { getPriorisationCardInfos } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/getPriorisationCardInfos'
import { getBesoinsEnIngenieriePriorisationDefaultValues } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/besoinsEnIngenieriePriorisationDefaultValues'
import GouvernancePressentieDetails from '@app/web/app/(private)/gouvernances/GouvernancePressentieDetails'

const GouvernanceDetails = ({
  gouvernance,
  besoins,
  scope,
}: {
  gouvernance: GouvernanceForForm
  besoins: BesoinsIngenierieFinanciereForForm | null
  scope: GouvernanceScope
}) => {
  const {
    createur,
    creation,
    modification,
    derniereModificationPar,
    organisationsRecruteusesCoordinateurs,
    noteDeContexte,
    departement,
    v2Enregistree,
  } = gouvernance

  const porteurString = getPorteurString(gouvernance)
  const perimetreString = getPerimetreString(gouvernance)

  const besoinCardInfos = besoins
    ? getPriorisationCardInfos({
        defaultValue: getBesoinsEnIngenieriePriorisationDefaultValues({
          ...gouvernance,
          besoinsEnIngenierieFinanciere: besoins,
        }),
        besoinsEnIngenierieFinanciere: besoins,
      })
    : []

  if (!v2Enregistree && !besoins) {
    return (
      <div className="fr-container fr-container--medium fr-py-10v fr-mb-30v ">
        <WorkInProgressNotice />

        <div className="fr-flex fr-align-items-center fr-justify-content-space-between fr-hidden-print">
          <BackLink href={gouvernanceHomePath(scope)} />

          <PrintButton />
        </div>
        <GouvernancePressentieDetails gouvernance={gouvernance} scope={scope} />
      </div>
    )
  }

  return (
    <div className="fr-container fr-container--medium fr-py-10v fr-mb-30v ">
      <WorkInProgressNotice />

      <WhiteCard className="fr-mt-6v">
        <div className="fr-flex fr-align-items-start fr-justify-content-space-between fr-flex-gap-2v fr-flex-wrap">
          <div>
            <h4 className="fr-mb-2v">Gouvernance</h4>
            <p className="fr-mb-0 fr-text--sm">
              Déposée le {dateAsDay(creation)} par {nameOrEmail(createur)} ·
              Modifiée le {dateAsDay(modification)} par{' '}
              {nameOrEmail(derniereModificationPar)}
            </p>
          </div>
        </div>
        <InfoLabelValue
          label="Département"
          value={`${departement.nom} (${departement.code})`}
          labelClassName="fr-mt-6v"
        />
        <InfoLabelValue
          label="Périmètre de la gouvernance"
          value={perimetreString}
          labelClassName="fr-mt-6v"
        />
        <InfoLabelValue
          label="Porteur de la gouvernance"
          labelClassName="fr-mt-6v"
          value={porteurString}
        />
        <InfoLabelValue
          label="SIRET collectivité/structure recruteuse d’un coordinateur Conseillers Numériques"
          labelClassName="fr-mt-6v"
          value={
            <>
              {organisationsRecruteusesCoordinateurs.map(
                ({ siretInformations: { siret } }, index) => (
                  <span key={siret}>
                    {siret}
                    {index ===
                    organisationsRecruteusesCoordinateurs.length - 1 ? null : (
                      <br />
                    )}
                  </span>
                ),
              )}
            </>
          }
        />
        <p className="fr-text-mention--grey fr-mb-0 fr-mt-6v">
          Note de contexte
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: noteDeContexte,
          }}
          className={classNames(
            'fr-mb-0 fr-text--medium',
            styles.noteDeContexteContainer,
          )}
        />
      </WhiteCard>

      {!!besoins && (
        <>
          <h4>Besoins en ingénierie financière</h4>
          {besoinCardInfos.map((card, index) => (
            <WhiteCard
              key={card.prioriteKey}
              className={classNames('fr-p-6v fr-mt-4v', styles.card)}
            >
              <BesoinCardContent index={index} card={card} />
            </WhiteCard>
          ))}
        </>
      )}
    </div>
  )
}

export default GouvernanceDetails
