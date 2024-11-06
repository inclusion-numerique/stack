import { type Prisma, ProfilInscription } from '@prisma/client'
import { v4 } from 'uuid'
import type { ObjectId } from 'mongodb'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import type { SessionUser } from '@app/web/auth/sessionUser'
import {
  ConseillerNumeriqueFound,
  ConseillerNumeriqueFoundWithActiveMiseEnRelation,
} from '@app/web/external-apis/conseiller-numerique/findConseillerNumeriqueByEmail'
import { prismaClient } from '@app/web/prismaClient'

export const toId = ({ id }: { id: string | ObjectId }) => id.toString()

export const markAsCheckedMediateur = async (user: SessionUser) =>
  prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      checkConseillerNumeriqueInscription: new Date(),
      mediateur: {
        connectOrCreate: {
          where: { userId: user.id },
          create: { id: v4() },
        },
      },
      profilInscription: ProfilInscription.Mediateur,
    },
    select: sessionUserSelect,
  })

export const markAsCheckedConseillerNumerique = (
  user: { id: string },
  { id }: { id: string },
  lieuxActiviteStructureIds: string[] = [],
) =>
  prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      checkConseillerNumeriqueInscription: new Date(),
      profilInscription: ProfilInscription.ConseillerNumerique,
      structureEmployeuseRenseignee: new Date(),
      lieuxActiviteRenseignes:
        lieuxActiviteStructureIds.length > 0 ? new Date() : undefined,
      emplois: {
        deleteMany: {},
        create: { id: v4(), structureId: id },
      },
    },
    select: sessionUserSelect,
  })

export const removeConseillerNumeriqueFor = async (user: {
  id: string
  mediateur: { id: string } | null
}) =>
  prismaClient.conseillerNumerique.deleteMany({
    where: { mediateurId: user.mediateur?.id },
  })

export const removeMediateur = async (user: {
  id: string
  mediateur: { id: string } | null
}) =>
  prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      checkConseillerNumeriqueInscription: null,
      profilInscription: ProfilInscription.Coordinateur,
      lieuxActiviteRenseignes: null,
      mediateur: { delete: true },
    },
    select: sessionUserSelect,
  })

export const markAsCheckedCoordinateur = (
  user: { id: string },
  { id }: { id: string },
) =>
  prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      checkCoordinateurInscription: new Date(),
      profilInscription: ProfilInscription.Coordinateur,
      emplois: {
        deleteMany: {},
        create: { id: v4(), structureId: id },
      },
    },
    select: sessionUserSelect,
  })

export const createConseillerNumerique = async (
  { conseiller: { id } }: { conseiller: { id: string } },
  user: SessionUser,
) => {
  const result = await prismaClient.conseillerNumerique.create({
    data: {
      id,
      mediateur: {
        connectOrCreate: {
          where: { userId: user.id },
          create: { userId: user.id },
        },
      },
    },
    select: {
      id: true,
      mediateurId: true,
    },
  })

  return {
    ...result,
    profileId: result.mediateurId,
  }
}

export const findConseillerNumeriquesFor = ({
  conseillersCoordonnes,
}: ConseillerNumeriqueFound) =>
  prismaClient.conseillerNumerique.findMany({
    where: { id: { in: conseillersCoordonnes.map(toId) } },
  })

export const createCoordinateur = async (
  { conseiller: { id } }: { conseiller: { id: string } },
  user: SessionUser,
) => {
  const result = await prismaClient.coordinateur.create({
    data: {
      conseillerNumeriqueId: id,
      userId: user.id,
    },
    select: {
      id: true,
      conseillerNumeriqueId: true,
    },
  })

  return {
    ...result,
    profileId: result.conseillerNumeriqueId,
  }
}

export const findExistingStructureFor = ({
  miseEnRelationActive,
}: ConseillerNumeriqueFound) =>
  miseEnRelationActive
    ? prismaClient.structure.findFirst({
        where: {
          siret: miseEnRelationActive.structureObj.siret,
          nom: miseEnRelationActive.structureObj.nom,
        },
        select: { id: true, structureCartographieNationaleId: true },
      })
    : null

export const findCartoStructureFor = ({
  miseEnRelationActive,
}: ConseillerNumeriqueFound) =>
  miseEnRelationActive
    ? prismaClient.structureCartographieNationale.findFirst({
        where: {
          pivot: miseEnRelationActive.structureObj.siret,
          nom: miseEnRelationActive.structureObj.nom,
        },
      })
    : null

export const createStructureEmployeuseFor =
  ({
    miseEnRelationActive: {
      structureObj: { nom, adresseInsee2Ban, siret },
    },
  }: ConseillerNumeriqueFoundWithActiveMiseEnRelation) =>
  (structureCartographieNationale: { id: string } | null) =>
    prismaClient.structure.create({
      data: {
        id: v4(),
        nom,
        structureCartographieNationaleId: structureCartographieNationale?.id,
        commune: adresseInsee2Ban?.city,
        codePostal: adresseInsee2Ban?.postcode,
        adresse: adresseInsee2Ban?.name,
        latitude: adresseInsee2Ban?.y,
        longitude: adresseInsee2Ban?.x,
        codeInsee: adresseInsee2Ban?.citycode,
        siret,
      },
    })

export const findExistingStructuresCartoFor = async (
  conseillerFound: ConseillerNumeriqueFound,
) =>
  prismaClient.structureCartographieNationale.findMany({
    where: {
      conseillerNumeriquePermanenceIds: {
        hasSome: conseillerFound.permanences.map((permanence) =>
          permanence._id.toString(),
        ),
      },
    },
    include: { structures: { select: { id: true } } },
  })

export const createStructures = async (
  structuresToCreate: Prisma.StructureCreateManyInput[],
) => prismaClient.structure.createMany({ data: structuresToCreate })

export const associateLieuxAtiviteFor =
  ({ profileId }: { profileId: string }) =>
  (lieuxActiviteStructureIds: string[]) =>
    prismaClient.mediateurEnActivite.createMany({
      data: lieuxActiviteStructureIds.map((structureId) => ({
        structureId,
        id: v4(),
        mediateurId: profileId,
      })),
    })

export const removeLieuxActiviteFor = ({ mediateur }: SessionUser) =>
  prismaClient.mediateurEnActivite.deleteMany({
    where: {
      mediateurId: mediateur?.id,
    },
  })

export const findCoordinateursFor = ({
  conseiller: { coordinateurs },
}: ConseillerNumeriqueFound) =>
  prismaClient.coordinateur.findMany({
    where: {
      conseillerNumeriqueId: { in: coordinateurs?.map(toId) },
    },
  })

export const associateCoordinateursTo =
  ({ profileId }: { profileId: string }) =>
  (coordinateurs: { id: string }[]) =>
    prismaClient.mediateurCoordonne.createMany({
      data: coordinateurs.map((coordinateur) => ({
        mediateurId: profileId,
        coordinateurId: coordinateur.id,
      })),
    })

export const associateConseillersCoordonnesTo =
  ({ id }: { id: string }) =>
  (conseillers: { mediateurId: string }[]) =>
    prismaClient.mediateurCoordonne.createMany({
      data: conseillers.map(({ mediateurId }) => ({
        mediateurId,
        coordinateurId: id,
      })),
    })

export const structureEmployeuseOf = (user: SessionUser) =>
  prismaClient.employeStructure.findFirst({
    where: { userId: user.id },
    include: { structure: { select: { id: true } } },
  })
