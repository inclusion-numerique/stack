import { importConseillerNumeriqueDataFromV1 } from '@app/web/app/inscription/(steps)/identification/importConseillerNumeriqueDataFromV1'
import { importCoordinateurConseillerNumeriqueDataFromV1 } from '@app/web/app/inscription/(steps)/identification/importCoordinateurConseillerNumeriqueDataFromV1'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import type { SessionUser } from '@app/web/auth/sessionUser'
import type { ConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Data'
import { isConseillerNumeriqueV1DataWithActiveMiseEnRelation } from '@app/web/external-apis/conseiller-numerique/isConseillerNumeriqueV1WithActiveMiseEnRelation'
import { prismaClient } from '@app/web/prismaClient'
import type { ProfilInscription } from '@prisma/client'

/**
 * Creates the mediateur object if needed
 * Imports the data from v1 if needed depending on the checked profil
 */
export const initializeAndimportUserDataFromV1 = async ({
  user,
  v1Conseiller,
}: {
  user: Pick<SessionUser, 'id' | 'email'> & {
    profilInscription: ProfilInscription
    checkedProfilInscription: ProfilInscription
  }
  v1Conseiller: ConseillerNumeriqueV1Data | null
}) => {
  const {
    profilInscription: intendedProfileInscription,
    checkedProfilInscription,
  } = user

  // Depending on the mismatch between intendedProfileInscription and checkedProfilInscription,
  // we either do nothing or we import the data from v1 to the user
  if (intendedProfileInscription !== checkedProfilInscription) {
    // We allow conseiller numerique to continue, even if intent is different
    if (checkedProfilInscription === 'ConseillerNumerique') {
      // continue with import
    }
    // We allow coordinateur to continue, even if intent is different
    if (checkedProfilInscription === 'Coordinateur') {
      // continue with import
    }
    // We disallow mediateur to continue if intent is different
    return user
  }

  // Nothing to import if the profileInscription has nothing to do with the v1Conseiller
  if (checkedProfilInscription === 'Mediateur') {
    const initializedMediateur = await prismaClient.user.update({
      where: { id: user.id },
      data: {
        mediateur: {
          connectOrCreate: {
            where: { userId: user.id },
            create: {},
          },
        },
      },
      select: sessionUserSelect,
    })

    return initializedMediateur
  }

  // Error if the v1Conseiller is null and needed for the intendedProfileInscription
  if (
    !v1Conseiller ||
    !isConseillerNumeriqueV1DataWithActiveMiseEnRelation(v1Conseiller)
  ) {
    throw new Error(
      `Active V1 conseiller not found for checked profil inscription ${
        checkedProfilInscription
      }`,
    )
  }

  if (checkedProfilInscription === 'Coordinateur') {
    return importCoordinateurConseillerNumeriqueDataFromV1({
      user,
      v1Conseiller,
    })
  }

  return importConseillerNumeriqueDataFromV1({
    user,
    v1Conseiller,
  })
}
