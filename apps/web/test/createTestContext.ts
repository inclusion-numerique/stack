import { NextApiRequest, NextApiResponse } from 'next/types'
import { SessionUser } from '../src/auth/sessionUser'
import { AppContext } from '../src/server/rpc/createContext'

export const createTestContext = ({
  user,
  res,
  req,
}: {
  user: SessionUser | null
  res?: NextApiResponse
  req?: NextApiRequest
}): AppContext => ({
  res: res ?? (null as unknown as NextApiResponse),
  req: req ?? (null as unknown as NextApiRequest),
  user,
})
