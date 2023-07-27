import { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'

const GouvernancePersonaSignup = ({
  gouvernance,
}: {
  gouvernance: GouvernancePersona
}) => <h1>{gouvernance.title}</h1>
export default GouvernancePersonaSignup
