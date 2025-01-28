import { prismaClient } from '@app/web/prismaClient'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import type { Session } from '@prisma/client'
import { coordinations, fixtureUsers } from '@app/fixtures/users'
import { fixtureBeneficiaires } from '@app/fixtures/beneficiaires'
import {
  fixtureCrasCollectifs,
  fixtureCrasDemarchesAdministratives,
  fixtureCrasIndividuels,
} from '@app/fixtures/activites'
import { upsertCraFixtures } from '@app/fixtures/upsertCraFixtures'
import {
  Coordination,
  upsertCoordinationFixtures,
} from './upsertCoordinationFixture'

const isCoordinateur = (resetedUser: {
  coordinateur: { id: string } | null
}): resetedUser is { coordinateur: { id: string } } =>
  resetedUser.coordinateur?.id != null

const isMediateur = (user: {
  mediateur: { id: string } | null
}): user is { mediateur: { id: string } } => user.mediateur?.id != null

const onlyForCoordinateur =
  ({ coordinateur }: { coordinateur: { id: string } }) =>
  ({ coordinateurId }: Coordination) =>
    coordinateurId === coordinateur.id

const onlyForMediateur =
  ({ mediateur }: { mediateur: { id: string } }) =>
  ({ mediateurIds }: Coordination) =>
    mediateurIds.includes(mediateur.id)

const toCoordinationFor =
  ({ mediateur }: { mediateur: { id: string } }) =>
  ({ coordinateurId }: Coordination) => ({
    coordinateurId,
    mediateurIds: [mediateur.id],
  })

export const resetFixtureUser = async (
  { id }: { id: string },
  processCoordinations: boolean = true,
) => {
  const userId = id

  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
    select: sessionUserSelect,
  })

  const userFixture = fixtureUsers.find((u) => u.id === userId)
  if (!userFixture || (!!user && !user.isFixture)) {
    throw new Error(`User with id ${id} is not a fixture user`)
  }

  let sessions: Session[] = []

  /** Delete all data related to the user if exists */
  if (user) {
    /**
     * We will re-create sessions after reset to avoid unneccessary re-login
     * This is mostly useful in dev environment
     */

    sessions = await prismaClient.session.findMany({
      where: {
        userId: user.id,
      },
    })

    await prismaClient.employeStructure.deleteMany({
      where: {
        userId,
      },
    })

    // Delete mediateur, mediateurEnActivite, mediateurCoordonne, conseillerNumerique
    const mediateurId = user.mediateur?.id

    if (mediateurId) {
      await prismaClient.accompagnement.deleteMany({
        where: {
          activite: {
            mediateurId,
          },
        },
      })

      await prismaClient.activite.deleteMany({
        where: {
          mediateurId,
        },
      })

      await prismaClient.mediateurEnActivite.deleteMany({
        where: {
          mediateurId,
        },
      })

      await prismaClient.mediateurCoordonne.deleteMany({
        where: {
          mediateurId,
        },
      })

      await prismaClient.beneficiaire.deleteMany({
        where: {
          mediateurId,
        },
      })

      await prismaClient.conseillerNumerique.deleteMany({
        where: {
          mediateurId,
        },
      })

      await prismaClient.beneficiaire.deleteMany({
        where: {
          mediateurId,
        },
      })

      await prismaClient.mediateur.delete({
        where: {
          id: mediateurId,
        },
      })

      await prismaClient.invitationEquipe.deleteMany({
        where: {
          mediateurId,
        },
      })
    }

    // Delete coordinateur and mediateurs coordonnes
    if (user.coordinateur) {
      const coordinateurId = user.coordinateur.id
      await prismaClient.mediateurCoordonne.deleteMany({
        where: {
          coordinateurId,
        },
      })

      await prismaClient.coordinateur.delete({
        where: {
          id: coordinateurId,
        },
      })

      await prismaClient.invitationEquipe.deleteMany({
        where: {
          coordinateurId,
        },
      })
    }

    await prismaClient.user.delete({
      where: {
        id,
      },
    })
  }

  const resetedUser = await prismaClient.user.create({
    data: userFixture,
    select: sessionUserSelect,
  })

  await prismaClient.session.createMany({
    data: sessions,
  })

  /**
   * Re-create mediateur owned data
   */
  if (isMediateur(resetedUser)) {
    const mediateurId = resetedUser.mediateur.id
    await prismaClient.beneficiaire.createMany({
      data: fixtureBeneficiaires.filter(
        (b) => resetedUser.mediateur?.id === b.mediateurId,
      ),
    })

    const mediateurCraIndividuelFixtures = fixtureCrasIndividuels.filter(
      ({ activite }) => activite.mediateurId === mediateurId,
    )
    const mediateurCraDemarcheAdministrativeFixtures =
      fixtureCrasDemarchesAdministratives.filter(
        ({ activite }) => activite.mediateurId === mediateurId,
      )
    const mediateurCraCollectifFixtures = fixtureCrasCollectifs.filter(
      ({ activite }) => activite.mediateurId === mediateurId,
    )

    await upsertCraFixtures({
      transaction: prismaClient,
      crasIndividuels: mediateurCraIndividuelFixtures,
      crasDemarchesAdministratives: mediateurCraDemarcheAdministrativeFixtures,
      crasCollectifs: mediateurCraCollectifFixtures,
    })

    if (processCoordinations) {
      await upsertCoordinationFixtures(prismaClient)(
        coordinations
          .filter(onlyForMediateur(resetedUser))
          .map(toCoordinationFor(resetedUser)),
      )
    }
  }

  if (isCoordinateur(resetedUser) && processCoordinations) {
    await upsertCoordinationFixtures(prismaClient)(
      coordinations.filter(onlyForCoordinateur(resetedUser)),
    )
  }

  return resetedUser
}
