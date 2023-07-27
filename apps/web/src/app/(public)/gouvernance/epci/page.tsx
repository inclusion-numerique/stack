import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { gouvernancePersonas } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import GouvernancePersonaSignup from '@app/web/app/(public)/gouvernance/GouvernancePersonaSignup'

const EpciGouvernanceSignupPage = () => (
  <div className="fr-container">
    <Breadcrumbs currentPage={gouvernancePersonas.epci.title} />
    <GouvernancePersonaSignup gouvernance={gouvernancePersonas.epci} />
  </div>
)

export default EpciGouvernanceSignupPage
