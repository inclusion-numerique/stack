import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique'
import type { Prisma } from '@prisma/client'
import { chunk } from 'lodash-es'
import { prismaClient } from '@app/web/prismaClient'
import { extractIdsFromCartographieNationaleStructure } from '@app/web/data/cartographie-nationale/extractIdsFromCartographieNationaleStructure'
import type { LieuStandardMediationNumerique } from '../../data/standard-mediation-numerique/LieuStandardMediationNumerique'
import { siretOrRna } from '../../rna/rnaValidation'
import { output } from '../output'
import { updateStructures } from './updateStructuresCartographieNationale'

export const structureCartographieNationaleToPrismaModel = (
  structure: LieuStandardMediationNumerique & {
    hash: string
  },
): Prisma.StructureCartographieNationaleCreateManyInput => ({
  id: structure.id,
  dateMaj: new Date(structure.date_maj),
  source: structure.source,
  pivot: structure.pivot,
  hash: structure.hash,
  nom: structure.nom,
  latitude: structure.latitude,
  longitude: structure.longitude,
  presentationDetail: structure.presentation_detail,
  presentationResume: structure.presentation_resume,
  siteWeb: structure.site_web,
  telephone: structure.telephone,
  typologie: structure.typologie,
  adresse: structure.adresse,
  autresFormationsLabels: structure.autres_formations_labels,
  codeInsee: structure.code_insee,
  codePostal: structure.code_postal,
  commune: structure.commune,
  complementAdresse: structure.complement_adresse,
  courriels: structure.courriels,
  dispositifProgrammesNationaux: structure.dispositif_programmes_nationaux,
  ficheAccesLibre: structure.fiche_acces_libre,
  formationsLabels: structure.formations_labels,
  fraisACharge: structure.frais_a_charge,
  horaires: structure.horaires,
  itinerance: structure.itinerance,
  modalitesAcces: structure.modalites_acces,
  modalitesAccompagnement: structure.modalites_accompagnement,
  priseEnChargeSpecifique: structure.prise_en_charge_specifique,
  priseRdv: structure.prise_rdv,
  publicsSpecifiquementAdresses: structure.publics_specifiquement_adresses,
  services: structure.services,
  structureParente: structure.structure_parente,
  ...extractIdsFromCartographieNationaleStructure({ id: structure.id }),
})

export const structureToPrismaModel = (
  structure: LieuStandardMediationNumerique,
  now: Date,
): Prisma.StructureCreateManyInput => ({
  nom: structure.nom,
  latitude: structure.latitude,
  longitude: structure.longitude,
  presentationDetail: structure.presentation_detail,
  presentationResume: structure.presentation_resume,
  siteWeb: structure.site_web,
  telephone: structure.telephone,
  typologies: structure.typologie?.split('|'),
  adresse: structure.adresse,
  autresFormationsLabels: structure.autres_formations_labels?.split('|'),
  codeInsee: structure.code_insee,
  codePostal: structure.code_postal,
  commune: structure.commune,
  complementAdresse: structure.complement_adresse,
  courriels: structure.courriels?.split('|'),
  dispositifProgrammesNationaux:
    structure.dispositif_programmes_nationaux?.split('|'),
  ficheAccesLibre: structure.fiche_acces_libre,
  formationsLabels: structure.formations_labels?.split('|'),
  fraisACharge: structure.frais_a_charge?.split('|'),
  horaires: structure.horaires,
  itinerance: structure.itinerance?.split('|'),
  modalitesAcces: structure.modalites_acces?.split('|'),
  modalitesAccompagnement: structure.modalites_accompagnement?.split('|'),
  priseEnChargeSpecifique: structure.prise_en_charge_specifique?.split('|'),
  priseRdv: structure.prise_rdv,
  publicsSpecifiquementAdresses:
    structure.publics_specifiquement_adresses?.split('|'),
  services: structure.services?.split('|'),
  structureParente: structure.structure_parente,
  structureCartographieNationaleId: structure.id === '' ? null : structure.id,
  modification: now,
})

