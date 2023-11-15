import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { canAddGouvernancePressentie } from '@app/web/security/securityRules'

export const checkSecurityForGouvernanceMutation = async (
  user: SessionUser,
  departementCode: string,
) => {
  const departementAndRegion = await prismaClient.departement.findUnique({
    where: {
      code: departementCode,
    },
    select: {
      code: true,
      region: {
        select: {
          code: true,
        },
      },
    },
  })

  if (!departementAndRegion) {
    throw invalidError('Département non trouvé')
  }

  if (
    !canAddGouvernancePressentie(user, {
      departementCode,
      regionCode: departementAndRegion.region?.code,
    })
  ) {
    throw forbiddenError(
      'Vous ne pouvez pas ajouter de gouvernance pressentie pour ce département',
    )
  }
}
