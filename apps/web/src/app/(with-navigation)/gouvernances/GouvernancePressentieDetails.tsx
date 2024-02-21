import classNames from 'classnames'
import React from 'react'
import { GouvernanceForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import {
  getPerimetreString,
  getPorteurString,
} from '@app/web/app/(with-navigation)/gouvernances/gouvernanceHelpers'
import PrintButton from '@app/web/app/(print)/PrintButton'
import WhiteCard from '@app/web/ui/WhiteCard'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { nameOrEmail } from '@app/web/utils/nameOrEmail'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import styles from '@app/web/app/(with-navigation)/gouvernances/Gouvernances.module.css'

const GouvernancePressentieDetails = ({
  gouvernance,
}: {
  gouvernance: GouvernanceForForm
}) => {
  const {
    createur,
    creation,
    modification,
    derniereModificationPar,
    organisationsRecruteusesCoordinateurs,
    noteDeContexte,
    departement,
  } = gouvernance

  const porteurString = getPorteurString(gouvernance)
  const perimetreString = getPerimetreString(gouvernance)

  return (
    <>
      <div className="fr-flex fr-align-items-center fr-justify-content-space-between fr-hidden-print">
        <PrintButton />
      </div>

      <WhiteCard className="fr-mt-6v">
        <div className="fr-flex fr-align-items-start fr-justify-content-space-between fr-flex-gap-2v fr-flex-wrap">
          <div>
            <h5 className="fr-mb-2v">Gouvernance pressentie</h5>
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
    </>
  )
}

export default GouvernancePressentieDetails
