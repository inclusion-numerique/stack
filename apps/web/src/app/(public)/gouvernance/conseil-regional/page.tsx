import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { gouvernancePersonas } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import GouvernancePersonaSignup from '@app/web/app/(public)/gouvernance/GouvernancePersonaSignup'

const ConseilRegionalGouvernanceSignupPage = () => (
  <div className="fr-container">
    <Breadcrumbs currentPage={gouvernancePersonas.conseilRegional.title} />
    <GouvernancePersonaSignup
      gouvernance={gouvernancePersonas.conseilRegional}
    />
  </div>
)

export default ConseilRegionalGouvernanceSignupPage
