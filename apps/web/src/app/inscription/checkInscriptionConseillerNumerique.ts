import { v4 } from 'uuid' // Do the process of finding a corresponding conseiller numerique and updating the user model.
import { type Prisma } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'
import { findConseillerNumeriqueByEmail } from '@app/web/external-apis/conseiller-numerique/findConseillerNumeriqueByEmail'
import { prismaClient } from '@app/web/prismaClient'
import { sessionUserSelect } from '@app/web/auth/getSessionUserFromSessionToken'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import { cartoStructureToStructure } from '@app/web/structure/cartoStructureToStructure' // Do the process of finding a corresponding conseiller numerique and updating the user model.

// Do the process of finding a corresponding conseiller numerique and updating the user model.
export const checkInscriptionConseillerNumerique = async (
  user: SessionUser,
) => {
  if (user.checkConseillerNumeriqueInscription) {
    // Already done
    return user
  }

  // Find conseiller numerique by email

  const conseillerInfo = await findConseillerNumeriqueByEmail({
    email: user.email,
  })

  if (!conseillerInfo) {
    // No conseiller numerique, we update the check to not do it again
    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        checkConseillerNumeriqueInscription: new Date(),
      },
    })
    return user
  }

  // This is a conseiller numérique.

  // We create the conseiller object
  const { mediateurId } = user.mediateur?.conseillerNumerique?.id
    ? {
        mediateurId: user.mediateur.id,
      }
    : await prismaClient.conseillerNumerique
        .create({
          data: {
            id: conseillerInfo.conseiller.id,
            mediateur: {
              connectOrCreate: {
                where: {
                  userId: user.id,
                },
                create: {
                  userId: user.id,
                },
              },
            },
          },
          select: {
            id: true,
            mediateurId: true,
          },
        })
        .then((conseiller) => ({
          mediateurId: conseiller.mediateurId,
        }))

  // Try to find the coresponding structure employeuse

  const existingStructure = await prismaClient.structure.findFirst({
    where: {
      siret: conseillerInfo.miseEnRelation.structureObj.siret,
      nom: conseillerInfo.miseEnRelation.structureObj.nom,
    },
    select: {
      id: true,
      structureCartographieNationaleId: true,
    },
  })

  const structureCartographieNationale =
    existingStructure?.structureCartographieNationaleId
      ? {
          id: existingStructure.structureCartographieNationaleId,
        }
      : await prismaClient.structureCartographieNationale.findFirst({
          where: {
            pivot: conseillerInfo.miseEnRelation.structureObj.siret,
            nom: conseillerInfo.miseEnRelation.structureObj.nom,
          },
        })

  // We create a structure if needed based on SIRET and name from conseiller numerique info
  const structureEmployeuse =
    existingStructure ??
    (await prismaClient.structure.create({
      data: {
        id: v4(),
        nom: conseillerInfo.miseEnRelation.structureObj.nom,
        structureCartographieNationaleId: structureCartographieNationale?.id,
        commune:
          conseillerInfo.miseEnRelation.structureObj.adresseInsee2Ban?.city,
        codePostal:
          conseillerInfo.miseEnRelation.structureObj.adresseInsee2Ban?.postcode,
        adresse:
          conseillerInfo.miseEnRelation.structureObj.adresseInsee2Ban?.name,
        latitude:
          conseillerInfo.miseEnRelation.structureObj.adresseInsee2Ban?.y,
        longitude:
          conseillerInfo.miseEnRelation.structureObj.adresseInsee2Ban?.x,
        codeInsee:
          conseillerInfo.miseEnRelation.structureObj.adresseInsee2Ban?.citycode,
        siret: conseillerInfo.miseEnRelation.structureObj.siret,
      },
    }))

  // We should find the cartographie nationale structures based on permanence ids

  const conseillerNumeriquePermanenceIds = conseillerInfo.permanences.map((p) =>
    p._id.toString(),
  )

  const structuresCartoActiviteExistantes =
    await prismaClient.structureCartographieNationale.findMany({
      where: {
        conseillerNumeriquePermanenceIds: {
          hasSome: conseillerNumeriquePermanenceIds,
        },
      },
      include: {
        structure: {
          select: {
            id: true,
          },
        },
      },
    })

  // We have 3 cases :
  // - No existing carto nor structure with the permanence ids
  // - Existing carto but no structure with the permanence ids
  // - Existing carto and structure with the permanence ids

  const structuresToCreateForEmptyCarto = conseillerInfo.permanences
    .filter(
      (permanence) =>
        // There is no carto structure with the permanence id
        !structuresCartoActiviteExistantes.some((structureCarto) =>
          structureCarto.conseillerNumeriquePermanenceIds.includes(
            permanence._id.toString(),
          ),
        ),
    )
    .map(
      (permanence) =>
        ({
          id: v4(),

          nom: permanence.nomEnseigne,
          siteWeb: permanence.siteWeb,
          adresse:
            `${permanence.adresse.numeroRue} ${permanence.adresse.rue}`.trim(),
          commune: permanence.adresse.ville,
          codePostal: permanence.adresse.codePostal,
          latitude: permanence.location.coordinates[1],
          longitude: permanence.location.coordinates[0],
          siret: permanence.siret,
          codeInsee: permanence.adresse.codeCommune,
          // TODO Import horaires also
        }) satisfies Prisma.StructureCreateManyInput,
    )

  const structuresToCreateForCartoWithoutCoopStructure =
    conseillerInfo.permanences
      // Map to corresponding carto structure
      .map((permanence) =>
        structuresCartoActiviteExistantes.find((s) =>
          s.conseillerNumeriquePermanenceIds.includes(
            permanence._id.toString(),
          ),
        ),
      )
      // Only those with carto structure
      .filter(isDefinedAndNotNull)
      // That have no structure
      .filter((s) => !s.structure)
      // We create structure from carto structure
      .map(cartoStructureToStructure)

  const existingStructureIds = conseillerInfo.permanences
    .map(
      (permanence) =>
        structuresCartoActiviteExistantes.find((s) =>
          s.conseillerNumeriquePermanenceIds.includes(
            permanence._id.toString(),
          ),
        )?.structure?.id,
    )
    .filter(isDefinedAndNotNull)

  // Creating missing structures
  await prismaClient.structure.createMany({
    data: [
      ...structuresToCreateForEmptyCarto,
      ...structuresToCreateForCartoWithoutCoopStructure,
    ],
  })

  const lieuxActiviteStructureIds = [
    ...existingStructureIds,
    ...structuresToCreateForEmptyCarto.map((s) => s.id),
    ...structuresToCreateForCartoWithoutCoopStructure.map((s) => s.id),
  ]

  // Create activités
  await prismaClient.mediateurEnActivite.createMany({
    data: lieuxActiviteStructureIds.map((structureId) => ({
      structureId,
      id: v4(),
      mediateurId,
    })),
  })

  const updatedUser = await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      structureEmployeuseRenseignee: new Date(),
      lieuxActiviteRenseignes:
        lieuxActiviteStructureIds.length > 0 ? new Date() : undefined,
      checkConseillerNumeriqueInscription: new Date(),
      emplois: {
        deleteMany: {},
        create: {
          id: v4(),
          structureId: structureEmployeuse.id,
        },
      },
    },
    select: sessionUserSelect,
  })

  return updatedUser
}
