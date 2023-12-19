import { notFound } from 'next/navigation'
import { cache } from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProfilePageQuery } from '@app/web/server/profiles/getProfile'
import { filterAccess } from '@app/web/server/profiles/authorization'

// Context is cached per request https://beta.nextjs.org/docs/data-fetching/caching#per-request-caching
export const getProfilePageContext = cache(async (profileSlug: string) => {
  const user = await getSessionUser()
  const profile = await getProfilePageQuery(decodeURI(profileSlug), user)
  if (!profile) {
    notFound()
  }

  const authorizations = filterAccess(profile, user)

  return {
    profile,
    authorizations,
    user,
  }
})

export type ProfilePageContext = Awaited<
  ReturnType<typeof getProfilePageContext>
>
