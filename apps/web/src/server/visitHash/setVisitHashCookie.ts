import { cookies } from 'next/headers'
import { visitDuration } from '@app/web/server/visitHash/visitDuration'
import { createVisitHash } from '@app/web/server/visitHash/createVisitHash'
import { visitHashCookie } from '@app/web/server/visitHash/visitHashCookie'

export const setVisitHashCookie = () => {
  // Set visit-hash cookie if not set, for registering resource view on browser page rendered
  const cookieStore = cookies()
  if (!cookieStore.has(visitHashCookie)) {
    cookieStore.set({
      name: visitHashCookie,
      value: createVisitHash(),
      httpOnly: true,
      path: '/',
      // Expires in 2 hours
      expires: new Date(Date.now() + visitDuration),
    })
  }
}
