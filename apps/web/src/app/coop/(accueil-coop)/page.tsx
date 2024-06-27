import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'

const Page = async () => {
  const user = await getAuthenticatedSessionUser()

  return (
    <>
      <Breadcrumbs currentPage="Tableau de bord" />
      <h1 className="fr-text-title--blue-france">
        Bonjour {user.firstName || user.name || user.email} 👋
      </h1>
    </>
  )
}

export default Page
