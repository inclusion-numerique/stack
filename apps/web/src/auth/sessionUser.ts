import { User } from '@prisma/client'

// Serializable user interface
export type SessionUser = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'name' | 'email'
> & {
  emailVerified: string | null
  created: string | null
  updated: string | null
}
