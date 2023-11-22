import React from 'react'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import Button from '@codegouvfr/react-dsfr/Button'
import EmptyValue from '@app/ui/components/EmptyValue'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { ListeGouvernanceItem } from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import WhiteCard from '@app/web/ui/WhiteCard'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import styles from '@app/web/app/(private)/gouvernances/Gouvernances.module.css'
import {
  detailGouvernancePath,
  GouvernanceScope,
  imprimerGouvernancePath,
} from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { nameOrEmail } from '@app/web/utils/nameOrEmail'
import {
  getPerimetreString,
  getPorteurString,
} from '@app/web/app/(private)/gouvernances/gouvernanceHelpers'
import GouvernanceCardCtas from '@app/web/app/(private)/gouvernances/GouvernanceCardCtas'
import { limiteModificationDesGouvernances } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceMetadata'

const GouvernanceCard = ({
  gouvernance,
  canEdit,
  showCtas,
  scope,
  titleIndex,
}: {
  gouvernance: ListeGouvernanceItem
  canEdit?: boolean
  showCtas?: boolean
  scope: GouvernanceScope
  titleIndex?: string
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
    besoinsEnIngenierieFinanciere,
  } = gouvernance

  const isV2 = !!v2Enregistree

  const porteurString = getPorteurString(gouvernance)
  const perimetreString = getPerimetreString(gouvernance)
  const creationMeta = `${dateAsDay(creation)} par ${nameOrEmail(createur)}`
  const modificationMeta = `${dateAsDay(modification)} par ${nameOrEmail(
    derniereModificationPar,
  )}`
  const displayModificationMeta = modificationMeta !== creationMeta
  const hasCompletedBesoins =
    !!besoinsEnIngenierieFinanciere?.priorisationEnregistree

  return (
    <WhiteCard className="fr-mt-6v">
      <div className="fr-flex fr-align-items-center fr-justify-content-space-between fr-flex-gap-2v fr-flex-wrap">
        <div>
          <h5 className="fr-mb-0">
            {!scope.codeDepartement &&
              `${departement.nom} (${departement.code}) · `}
            {v2Enregistree
              ? 'Proposition de gouvernance'
              : 'Gouvernance pressentie'}
            {titleIndex && ` ${titleIndex}`}
            {/* Display departement if viewing this card from a higher scope than departement */}
          </h5>
          {!v2Enregistree && (
            <p className="fr-mb-0 fr-mt-2v fr-text--sm">
              Déposée le {creationMeta}
              {displayModificationMeta && ` · Modifiée le ${modificationMeta}`}
            </p>
          )}
          {v2Enregistree && (
            <Badge className="fr-mt-2v" severity="info" small>
              Modifiable jusqu’au {dateAsDay(limiteModificationDesGouvernances)}
            </Badge>
          )}
        </div>
        <div className="fr-flex fr-flex-shrink-0 fr-flex-nowrap fr-flex-gap-2v">
          {isV2 ? (
            <Button
              priority={hasCompletedBesoins ? 'primary' : 'secondary'}
              iconId="fr-icon-eye-line"
              iconPosition="right"
              linkProps={{
                href: detailGouvernancePath(scope, id),
              }}
            >
              Voir le détail
            </Button>
          ) : (
            <Button
              priority="secondary"
              iconId="fr-icon-download-line"
              iconPosition="right"
              linkProps={{
                href: imprimerGouvernancePath(scope, id),
              }}
            >
              Télécharger en PDF
            </Button>
          )}
        </div>
      </div>
      {isV2 && <hr className="fr-width-full fr-separator-8v" />}
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
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <>
                {organisationsRecruteusesCoordinateurs.length > 0 ? (
                  organisationsRecruteusesCoordinateurs.map(
                    ({ siretInformations: { siret, nom } }, index) => (
                      <span key={siret}>
                        {nom || siret}
                        {index ===
                        organisationsRecruteusesCoordinateurs.length -
                          1 ? null : (
                          <br />
                        )}
                      </span>
                    ),
                  )
                ) : (
                  <EmptyValue />
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
        <GouvernanceCardCtas
          firstCtaClassName="fr-mt-8v"
          gouvernance={gouvernance}
          canEdit={canEdit}
        />
      )}
    </WhiteCard>
  )
}

export default GouvernanceCard
