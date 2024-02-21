import Accordion from '@codegouvfr/react-dsfr/Accordion'
import React from 'react'
import { CandidatsGouvernance } from '@app/web/app/(with-navigation)/gouvernances/getCandidatsGouvernances'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import ContactInfo from '@app/web/components/Gouvernance/ContactInfo'
import { formulaireGouvernancePersonaName } from '@app/web/app/(with-navigation)/gouvernances/formulaireGouvernancePersonaName'
import styles from '@app/web/app/(with-navigation)/gouvernances/Gouvernances.module.css'

export type Partenaire =
  | CandidatsGouvernance['porteurs'][number]['departementsParticipants'][number]
  | CandidatsGouvernance['porteurs'][number]['epcisParticipantes'][number]
  | CandidatsGouvernance['porteurs'][number]['communesParticipantes'][number]
  | CandidatsGouvernance['porteurs'][number]['structuresParticipantes'][number]

const PartenaireInfoAccordion = ({
  partenaire,
}: {
  partenaire: Partenaire
}) => {
  const label = formulaireGouvernancePersonaName(partenaire)

  const infoLabel =
    'nomStructure' in partenaire && !!partenaire.nomStructure
      ? 'Contact de la structure :'
      : 'Contact de la collectivité :'

  return (
    <Accordion label={label} className={styles.detailsAccordion}>
      <InfoLabelValue
        label={infoLabel}
        value={
          partenaire.contact ? (
            <ContactInfo contact={partenaire.contact} />
          ) : (
            <p className="fr-error-text">Aucun contact renseigné</p>
          )
        }
      />
    </Accordion>
  )
}

export default PartenaireInfoAccordion
