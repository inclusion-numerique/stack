import { redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasAccessToDepartementDashboard } from '@app/web/security/securityRules'

export const generateMetadata = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/prefet`)
    return
  }

  if (user.role === 'Prefect' && user.roleScope) {
    redirect(`/prefet/${user.roleScope}`)
    return
  }

  if (hasAccessToDepartementDashboard(user, '69')) {
    redirect(`/prefet/69`)
    return
  }

  redirect('/profil')
}

const Page = () => null

export default Page