export const updateStructureFromCartoDataApi =
  ({
    structuresCartographieNationale,
    now = new Date(),
  }: {
    structuresCartographieNationale: SchemaLieuMediationNumerique[]
    now?: Date
  }) =>
  async () => {
    const existingStructures =
      await prismaClient.structureCartographieNationale.findMany({
        select: { id: true, hash: true },
        where: { suppression: null },
      })

    output.log(
      `update-structures-carto: fetched ${existingStructures.length} existing and ${structuresCartographieNationale.length} cartographie nationale structures`,
    )

    const changesToApply = updateStructures(
      existingStructures,
      structuresCartographieNationale,
    )

    // /**
    //  * We cannot use a big transaction because of the number of structures to update timeouts on deployed containers
    //  * We chunk the updates in smaller batches to avoid memory issues
    //  */

    const creationChunkSize = 50
    const editionChunkSize = 10
    const deletionChunkSize = 100

    const creationChunks = chunk(
      [...changesToApply.structuresCartographieNationaleToInsert.values()],
      creationChunkSize,
    )
    const editionChunks = chunk(
      [...changesToApply.structuresCartographieNationaleToUpdate.values()],
      editionChunkSize,
    )
    const deletionChunks = chunk(
      changesToApply.structuresCartographieNationaleToDelete,
      deletionChunkSize,
    )

    output.log(
      `update-structures-carto: creating ${creationChunks.length} chunks of ${creationChunkSize} structures`,
    )

    for (const creationChunk of creationChunks) {
      // eslint-disable-next-line no-await-in-loop
      await prismaClient.structureCartographieNationale.createMany({
        data: creationChunk.map((structure) => ({
          ...structureCartographieNationaleToPrismaModel(structure),
          creationImport: now,
          modificationImport: now,
          creation: now,
          modification: now,
        })),
      })
    }

    output.log(
      `update-structures-carto: updating ${editionChunks.length} chunks of ${editionChunkSize} structures`,
    )

    for (const editionChunk of editionChunks) {
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(
        editionChunk.map((structure) =>
          prismaClient.structureCartographieNationale.update({
            where: {
              id: structure.id,
            },
            data: {
              ...structureCartographieNationaleToPrismaModel(structure),
              ...siretOrRna({ siret: structure.pivot }),
              modificationImport: now,
              modification: now,
            },
          }),
        ),
      )
    }

    output.log(
      `update-structures-carto: merging ${changesToApply.structuresToMerge.length} structures`,
    )

    for (const { ids, mergedStructure } of changesToApply.structuresToMerge) {
      const [idToUpdate, ...idsToDelete] = ids

      // eslint-disable-next-line no-await-in-loop
      const structure = await prismaClient.structure.findUnique({
        where: { id: idToUpdate },
      })

      if (structure) {
        // eslint-disable-next-line no-await-in-loop
        await prismaClient.structure.update({
          where: { id: idToUpdate },
          data: structureToPrismaModel(mergedStructure, now),
        })
      }

      // eslint-disable-next-line no-await-in-loop
      await prismaClient.employeStructure.updateMany({
        where: { structureId: { in: idsToDelete } },
        data: { structureId: idToUpdate },
      })

      // eslint-disable-next-line no-await-in-loop
      await prismaClient.mediateurEnActivite.updateMany({
        where: { structureId: { in: idsToDelete } },
        data: { structureId: idToUpdate },
      })

      // eslint-disable-next-line no-await-in-loop
      await prismaClient.activite.updateMany({
        where: { structureId: { in: idsToDelete } },
        data: { structureId: idToUpdate },
      })

      // eslint-disable-next-line no-await-in-loop
      await prismaClient.structure.deleteMany({
        where: {
          id: {
            in: idsToDelete,
          },
        },
      })
    }

    output.log(
      `update-structures-carto: deleting ${deletionChunks.length} chunks of ${deletionChunkSize} structures`,
    )

    for (const deletionChunk of deletionChunks) {
      for (const toDelete of deletionChunk) {
        if (toDelete.replaceById === null) continue

        // eslint-disable-next-line no-await-in-loop
        await prismaClient.structure.updateMany({
          where: {
            structureCartographieNationaleId: toDelete.id,
          },
          data: {
            structureCartographieNationaleId: toDelete.replaceById,
          },
        })
      }

      // eslint-disable-next-line no-await-in-loop
      const referencedIds = await prismaClient.structure
        .findMany({
          where: {
            structureCartographieNationaleId: {
              in: deletionChunk.map((toDelete) => toDelete.id),
            },
          },
          select: { structureCartographieNationaleId: true },
        })
        .then((results) =>
          results.map((result) => result.structureCartographieNationaleId),
        )

      const idsToDelete = deletionChunk
        .map((toDelete) => toDelete.id)
        .filter((id) => !referencedIds.includes(id))

      // eslint-disable-next-line no-await-in-loop
      await prismaClient.structureCartographieNationale.deleteMany({
        where: {
          id: { in: idsToDelete.map((id) => id) },
        },
      })

      const idsToSoftDelete = deletionChunk
        .map((toDelete) => toDelete.id)
        .filter((id) => referencedIds.includes(id))

      // eslint-disable-next-line no-await-in-loop
      await prismaClient.structureCartographieNationale.updateMany({
        where: {
          id: { in: idsToSoftDelete.map((id) => id) },
        },
        data: {
          modification: now,
          suppression: now,
          suppressionImport: now,
        },
      })
    }

    output.log(`update-structures-carto: done`)

    return {
      created: changesToApply.structuresCartographieNationaleToInsert.size,
      updated: changesToApply.structuresCartographieNationaleToUpdate.size,
      deleted: changesToApply.structuresCartographieNationaleToDelete.length,
    }
  }
