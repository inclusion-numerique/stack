import { CreateNextContextOptions } from '@trpc/server/src/adapters/next'

export const createContext = ({ req, res }: CreateNextContextOptions) => ({
  req,
  res,
})
