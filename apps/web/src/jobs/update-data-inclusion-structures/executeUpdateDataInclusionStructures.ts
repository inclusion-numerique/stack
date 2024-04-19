import { v4 } from 'uuid'
import { type Prisma } from '@prisma/client'
import {
  type DataInclusionStructure,
  downloadDataInclusionStructures,
  getStructuresFromLocalFile,
} from '@app/web/data/data-inclusion/dataInclusionStructures'
import { prismaClient } from '@app/web/prismaClient'
import type { UpdateDataInclusionStructuresJob } from '@app/web/jobs/update-data-inclusion-structures/updateDataInclusionStructuresJob'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import { dataInclusionStructureUniqueId } from '@app/web/data/data-inclusion/dataInclusionStructureUniqueId'

const dataInclusionStructureToStructureData = ({
  id: idDataInclusion,
  date_maj,
  source,
  nom,
  rna,
  siret,
  commune,
  adresse,
  antenne,
  accessibilite,
  code_insee,
  code_postal,
  complement_adresse,
  courriel,
  labels_autres,
  horaires_ouverture,
  labels_nationaux,
  lien_source,
  thematiques,
  latitude,
  longitude,
  presentation_detail,
  presentation_resume,
  site_web,
  telephone,
  typologie,
}: DataInclusionStructure): Prisma.StructureCreateManyInput => ({
  idDataInclusion: dataInclusionStructureUniqueId({
    id: idDataInclusion,
    source,
  }),
  dateMaj: new Date(date_maj),
  source,
  nom,
  rna,
  siret,
  commune: commune ?? '',
  adresse: adresse ?? '',
  antenne,
  accessibilite,
  codeInsee: code_insee ?? '',
  codePostal: code_postal ?? '',
  complementAdresse: complement_adresse,
  courriel,
  labelsAutres: labels_autres ?? [],
  horairesOuverture: horaires_ouverture,
  labelsNationaux: labels_nationaux ?? [],
  lienSource: lien_source,
  thematiques: thematiques ?? [],
  latitude,
  longitude,
  presentationDetail: presentation_detail,
  presentationResume: presentation_resume,
  siteWeb: site_web,
  telephone,
  typologie,
})

export const executeUpdateDataInclusionStructures = async (
  _job: UpdateDataInclusionStructuresJob,
) => {
  const [existingStructures, dataInclusionStructures] = await Promise.all([
    prismaClient.structure.findMany({
      where: {
        idDataInclusion: {
          not: null,
        },
      },
      select: {
        id: true,
        idDataInclusion: true,
        dateMaj: true,
      },
    }),
    downloadDataInclusionStructures().then(() => getStructuresFromLocalFile()),
  ])

  const existingMap = new Map(existingStructures.map((s) => [s.id, s]))
  const dataInclusionStructuresMap = new Map(
    dataInclusionStructures.map((s) => [dataInclusionStructureUniqueId(s), s]),
  )

  const toCreate = dataInclusionStructures.filter(
    (s) => !existingMap.has(dataInclusionStructureUniqueId(s)),
  )

  const toUpdate = dataInclusionStructures.filter((s) => {
    const existing = existingMap.get(dataInclusionStructureUniqueId(s))
    return existing && existing.dateMaj.getTime() !== s.date_maj
  })

  const toDelete = existingStructures.filter(
    (s) =>
      !!s.idDataInclusion && !dataInclusionStructuresMap.has(s.idDataInclusion),
  )

  await prismaClient.$transaction([
    prismaClient.structure.createMany({
      data: toCreate.map((structure) => ({
        ...dataInclusionStructureToStructureData(structure),
        id: v4(),
      })),
    }),
    ...toUpdate.map((structure) =>
      prismaClient.structure.update({
        where: {
          idDataInclusion: dataInclusionStructureUniqueId(structure),
        },
        data: dataInclusionStructureToStructureData(structure),
      }),
    ),
    prismaClient.structure.updateMany({
      where: {
        idDataInclusion: {
          in: toDelete
            .map((s) => s.idDataInclusion)
            .filter(isDefinedAndNotNull),
        },
      },
      data: {
        suppression: new Date(),
      },
    }),
  ])

  return {
    created: toCreate.length,
    updated: toUpdate.length,
    deleted: toDelete.length,
  }
}
