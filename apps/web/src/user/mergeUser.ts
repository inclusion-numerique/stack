import { prismaClient } from '@app/web/prismaClient'
import { PrismaClient } from '@prisma/client'

type PrismaTransaction = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>

const includeCoordinateur = {
  mediateur: {
    include: {
      conseillerNumerique: {
        select: { id: true },
      },
    },
  },
  coordinateur: {
    select: { id: true },
  },
}

const include = {
  coordinateur: {
    include: {
      invitations: true,
      mediateursCoordonnes: {
        include: {
          mediateur: {
            select: { id: true },
          },
        },
      },
    },
  },
  mutations: {
    select: { id: true },
  },
  mediateur: {
    include: {
      beneficiaires: {
        select: { id: true },
      },
      activites: {
        select: { id: true },
      },
      invitations: true,
      conseillerNumerique: {
        select: { id: true },
      },
      coordinations: {
        include: {
          coordinateur: {
            select: { id: true },
          },
        },
      },
      enActivite: {
        include: {
          structure: {
            select: { id: true },
          },
        },
      },
    },
  },
  emplois: {
    include: {
      structure: {
        select: { id: true },
      },
    },
  },
}

type Coordinateur = {
  id: string
  mediateursCoordonnes: { mediateur: { id: string } }[]
  invitations: { email: string; coordinateurId: string }[]
}

type Mediateur = {
  id: string
  beneficiaires: { id: string }[]
  activites: { id: string }[]
  coordinations: { coordinateur: { id: string } }[]
  enActivite: { structure: { id: string } }[]
  invitations: { coordinateurId: string }[]
}

const toId = ({ id }: { id: string }) => id

const toCoordinateurId = ({ coordinateurId }: { coordinateurId: string }) =>
  coordinateurId

const toMediateurEmail = ({ email }: { email: string }) => email

const mergeMediateurs =
  (prisma: PrismaTransaction) =>
  async (
    sourceUser: { email: string; mediateur: Mediateur | null },
    targetUser: { email: string; mediateur: Mediateur | null },
  ) => {
    const sourceMediateur = sourceUser.mediateur
    const targetMediateur = targetUser.mediateur

    if (sourceMediateur == null || targetMediateur == null) return

    await prisma.activite.updateMany({
      where: { id: { in: sourceMediateur.activites.map(toId) } },
      data: { mediateurId: targetMediateur.id },
    })

    await prisma.beneficiaire.updateMany({
      where: { id: { in: sourceMediateur.beneficiaires.map(toId) } },
      data: { mediateurId: targetMediateur.id },
    })

    const sourceMediateurInvitationIds =
      sourceMediateur.invitations.map(toCoordinateurId)

    const targetMediateurInvitationIds =
      targetMediateur.invitations.map(toCoordinateurId)

    await prisma.invitationEquipe.updateMany({
      where: {
        email: sourceUser.email,
        coordinateurId: {
          in: sourceMediateurInvitationIds.filter(
            (id) => !targetMediateurInvitationIds.includes(id),
          ),
        },
      },
      data: { mediateurId: targetMediateur.id, email: targetUser.email },
    })

    await prisma.invitationEquipe.deleteMany({
      where: {
        email: sourceUser.email,
      },
    })

    const targetMediateurStructureIds = new Set(
      targetMediateur.enActivite.map((e) => e.structure.id) || [],
    )

    for (const enActivite of sourceMediateur.enActivite) {
      if (!targetMediateurStructureIds.has(enActivite.structure.id)) {
        await prisma.mediateurEnActivite.create({
          data: {
            mediateurId: targetMediateur.id,
            structureId: enActivite.structure.id,
          },
        })
      }
    }

    await prisma.mediateurEnActivite.deleteMany({
      where: {
        mediateurId: sourceMediateur.id,
      },
    })

    const targetMediateurCoordinateurIds = new Set(
      targetMediateur?.coordinations.map((c) => c.coordinateur.id) ?? [],
    )

    for (const coordination of sourceMediateur.coordinations) {
      if (!targetMediateurCoordinateurIds.has(coordination.coordinateur.id)) {
        await prisma.mediateurCoordonne.create({
          data: {
            mediateurId: targetMediateur.id,
            coordinateurId: coordination.coordinateur.id,
          },
        })
      }
    }

    await prisma.mediateurCoordonne.deleteMany({
      where: {
        mediateurId: sourceMediateur.id,
      },
    })
  }

