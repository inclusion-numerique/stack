import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import { getDonneesRouteForUser } from '@app/web/data/getDonneesRouteForUser'
import { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'

const AccederAuxDonneesButton = ({
  user,
  lastVisitedScope,
}: {
  user: SessionUser | null
  lastVisitedScope: GouvernanceScope | null
}) => (
  <Button
    className="fr-mt-8v"
    data-testid="tableau-de-bord-cta"
    linkProps={{
      href: getDonneesRouteForUser(user, lastVisitedScope),
    }}
  >
    Accéder aux données
  </Button>
)

export default AccederAuxDonneesButton
