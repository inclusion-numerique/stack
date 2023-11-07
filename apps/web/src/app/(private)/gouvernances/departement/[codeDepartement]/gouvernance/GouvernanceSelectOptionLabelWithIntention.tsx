import Badge from '@codegouvfr/react-dsfr/Badge'
import type Prisma from '@prisma/client'

const GouvernanceSelectOptionLabelWithIntention = ({
  intention,
  label,
}: {
  label: string
  intention: Prisma.IntentionFormulaireGouvernance
}) => (
  <span className="fr-flex fr-width-full fr-justify-content-space-between fr-align-items-center">
    <span>{label}</span>
    <Badge
      small
      className={
        intention === 'Porter' ? 'fr-badge--yellow-tournesol' : 'fr-badge--info'
      }
    >
      {intention === 'Porter' ? 'Candidat porteur' : 'Souhaite participer'}
    </Badge>
  </span>
)

export const generateGouvernanceSelectOptionLabelWithIntention = ({
  intention,
  label,
}: {
  label: string
  intention: Prisma.IntentionFormulaireGouvernance
}) => (
  <GouvernanceSelectOptionLabelWithIntention
    label={label}
    intention={intention}
  />
)

export default GouvernanceSelectOptionLabelWithIntention
