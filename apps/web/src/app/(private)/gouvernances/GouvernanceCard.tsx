import React from 'react'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import Button from '@codegouvfr/react-dsfr/Button'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { ListeGouvernanceItem } from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import WhiteCard from '@app/web/ui/WhiteCard'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import styles from '@app/web/app/(private)/gouvernances/Gouvernances.module.css'
import { limiteModificationDesGouvernancesPressenties } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance-pressentie/gouvernancePressentieMetadata'
import {
  GouvernanceScope,
  imprimerGouvernancePressentiePath,
  modifierGouvernancePressentiePath,
} from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import GouvernanceDeleteButton from '@app/web/app/(private)/gouvernances/GouvernanceDeleteButton'
import { nameOrEmail } from '@app/web/utils/nameOrEmail'
import {
  getPerimetreString,
  getPorteurString,
} from '@app/web/app/(private)/gouvernances/gouvernanceHelpers'

const GouvernanceCard = ({
  gouvernance,
  canEdit,
  scope,
}: {
  gouvernance: ListeGouvernanceItem
  canEdit?: boolean
  scope: GouvernanceScope
}) => {
  const {
    id,
    creation,
    modification,
    createur,
    derniereModificationPar,
    organisationsRecruteusesCoordinateurs,
    noteDeContexte,
    departement,
  } = gouvernance

  const porteurString = getPorteurString(gouvernance)
  const perimetreString = getPerimetreString(gouvernance)
  const creationMeta = `${dateAsDay(creation)} par ${nameOrEmail(createur)}`
  const modificationMeta = `${dateAsDay(modification)} par ${nameOrEmail(
    derniereModificationPar,
  )}`
  const displayModificationMeta = modificationMeta !== creationMeta

  return (
    <WhiteCard className="fr-mt-6v">
      <div className="fr-flex fr-align-items-start fr-justify-content-space-between fr-flex-gap-2v fr-flex-wrap">
        <div>
          <Badge severity="info" className="fr-mb-2v">
            Proposition modifiable jusqu’au{' '}
            {dateAsDay(limiteModificationDesGouvernancesPressenties)}
          </Badge>
          <h5 className="fr-mb-2v">Gouvernance pressentie</h5>
          <p className="fr-mb-0 fr-text--sm">
            Déposée le {creationMeta}
            {displayModificationMeta && ` · Modifiée le ${modificationMeta}`}
          </p>
        </div>
        <div className="fr-flex fr-flex-shrink-0 fr-flex-nowrap fr-flex-gap-2v">
          <Button
            priority="secondary"
            iconId="fr-icon-printer-line"
            linkProps={{
              href: imprimerGouvernancePressentiePath(scope, id),
            }}
          >
            Imprimer
          </Button>
          {canEdit && (
            <>
              <Button
                priority="secondary"
                iconId="fr-icon-edit-line"
                linkProps={{
                  href: modifierGouvernancePressentiePath(scope, id),
                }}
              >
                Modifier
              </Button>
              <GouvernanceDeleteButton gouvernanceId={id} />
            </>
          )}
        </div>
      </div>
      {/* Display departement if viewing this card from a higher scope than departement */}
      {!scope.codeDepartement && (
        <InfoLabelValue
          label="Département"
          value={`${departement.nom} (${departement.code})`}
          labelClassName="fr-mt-6v"
        />
      )}
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
      <Accordion label="Note de contexte" className="fr-mt-6v">
        <div
          dangerouslySetInnerHTML={{
            __html: noteDeContexte,
          }}
          className={styles.noteDeContexteContainer}
        />
      </Accordion>
    </WhiteCard>
  )
}

export default GouvernanceCard
