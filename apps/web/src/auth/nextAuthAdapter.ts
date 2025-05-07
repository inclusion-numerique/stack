import { proConnectProviderId } from '@app/web/auth/proConnect'
import { prismaClient } from '@app/web/prismaClient'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { Adapter, AdapterAccount, AdapterUser } from 'next-auth/adapters'
import { v4 } from 'uuid'

/**
 * Ensuring that needed methods are defined when creating adapter
 */
const createAdapter = () => {
  const prismaAdapter = PrismaAdapter(prismaClient)

  const { createUser, deleteSession, linkAccount } = prismaAdapter

  if (!createUser) throw new Error('prismaAdapter.createUser is undefined')
  if (!deleteSession)
    throw new Error('prismaAdapter.deleteSession is undefined')
  if (!linkAccount) throw new Error('prismaAdapter.linkAccount is undefined')

  return {
    ...prismaAdapter,
    createUser,
    deleteSession,
    linkAccount,
  }
}

const prismaAdapter = createAdapter()

// ⚠️ Keycloak returns non standard fields that are expected to be ignored by the client
const removeNonStandardFields = <T extends AdapterAccount>(data: T): T => ({
  ...data,
  refresh_expires_in: undefined,
  'not-before-policy': undefined,
})

export const nextAuthAdapter = {
  ...prismaAdapter,
  createUser: async (user) => {
    const { provider, ...rest } = user as Omit<AdapterUser, 'id'> & {
      // We pass the provider along from Keycloak provider to be able to detect if the user comes from Inclusion Connect
      provider?: typeof proConnectProviderId
    }

    const info = { id: v4(), ...rest }

    if (provider === proConnectProviderId) {
      return prismaAdapter.createUser({ ...info, emailVerified: new Date() })
    }
    return prismaAdapter.createUser(info)
  },
  // Better handle case of missing session when deleting. It should not crash auth process.
  deleteSession: async (sessionToken) => {
    try {
      await prismaAdapter.deleteSession(sessionToken)
    } catch (error) {
      // See https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
      if (
        !!error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2025'
      ) {
        // Ok, the session was already destroyed by another process
        return
      }
      throw error
    }
  },
  // Custom link account
  linkAccount: (account) =>
    prismaAdapter.linkAccount(removeNonStandardFields(account)),
} satisfies Adapter
