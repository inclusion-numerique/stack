import { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'

const GouvernancePersonaCta = ({
  gouvernance,
}: {
  gouvernance: GouvernancePersona
}) => gouvernance.title
export default GouvernancePersonaCta