const mergeCoordinateurs =
  (prisma: PrismaTransaction) =>
  async (
    sourceUser: { email: string; coordinateur: Coordinateur | null },
    targetUser: { email: string; coordinateur: Coordinateur | null },
  ) => {
    const sourceCoordinateur = sourceUser.coordinateur
    const targetCoordinateur = targetUser.coordinateur

    if (sourceCoordinateur == null || targetCoordinateur == null) return

    const sourceCoordinateurInvitationEmails =
      sourceCoordinateur.invitations.map(toMediateurEmail)

    const targetCoordinateurInvitationEmails =
      targetCoordinateur.invitations.map(toMediateurEmail)

    await prisma.invitationEquipe.updateMany({
      where: {
        email: {
          in: sourceCoordinateurInvitationEmails.filter(
            (email) => !targetCoordinateurInvitationEmails.includes(email),
          ),
        },
      },
      data: { coordinateurId: targetCoordinateur.id },
    })

    await prisma.invitationEquipe.deleteMany({
      where: {
        coordinateurId: sourceCoordinateur.id,
      },
    })

    const targetMediateurMediateursIds = new Set(
      targetCoordinateur?.mediateursCoordonnes.map((c) => c.mediateur.id) ?? [],
    )

    for (const mediateurCoordonne of sourceCoordinateur.mediateursCoordonnes) {
      if (!targetMediateurMediateursIds.has(mediateurCoordonne.mediateur.id)) {
        await prisma.mediateurCoordonne.create({
          data: {
            mediateurId: mediateurCoordonne.mediateur.id,
            coordinateurId: targetCoordinateur.id,
          },
        })
      }
    }

    await prisma.mediateurCoordonne.deleteMany({
      where: {
        coordinateurId: sourceCoordinateur.id,
      },
    })
  }

const initMediateurs =
  (prisma: PrismaTransaction) =>
  async (sourceUserId: string, targetUserId: string) => {
    const sourceMediateur = await prisma.mediateur.findUnique({
      where: { userId: sourceUserId },
    })

    const targetMediateur = await prisma.mediateur.findUnique({
      where: { userId: targetUserId },
    })

    if (sourceMediateur != null && targetMediateur == null) {
      await prisma.mediateur.create({ data: { userId: targetUserId } })
    }
  }

const initCoordinateurs =
  (prisma: PrismaTransaction) =>
  async (sourceUserId: string, targetUserId: string) => {
    const sourceUser = await prisma.user.findUnique({
      where: { id: sourceUserId },
      include: includeCoordinateur,
    })

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      include: includeCoordinateur,
    })

    if (sourceUser?.coordinateur != null && targetUser?.coordinateur == null) {
      await prisma.coordinateur.create({
        data: {
          userId: targetUserId,
          conseillerNumeriqueId: targetUser?.mediateur?.conseillerNumerique?.id,
        },
      })
    }
  }

const getUsers =
  (prisma: PrismaTransaction) =>
  async (sourceUserId: string, targetUserId: string) => ({
    sourceUser: await prisma.user.findUnique({
      where: { id: sourceUserId },
      include,
    }),
    targetUser: await prisma.user.findUnique({
      where: { id: targetUserId },
      include,
    }),
  })

const mergeStructuresEmployeuses =
  (prisma: PrismaTransaction) =>
  async (
    sourceUser: { id: string; emplois: { structure: { id: string } }[] },
    targetUser: { id: string; emplois: { structure: { id: string } }[] },
  ) => {
    const targetStructureIds = new Set(
      targetUser.emplois.map((e) => e.structure.id),
    )

    for (const emploi of sourceUser.emplois) {
      if (!targetStructureIds.has(emploi.structure.id)) {
        await prisma.employeStructure.create({
          data: {
            userId: targetUser.id,
            structureId: emploi.structure.id,
          },
        })
      }
    }

    await prisma.employeStructure.deleteMany({
      where: { userId: sourceUser.id },
    })
  }

const mergeMutations =
  (prisma: PrismaTransaction) =>
  async (
    sourceUser: { id: string; mutations: { id: string }[] },
    targetUser: { id: string; mutations: { id: string }[] },
  ) => {
    await prisma.mutation.updateMany({
      where: { id: { in: sourceUser.mutations.map(toId) } },
      data: { userId: targetUser.id },
    })

    await prisma.mutation.deleteMany({
      where: { userId: sourceUser.id },
    })
  }

const deleteUser =
  (prisma: PrismaTransaction) =>
  async ({
    id: userId,
    mediateur,
  }: {
    id: string
    mediateur: { id: string } | null
  }) => {
    await prisma.rdvAccount.deleteMany({ where: { userId } })
    await prisma.session.deleteMany({ where: { userId } })
    await prisma.account.deleteMany({ where: { userId } })
    if (mediateur?.id != null) {
      await prisma.conseillerNumerique.deleteMany({
        where: { mediateurId: mediateur.id },
      })
    }
    await prisma.coordinateur.deleteMany({ where: { userId } })
    await prisma.mediateur.deleteMany({ where: { userId } })
    await prisma.user.deleteMany({ where: { id: userId } })
  }

export const mergeUser = async (
  sourceUserId: string,
  targetUserId: string,
): Promise<void> => {
  await prismaClient.$transaction(async (prisma) => {
    await initMediateurs(prisma)(sourceUserId, targetUserId)
    await initCoordinateurs(prisma)(sourceUserId, targetUserId)
    const { sourceUser, targetUser } = await getUsers(prisma)(
      sourceUserId,
      targetUserId,
    )

    if (!sourceUser || !targetUser)
      throw new Error('One or both users not found')

    await mergeMediateurs(prisma)(sourceUser, targetUser)
    await mergeCoordinateurs(prisma)(sourceUser, targetUser)
    await mergeStructuresEmployeuses(prisma)(sourceUser, targetUser)
    await mergeMutations(prisma)(sourceUser, targetUser)
    await deleteUser(prisma)(sourceUser)
  })
}
