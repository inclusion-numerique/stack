import type { FetchCreateContextFnOptions } from '@trpc/server/src/adapters/fetch/types'
import type { SessionUser } from '@app/web/auth/sessionUser'
import type { AppContext } from '@app/web/server/rpc/createContext'

export const createTestContext = ({
  user,
  resHeaders,
  info,
  req,
}: {
  user: SessionUser | null
  resHeaders?: Headers
  req?: Request
  info?: FetchCreateContextFnOptions['info']
}): AppContext => ({
  resHeaders: resHeaders ?? (null as unknown as Headers),
  req: req ?? (null as unknown as Request),
  info: info ?? {
    isBatchCall: false,
    calls: [],
  },
  user,
  sessionToken: 'test-session-token',
})
