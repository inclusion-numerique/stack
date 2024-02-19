import Accordion from '@codegouvfr/react-dsfr/Accordion'
import React from 'react'
import { CandidatsGouvernance } from '@app/web/app/(private-with-navigation)/gouvernances/getCandidatsGouvernances'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import ContactInfo from '@app/web/components/Gouvernance/ContactInfo'
import { formulaireGouvernancePersonaName } from '@app/web/app/(private-with-navigation)/gouvernances/formulaireGouvernancePersonaName'
import styles from '@app/web/app/(private-with-navigation)/gouvernances/Gouvernances.module.css'
import { dateAsDay } from '@app/web/utils/dateAsDay'

export type Participant =
  CandidatsGouvernance['souhaitentParticiper']['collectivites'][number]

const ParticipantInfoAccordion = ({
  participant,
}: {
  participant: Participant
}) => {
  const label = formulaireGouvernancePersonaName(participant)

  return (
    <Accordion
      label={
        <div className="fr-flex fr-width-full fr-align-items-center fr-justify-content-space-between">
          <span>{label}</span>
          <span className="fr-mx-4v fr-text-mention--grey">
            Déposée le {dateAsDay(participant.confirmeEtEnvoye)}
          </span>
        </div>
      }
      className={styles.detailsAccordion}
    >
      {participant.contactPolitique && (
        <InfoLabelValue
          label="Contact politique :"
          value={<ContactInfo contact={participant.contactPolitique} />}
        />
      )}
      {participant.contactTechnique && (
        <InfoLabelValue
          label="Contact technique :"
          value={<ContactInfo contact={participant.contactTechnique} />}
        />
      )}
      {participant.contactStructure && (
        <InfoLabelValue
          label="Contact structure :"
          value={<ContactInfo contact={participant.contactStructure} />}
        />
      )}
    </Accordion>
  )
}

export default ParticipantInfoAccordion
