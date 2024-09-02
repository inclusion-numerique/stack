import { prismaClient } from '@app/web/prismaClient'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import { fixtureUsers } from '@app/fixtures/users'
import { fixtureBeneficiaires } from '@app/fixtures/beneficiaires'
import {
  fixtureCrasCollectifs,
  fixtureCrasDemarchesAdministratives,
  fixtureCrasIndividuels,
} from '@app/fixtures/cras'
import { upsertCraFixtures } from '@app/fixtures/upsertCraFixtures'
import type { Session } from '@prisma/client'

export const resetFixtureUser = async ({ id }: { id: string }) => {
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
    if (user.mediateur?.id) {
      const mediateurId = user.mediateur.id

      await prismaClient.activiteMediateur.deleteMany({
        where: {
          mediateurId,
        },
      })

      await prismaClient.craDemarcheAdministrative.deleteMany({
        where: {
          creeParMediateurId: mediateurId,
        },
      })

      await prismaClient.participantAtelierCollectif.deleteMany({
        where: {
          craCollectif: {
            creeParMediateurId: mediateurId,
          },
        },
      })

      await prismaClient.craCollectif.deleteMany({
        where: {
          creeParMediateurId: mediateurId,
        },
      })

      await prismaClient.craIndividuel.deleteMany({
        where: {
          creeParMediateurId: mediateurId,
        },
      })

      await prismaClient.participantsAnonymesCraCollectif.deleteMany({
        where: {
          craCollectif: {
            creeParMediateurId: mediateurId,
          },
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

      await prismaClient.activiteBeneficiaire.deleteMany({
        where: {
          beneficiaire: { mediateurId },
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

      await prismaClient.craIndividuel.deleteMany({
        where: {
          creeParMediateurId: mediateurId,
        },
      })

      await prismaClient.craDemarcheAdministrative.deleteMany({
        where: {
          creeParMediateurId: mediateurId,
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
  if (resetedUser.mediateur?.id) {
    const mediateurId = resetedUser.mediateur.id
    await prismaClient.beneficiaire.createMany({
      data: fixtureBeneficiaires.filter(
        (b) => resetedUser.mediateur?.id === b.mediateurId,
      ),
    })

    const mediateurCraIndividuelFixtures = fixtureCrasIndividuels.filter(
      ({ cra: { creeParMediateurId } }) => mediateurId === creeParMediateurId,
    )
    const mediateurCraDemarcheAdministrativeFixtures =
      fixtureCrasDemarchesAdministratives.filter(
        ({ cra: { creeParMediateurId } }) => mediateurId === creeParMediateurId,
      )
    const mediateurCraCollectifFixtures = fixtureCrasCollectifs.filter(
      ({ cra: { creeParMediateurId } }) => mediateurId === creeParMediateurId,
    )

    await upsertCraFixtures({
      transaction: prismaClient,
      crasIndividuels: mediateurCraIndividuelFixtures,
      crasDemarchesAdministratives: mediateurCraDemarcheAdministrativeFixtures,
      crasCollectifs: mediateurCraCollectifFixtures,
    })
  }

  console.log('RESET USER', resetedUser)
  return resetedUser
}
