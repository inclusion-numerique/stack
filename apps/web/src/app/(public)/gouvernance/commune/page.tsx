import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { gouvernancePersonas } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import GouvernancePersonaSignup from '@app/web/app/(public)/gouvernance/GouvernancePersonaSignup'

const CommuneGouvernanceSignupPage = () => (
  <div className="fr-container">
    <Breadcrumbs currentPage={gouvernancePersonas.commune.title} />
    <GouvernancePersonaSignup gouvernance={gouvernancePersonas.commune} />
  </div>
)

export default CommuneGouvernanceSignupPage
