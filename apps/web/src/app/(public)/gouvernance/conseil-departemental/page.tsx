import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { gouvernancePersonas } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import GouvernancePersonaSignup from '@app/web/app/(public)/gouvernance/GouvernancePersonaSignup'

const ConseilDepartementalGouvernanceSignupPage = () => (
  <div className="fr-container">
    <Breadcrumbs currentPage={gouvernancePersonas.conseilDepartemental.title} />
    <GouvernancePersonaSignup
      gouvernance={gouvernancePersonas.conseilDepartemental}
    />
  </div>
)

export default ConseilDepartementalGouvernanceSignupPage
