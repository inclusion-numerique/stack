import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import { getDonneesRouteForUser } from '@app/web/app/(public)/donnees/getDonneesRouteForUser'

const AccederAuxDonneesButton = ({ user }: { user: SessionUser | null }) => (
  <Button
    className="fr-mt-8v"
    data-testid="tableau-de-bord-cta"
    linkProps={{
      href: getDonneesRouteForUser(user),
    }}
  >
    Accéder aux données
  </Button>
)

export default AccederAuxDonneesButton
