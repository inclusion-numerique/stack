import { cookies } from 'next/headers'
import { visitDuration } from '@app/web/server/visitHash/visitDuration'
import { createVisitHash } from '@app/web/server/visitHash/createVisitHash'
import { visitHashCookie } from '@app/web/server/visitHash/visitHashCookie'

export const getOrSetVisitHashCookie = () => {
  // Set visit-hash cookie if not set, for registering resource view on browser page rendered
  const cookieStore = cookies()

  const visitHash = cookieStore.get(visitHashCookie)?.value

  if (visitHash) {
    return visitHash
  }

  const newVisitHash = createVisitHash()

  cookieStore.set({
    name: visitHashCookie,
    value: newVisitHash,
    httpOnly: true,
    path: '/',
    // Expires in 2 hours
    expires: new Date(Date.now() + visitDuration),
  })

  return newVisitHash
}
