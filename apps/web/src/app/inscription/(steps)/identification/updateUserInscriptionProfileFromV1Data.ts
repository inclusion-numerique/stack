import type { ProfilInscription } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import {
  PrismaSessionUser,
  sessionUserSelect,
} from '@app/web/auth/getSessionUserFromSessionToken'
import { isConseillerNumeriqueV1DataWithActiveMiseEnRelation } from '@app/web/external-apis/conseiller-numerique/isConseillerNumeriqueV1WithActiveMiseEnRelation'
import type { ConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Data'

export const getProfileInscriptionFromV1Data = ({
  // intendedProfileInscription,
  v1Conseiller,
}: {
  // intendedProfileInscription: ProfilInscription  // will be used when we can register as coordinateur wihout conseiller numérique v1
  v1Conseiller: ConseillerNumeriqueV1Data | null
}): ProfilInscription => {
  if (!isConseillerNumeriqueV1DataWithActiveMiseEnRelation(v1Conseiller)) {
    return 'Mediateur' // will be mediateur or coordinateur depending on the intendedProfileInscription later on
  }

  if (v1Conseiller.conseiller.estCoordinateur) {
    return 'Coordinateur'
  }
  return 'ConseillerNumerique'
}

export const updateUserInscriptionProfileFromV1Data = async ({
  user,
  v1Conseiller,
}: {
  user: { id: string }
  v1Conseiller: ConseillerNumeriqueV1Data | null
}): Promise<
  PrismaSessionUser & { checkedProfilInscription: ProfilInscription }
> =>
  prismaClient.user
    .update({
      where: { id: user.id },
      data: {
        checkedProfilInscription: getProfileInscriptionFromV1Data({
          v1Conseiller,
        }),
      },
      select: sessionUserSelect,
    })
    .then((updatedUser) => {
      if (!updatedUser.checkedProfilInscription) {
        throw new Error('Could not update user profile')
      }
      return updatedUser as PrismaSessionUser & {
        checkedProfilInscription: ProfilInscription
      }
    })
