import Notice from '@codegouvfr/react-dsfr/Notice'
import classNames from 'classnames'
import React from 'react'
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
import { GouvernancePressentieForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance-pressentie/getGouvernancePressentieForForm'

const GouvernancePrint = ({
  gouvernance,
  scope,
}: {
  gouvernance: GouvernancePressentieForForm
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
  } = gouvernance

  const porteurString = getPorteurString(gouvernance)
  const perimetreString = getPerimetreString(gouvernance)

  return (
    <div className="fr-container fr-container--medium fr-py-10v ">
      <Notice
        className="fr-hidden-print fr-mb-6v"
        title={
          <>
            Pour télécharger cette page au format .pdf, cliquez sur Imprimer,
            puis à la ligne <strong>Destination</strong> (sur Chrome) ou{' '}
            <strong>Nom de l’imprimante</strong> (sur Firefox), choisissez{' '}
            <strong>Enregistrer au format PDF</strong>
          </>
        }
      />

      <div className="fr-flex fr-align-items-center fr-justify-content-space-between fr-hidden-print">
        <BackLink href={gouvernanceHomePath(scope)} />

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
          label="Recrutement coordinateur Conseillers Numériques"
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
    </div>
  )
}

export default GouvernancePrint
