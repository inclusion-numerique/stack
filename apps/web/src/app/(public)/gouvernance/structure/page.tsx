import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { gouvernancePersonas } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import GouvernancePersonaSignup from '@app/web/app/(public)/gouvernance/GouvernancePersonaSignup'

const StructureGouvernanceSignupPage = () => (
  <div className="fr-container">
    <Breadcrumbs currentPage={gouvernancePersonas.structure.title} />
    <GouvernancePersonaSignup gouvernance={gouvernancePersonas.structure} />
  </div>
)

export default StructureGouvernanceSignupPage
