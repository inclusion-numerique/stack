import React from 'react'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import Button from '@codegouvfr/react-dsfr/Button'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { ListeGouvernanceItem } from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import WhiteCard from '@app/web/ui/WhiteCard'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import { perimetreOptions } from '@app/web/gouvernance/GouvernancePressentie'
import styles from '@app/web/app/(private)/gouvernances/Gouvernances.module.css'
import { limiteModificationDesGouvernancesPressenties } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance-pressentie/gouvernancePressentieMetadata'

const nameOrEmail = ({ email, name }: { name: string | null; email: string }) =>
  name || email

const GouvernanceCard = ({
  gouvernance: {
    creation,
    modification,
    createur,
    derniereModificationPar,
    porteurRegion,
    porteurDepartement,
    porteurEpci,
    porteurSiretInformations,
    perimetre,
    organisationsRecruteusesCoordinateurs,
    noteDeContexte,
  },
  canEdit,
}: {
  gouvernance: ListeGouvernanceItem
  canEdit?: boolean
}) => {
  const porteurString = porteurRegion
    ? `Conseil régional  · ${porteurRegion.nom}`
    : porteurDepartement
    ? `Conseil départemental  · ${porteurDepartement.nom} (${porteurDepartement.code})`
    : porteurEpci
    ? porteurEpci.nom
    : porteurSiretInformations
    ? porteurSiretInformations.siret
    : 'Non renseigné'

  const perimetreString =
    perimetreOptions.find((option) => option.value === perimetre)?.name ||
    'Non renseigné'
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
            Déposée le {dateAsDay(creation)} par {nameOrEmail(createur)} ·
            Modifiée le {dateAsDay(modification)} par{' '}
            {nameOrEmail(derniereModificationPar)}
          </p>
        </div>
        <div className="fr-flex fr-flex-shrink-0 fr-flex-nowrap fr-flex-gap-2v">
          <Button type="button" size="small" priority="secondary">
            TODODOWNLOAD
          </Button>
          {canEdit && (
            <>
              <Button type="button" size="small" priority="secondary">
                TODOEDIT IF OK
              </Button>
              <Button type="button" size="small" priority="tertiary">
                TODODEL IF OK
              </Button>
            </>
          )}
        </div>
      </div>
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
