import React from 'react'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import Button from '@codegouvfr/react-dsfr/Button'
import { ListeGouvernanceItem } from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import WhiteCard from '@app/web/ui/WhiteCard'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import styles from '@app/web/app/(private)/gouvernances/Gouvernances.module.css'
import {
  GouvernanceScope,
  imprimerGouvernancePath,
  modifierGouvernancePath,
} from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import GouvernanceDeleteButton from '@app/web/app/(private)/gouvernances/GouvernanceDeleteButton'
import { nameOrEmail } from '@app/web/utils/nameOrEmail'
import {
  getPerimetreString,
  getPorteurString,
} from '@app/web/app/(private)/gouvernances/gouvernanceHelpers'
import GouvernanceCardCtas from '@app/web/app/(private)/gouvernances/GouvernanceCardCtas'

const GouvernanceCard = ({
  gouvernance,
  canEdit,
  showCtas,
  scope,
}: {
  gouvernance: ListeGouvernanceItem
  canEdit?: boolean
  showCtas?: boolean
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
    v2Enregistree,
  } = gouvernance

  const isV2 = !!v2Enregistree

  const porteurString = getPorteurString(gouvernance)
  const perimetreString = getPerimetreString(gouvernance)
  const creationMeta = `${dateAsDay(creation)} par ${nameOrEmail(createur)}`
  const modificationMeta = `${dateAsDay(modification)} par ${nameOrEmail(
    derniereModificationPar,
  )}`
  const displayModificationMeta = modificationMeta !== creationMeta

  const showEditButton = canEdit && isV2

  return (
    <WhiteCard className="fr-mt-6v">
      <div className="fr-flex fr-align-items-start fr-justify-content-space-between fr-flex-gap-2v fr-flex-wrap">
        <div>
          <h5 className="fr-mb-2v">
            {v2Enregistree
              ? 'Proposition de gouvernance'
              : 'Gouvernance pressentie'}
            {/* Display departement if viewing this card from a higher scope than departement */}
            {!scope.codeDepartement &&
              ` · ${departement.nom} (${departement.code})`}
          </h5>
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
              href: imprimerGouvernancePath(scope, id),
            }}
          >
            Imprimer
          </Button>
          {showEditButton && (
            <>
              <Button
                priority="secondary"
                iconId="fr-icon-edit-line"
                linkProps={{
                  href: modifierGouvernancePath(scope, id),
                }}
              >
                Modifier
              </Button>
              <GouvernanceDeleteButton gouvernanceId={id} />
            </>
          )}
        </div>
      </div>
      {!v2Enregistree && (
        <>
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
                      organisationsRecruteusesCoordinateurs.length -
                        1 ? null : (
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
        </>
      )}
      {showCtas && (
        <GouvernanceCardCtas gouvernance={gouvernance} canEdit={canEdit} />
      )}
    </WhiteCard>
  )
}

export default GouvernanceCard
