import React from 'react'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import EmptyValue from '@app/ui/components/EmptyValue'
import { ListeGouvernanceItem } from '@app/web/app/(with-navigation)/gouvernances/getListeGouvernances'
import WhiteCard from '@app/web/ui/WhiteCard'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import styles from '@app/web/app/(with-navigation)/gouvernances/Gouvernances.module.css'
import type { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'
import { nameOrEmail } from '@app/web/utils/nameOrEmail'
import {
  getPerimetreString,
  getPorteurString,
} from '@app/web/app/(with-navigation)/gouvernances/gouvernanceHelpers'
import GouvernanceCardCtas from '@app/web/app/(with-navigation)/gouvernances/GouvernanceCardCtas'

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
    creation,
    modification,
    createur,
    derniereModificationPar,
    organisationsRecruteusesCoordinateurs,
    noteDeContexte,
    departement,
    v2Enregistree,
  } = gouvernance

  const isGouvernanceFinale = !!v2Enregistree

  const porteurString = getPorteurString(gouvernance)
  const perimetreString = getPerimetreString(gouvernance)
  const creationMeta = `${dateAsDay(creation)} par ${nameOrEmail(createur)}`
  const modificationMeta = `${dateAsDay(modification)} par ${nameOrEmail(
    derniereModificationPar,
  )}`
  const displayModificationMeta = modificationMeta !== creationMeta

  // Prefix by departement info if viewing this card from a higher scope than departement
  const titlePrefix = scope.codeDepartement
    ? ''
    : `${departement.nom} (${departement.code}) · `

  const titleMid = isGouvernanceFinale
    ? 'Gouvernance'
    : 'Gouvernance pressentie'
  const titleSuffix = titleIndex ? ` ${titleIndex}` : ''
  const title = `${titlePrefix}${titleMid}${titleSuffix}`

  return (
    <WhiteCard className="fr-mt-6v">
      {!isGouvernanceFinale && (
        <div className="fr-flex fr-align-items-center fr-justify-content-space-between fr-flex-gap-2v fr-flex-wrap">
          <div>
            <div className="fr-flex fr-align-items-center">
              <h5 className="fr-mb-0">{title}</h5>
            </div>
            <p className="fr-mb-0 fr-mt-2v fr-text--sm">
              Déposée le {creationMeta}
              {displayModificationMeta && ` · Modifiée le ${modificationMeta}`}
            </p>
          </div>
        </div>
      )}
      {!isGouvernanceFinale && (
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
          firstCtaClassName={isGouvernanceFinale ? undefined : 'fr-mt-8v'}
          gouvernance={gouvernance}
          canEdit={canEdit}
        />
      )}
    </WhiteCard>
  )
}

export default GouvernanceCard
