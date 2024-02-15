import { redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { hasAccessToDashboard } from '@app/web/security/securityRules'

export const redirectToGouvernance = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/gouvernances`)
    return
  }

  if (user.role === 'PrefectureRegion' && user.roleScope) {
    redirect(`/gouvernances/regions/${user.roleScope}`)
    return
  }

  if (user.role === 'PrefectureDepartement' && user.roleScope) {
    redirect(`/gouvernances/departements/${user.roleScope}`)
    return
  }

  if (hasAccessToDashboard(user, { departementCode: '69' })) {
    // Demonstration
    redirect(`/gouvernances/departements/69`)
    return
  }

  // Logged in but no access to any dashboard
  redirect('/profil')
}
