import type { SessionUser } from '@app/web/auth/sessionUser'
import type {
  PrismaSessionUser,
  PrismaSessionUsupper,
} from '@app/web/auth/getSessionUserFromSessionToken'

export const serializePrismaSessionUser = (
  prismaSessionUser: PrismaSessionUser,
  usurper?: PrismaSessionUsupper,
): SessionUser => ({
  ...prismaSessionUser,
  emailVerified: prismaSessionUser.emailVerified?.toISOString() ?? null,
  created: prismaSessionUser.created.toISOString(),
  updated: prismaSessionUser.updated.toISOString(),
  hasSeenOnboarding: prismaSessionUser.hasSeenOnboarding?.toISOString() ?? null,
  inscriptionValidee:
    prismaSessionUser.inscriptionValidee?.toISOString() ?? null,
  structureEmployeuseRenseignee:
    prismaSessionUser.structureEmployeuseRenseignee?.toISOString() ?? null,
  lieuxActiviteRenseignes:
    prismaSessionUser.lieuxActiviteRenseignes?.toISOString() ?? null,
  usurper: usurper ?? null,
})
