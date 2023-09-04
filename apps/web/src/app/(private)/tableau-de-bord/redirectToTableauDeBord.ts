import { redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasAccessToDepartementDashboard } from '@app/web/security/securityRules'

export const redirectToTableauDeBord = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/tableau-de-bord`)
    return
  }

  if (user.role === 'PrefectureRegion' && user.roleScope) {
    redirect(`/tableau-de-bord/region/${user.roleScope}`)
    return
  }

  if (user.role === 'PrefectureDepartement' && user.roleScope) {
    redirect(`/tableau-de-bord/departement/${user.roleScope}`)
    return
  }

  if (hasAccessToDepartementDashboard(user, { departementCode: '69' })) {
    // Demonstration
    redirect(`/tableau-de-bord/departement/69`)
    return
  }

  // Logged in but no access to any dashboard
  redirect('/profil')
}
