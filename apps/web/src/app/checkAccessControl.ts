import { notFound, redirect } from 'next/navigation'
import { SessionUser } from '@app/web/auth/sessionUser'
import { getSessionUser } from '@app/web/auth/getSessionUser'

export const checkAccessControl = async ({
  check,
  signinNextPath,
}: {
  check: (user: SessionUser | null) => boolean | Promise<boolean>
  signinNextPath: string
}) => {
  const user = await getSessionUser()
  const hasAccess = await check(user)

  if (hasAccess) {
    return
  }

  if (!user) {
    redirect(`/connexion?suivant=${signinNextPath}`)
  }

  notFound()
}
