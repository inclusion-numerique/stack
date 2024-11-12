import type { Prisma } from '@prisma/client'
import { v4 } from 'uuid'
import type { SessionUser } from '@app/web/auth/sessionUser'
import type { ConseillerNumeriqueV1DataWithActiveMiseEnRelation } from '@app/web/external-apis/conseiller-numerique/isConseillerNumeriqueV1WithActiveMiseEnRelation'
import { prismaClient } from '@app/web/prismaClient'
import {
  findConseillerNumeriquesFromConseillersCoordonnesV1,
  upsertCoordinationsForCoordinateur,
} from '@app/web/app/inscription/importFromConseillerNumerique/importFromConseillerNumerique.queries'
import { importStructureEmployeuseFromV1Data } from '@app/web/app/inscription/(steps)/identification/importStructureEmployeuseFromV1Data'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'

/**
 * Will only import the basic data from v1 if the user is a coordinateur
 * Mediateur and conseiller info will be added only if user choses to also be a mediateur
 */
export const importCoordinateurConseillerNumeriqueDataFromV1 = async ({
  user,
  v1Conseiller,
}: {
  user: Pick<SessionUser, 'id'>
  v1Conseiller: ConseillerNumeriqueV1DataWithActiveMiseEnRelation
}) => {
  // 1. Create the coordinateur object
  const data = {
    id: v4(),
    userId: user.id,
    conseillerNumeriqueId: v1Conseiller.conseiller.id,
    conseillerNumeriqueIdPg: v1Conseiller.conseiller.idPG,
  } satisfies Prisma.CoordinateurUncheckedCreateInput

  const upsertedCoordinateur = await prismaClient.coordinateur.upsert({
    where: { userId: user.id },
    create: data,
    update: data,
  })

  // 2. Associate the conseillers to the coordinateur
  const conseillers =
    await findConseillerNumeriquesFromConseillersCoordonnesV1(v1Conseiller)

  await upsertCoordinationsForCoordinateur({
    coordinateurId: upsertedCoordinateur.id,
    mediateurIds: conseillers.map(({ mediateurId }) => mediateurId),
  })

  // 3. Import or link to structure employeuse
  await importStructureEmployeuseFromV1Data({
    user,
    conseillerNumeriqueV1: v1Conseiller,
  })

  // 5. Update lifecycle data in user

  const userWithImportedData = await prismaClient.user.update({
    where: { id: user.id },
    data: {
      donneesCoordinateurConseillerNumeriqueV1Importees: new Date(),
      structureEmployeuseRenseignee: new Date(),
    },
    select: sessionUserSelect,
  })

  return userWithImportedData
}
