import { cookies } from 'next/headers'
import {
  createVisitHash,
  visitDuration,
} from '@app/web/server/visitHash/createVisitHash'

export const getOrCreateVisitHashFromCookies = () => {
  const nextCookies = cookies()

  const visitHashFromCookie = nextCookies.get('visit-hash')?.value

  const visitHash = visitHashFromCookie || createVisitHash()

  if (!visitHashFromCookie) {
    nextCookies.set('visit-hash', visitHash, {
      // Expires in 2 hours
      expires: new Date(Date.now() + visitDuration),
    })
  }

  return visitHash
}
