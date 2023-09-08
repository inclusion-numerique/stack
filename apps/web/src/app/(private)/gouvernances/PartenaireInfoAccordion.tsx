import Accordion from '@codegouvfr/react-dsfr/Accordion'
import React from 'react'
import { CandidatsGouvernance } from '@app/web/app/(private)/gouvernances/getCandidatsGouvernances'
import { communeNameWithCodePostaux } from '@app/web/data/communeNameWithCodePostaux'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import ContactInfo from '@app/web/components/Gouvernance/ContactInfo'

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
  const label =
    'departement' in partenaire
      ? `${partenaire.departement.nom} (${partenaire.departement.code})`
      : 'epci' in partenaire
      ? partenaire.epci.nom
      : 'commune' in partenaire
      ? communeNameWithCodePostaux(partenaire.commune)
      : 'nomStructure' in partenaire
      ? partenaire.nomStructure
      : ''

  const infoLabel =
    'nomStructure' in partenaire && !!partenaire.nomStructure
      ? 'Contact de la structure :'
      : 'Contact de la collectivité :'

  return partenaire.contact ? (
    <Accordion label={label}>
      <InfoLabelValue
        label={infoLabel}
        value={<ContactInfo contact={partenaire.contact} />}
      />
    </Accordion>
  ) : null
}

export default PartenaireInfoAccordion
