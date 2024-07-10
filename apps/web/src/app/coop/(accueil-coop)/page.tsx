import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'

const Page = async () => {
  const user = await getAuthenticatedSessionUser()

  return (
    <CoopPageContainer size={944}>
      <h1 className="fr-text-title--blue-france fr-mt-10v">
        Bonjour {user.firstName || user.name || user.email} 👋
      </h1>
    </CoopPageContainer>
  )
}

export default Page
