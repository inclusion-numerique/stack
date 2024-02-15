import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { prismaClient } from '@app/web/prismaClient'
import {
  hasAccessToDashboard,
  hasAccessToNationalDashboard,
  hasAccessToRegionDashboard,
} from '@app/web/security/securityRules'
import { SessionUser } from '@app/web/auth/sessionUser'
import { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'

export type GouvernanceScopeAccessCheck = {
  access: boolean
  redirect?: string
  notFound?: boolean
}

export const checkGouvernanceScopeAccess = async ({
  scope,
  user,
}: {
  scope: GouvernanceScope
  user: SessionUser | null
}): Promise<GouvernanceScopeAccessCheck> => {
  if (!user) {
    return {
      access: false,
      redirect: `/connexion?suivant=${gouvernanceHomePath(scope)}`,
    }
  }

  if ('codeRegion' in scope && scope.codeRegion) {
    const region = await prismaClient.region.findUnique({
      where: {
        code: scope.codeRegion,
      },
      select: {
        code: true,
        nom: true,
        departements: { select: { code: true, nom: true } },
      },
    })
    if (!region || region.departements.length === 0) {
      return {
        access: false,
        notFound: true,
      }
    }
    if (!hasAccessToRegionDashboard(user, scope.codeRegion)) {
      return {
        access: false,
        redirect: '/profil',
      }
    }

    return {
      access: true,
    }
  }

  if ('codeDepartement' in scope && scope.codeDepartement) {
    const departementWithRegion = await prismaClient.departement.findUnique({
      where: {
        code: scope.codeDepartement,
      },
      select: {
        code: true,
        nom: true,
        region: {
          select: {
            code: true,
            nom: true,
            departements: {
              select: {
                code: true,
                nom: true,
              },
            },
          },
        },
      },
    })
    if (!departementWithRegion) {
      return {
        access: false,
        notFound: true,
      }
    }
    if (
      !hasAccessToDashboard(user, {
        regionCode: departementWithRegion.region?.code,
        departementCode: departementWithRegion.code,
      })
    ) {
      return {
        access: false,
        redirect: '/profil',
      }
    }
    return {
      access: true,
    }
  }

  if ('national' in scope && scope.national) {
    if (!hasAccessToNationalDashboard(user)) {
      return {
        access: false,
        redirect: '/profil',
      }
    }
    return {
      access: true,
    }
  }

  // Invalid scope, should not happen
  return {
    access: false,
    notFound: true,
  }
}
