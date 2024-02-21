import { notFound, redirect } from 'next/navigation'
import { SessionUser } from '@app/web/auth/sessionUser'
import { getSessionUser } from '@app/web/auth/getSessionUser'

export const checkAccessControl = async ({
  check,
  signinNextPath,
  throwNotFound = true,
  redirect: redirectToSignin = true,
}: {
  check: (user: SessionUser | null) => boolean | Promise<boolean>
  signinNextPath: string
  throwNotFound?: boolean
  redirect?: boolean
}) => {
  const user = await getSessionUser()
  const hasAccess = await check(user)

  if (hasAccess) {
    return { access: true, user }
  }

  if (!user) {
    if (redirectToSignin) {
      redirect(`/connexion?suivant=${signinNextPath}`)
    }

    return { access: false, user: null }
  }

  if (throwNotFound) {
    notFound()
  }

  return { access: false, user }
}
