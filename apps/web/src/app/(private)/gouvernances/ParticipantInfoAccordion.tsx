import { CandidatsGouvernance } from '@app/web/app/(private)/gouvernances/getCandidatsGouvernances'

export type Participant =
  | CandidatsGouvernance['souhaitentParticiper']['collectivites'][number]
  | CandidatsGouvernance['souhaitentParticiper']['structures'][number]

const ParticipantInfoAccordion = ({
  participant,
}: {
  participant: Participant
}) => <h1>TODO</h1>

export default ParticipantInfoAccordion
