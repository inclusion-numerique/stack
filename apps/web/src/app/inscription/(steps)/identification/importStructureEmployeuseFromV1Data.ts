import {
  createStructureEmployeuseFor,
  findExistingStructureForMiseEnRelationActive,
  findStructureCartographieNationaleFromMiseEnRelation,
} from '@app/web/app/inscription/importFromConseillerNumerique/importFromConseillerNumerique.queries'
import type { ConseillerNumeriqueV1DataWithActiveMiseEnRelation } from '@app/web/external-apis/conseiller-numerique/isConseillerNumeriqueV1WithActiveMiseEnRelation'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

/**
 * Creates the structure employeuse object if needed
 * Create the "emplois" for the user if needed
 */
export const importStructureEmployeuseFromV1Data = async ({
  user,
  conseillerNumeriqueV1,
}: {
  user: Pick<SessionUser, 'id'>
  conseillerNumeriqueV1: ConseillerNumeriqueV1DataWithActiveMiseEnRelation
}) => {
  const existingStructure = await findExistingStructureForMiseEnRelationActive(
    conseillerNumeriqueV1,
  )

  if (existingStructure) {
    // Structure exists, we just create the "emplois" for the user

    const existingEmploi = await prismaClient.employeStructure.findFirst({
      where: {
        userId: user.id,
        structureId: existingStructure.id,
      },
      select: {
        id: true,
      },
    })

    if (existingEmploi) {
      return existingStructure
    }

    await prismaClient.employeStructure.create({
      data: {
        userId: user.id,
        structureId: existingStructure.id,
      },
    })

    return existingStructure
  }

  // We create the structure employeuse and link it to structure carto nationale if possible

  const structureCartographieNationale =
    await findStructureCartographieNationaleFromMiseEnRelation(
      conseillerNumeriqueV1.miseEnRelationActive,
    )

  const structure = await createStructureEmployeuseFor(conseillerNumeriqueV1)(
    structureCartographieNationale,
  )
  await prismaClient.employeStructure.create({
    data: {
      userId: user.id,
      structureId: structure.id,
    },
  })

  return structure
}
