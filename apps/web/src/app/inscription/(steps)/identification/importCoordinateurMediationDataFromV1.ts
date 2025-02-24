import { importLieuxActivitesFromV1Data } from '@app/web/app/inscription/(steps)/identification/importLieuxActivitesFromV1Data'
import {
  findCoordinateursFor,
  upsertCoordinationsForMediateur,
} from '@app/web/app/inscription/importFromConseillerNumerique/importFromConseillerNumerique.queries'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import { SessionUser } from '@app/web/auth/sessionUser'
import { ConseillerNumeriqueV1DataWithActiveMiseEnRelation } from '@app/web/external-apis/conseiller-numerique/isConseillerNumeriqueV1WithActiveMiseEnRelation'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'

/**
 * This is to add mediation (lieux activités...) to a coordinateur
 * that wants to also be a mediateur
 */
export const importCoordinateurMediationDataFromV1 = async ({
  user,
  upsertedMediateur,
  v1Conseiller,
}: {
  user: Pick<SessionUser, 'id'>
  upsertedMediateur: { id: string }
  v1Conseiller: ConseillerNumeriqueV1DataWithActiveMiseEnRelation
}) => {
  // 1.1 Associate mediateur to the conseiller numerique
  const data = {
    id: v1Conseiller.conseiller.id,
    idPg: v1Conseiller.conseiller.idPG,
    mediateur: {
      connect: { id: upsertedMediateur.id },
    },
  } satisfies Prisma.ConseillerNumeriqueCreateInput

  // 1.2 Create the conseiller numerique object
  const upsertedConseillerNumerique =
    await prismaClient.conseillerNumerique.upsert({
      where: { id: v1Conseiller.conseiller.id },
      create: data,
      update: data,
      select: {
        id: true,
        idPg: true,
        mediateurId: true,
      },
    })

  // 2. Associate the coordinateurs to the conseiller
  const coordinateurs = await findCoordinateursFor(v1Conseiller)

  await upsertCoordinationsForMediateur({
    mediateurId: upsertedConseillerNumerique.id,
    coordinateurIds: coordinateurs.map(({ id }) => id),
  })

  // 3. Import or link to lieux activité

  const lieuxActivites = await importLieuxActivitesFromV1Data({
    mediateurId: upsertedConseillerNumerique.mediateurId,
    conseillerV1Data: v1Conseiller,
  })

  // 5. Update lifecycle data in user

  const userWithImportedData = await prismaClient.user.update({
    where: { id: user.id },
    data: {
      donneesConseillerNumeriqueV1Importees: new Date(),
      lieuxActiviteRenseignes:
        lieuxActivites.length > 0 ? new Date() : undefined,
    },
    select: sessionUserSelect,
  })

  return userWithImportedData
}
