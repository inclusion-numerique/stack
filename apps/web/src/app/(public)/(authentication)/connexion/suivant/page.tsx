import { redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'

/**
 * Cette page permet de rediriger l'utilisateur après une connexion réussie
 * si aucune redirection n'est spécifiée lors du signin.
 */
const Page = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect('/connexion')
  }

  if (user.role === 'Admin') {
    redirect('/administration')
  }

  redirect('/coop')

  return null
}

export default Page
