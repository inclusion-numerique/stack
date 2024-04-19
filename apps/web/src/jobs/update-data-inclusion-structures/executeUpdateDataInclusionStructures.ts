import { v4 } from 'uuid'
import {
  downloadDataInclusionStructures,
  getStructuresFromLocalFile,
} from '@app/web/data/data-inclusion/dataInclusionStructures'
import { prismaClient } from '@app/web/prismaClient'
import type { UpdateDataInclusionStructuresJob } from '@app/web/jobs/update-data-inclusion-structures/updateDataInclusionStructuresJob'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'

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

  const existingMap = new Map(
    existingStructures.map((s) => [s.idDataInclusion, s]),
  )
  const dataInclusionStructuresMap = new Map(
    dataInclusionStructures.map((s) => [s.id, s]),
  )

  const toCreate = dataInclusionStructures.filter((s) => !existingMap.has(s.id))

  const toUpdate = dataInclusionStructures.filter((s) => {
    const existing = existingMap.get(s.id)
    return existing && existing.dateMaj.getTime() !== s.dateMaj
  })

  const toDelete = existingStructures.filter(
    (s) =>
      !!s.idDataInclusion && !dataInclusionStructuresMap.has(s.idDataInclusion),
  )

  await prismaClient.$transaction([
    prismaClient.structure.createMany({
      data: toCreate.map(
        ({
          id: idDataInclusion,
          dateMaj,
          source,
          nom,
          rna,
          siret,
          commune,
          adresse,
          antenne,
          accessibilite,
          codeInsee,
          codePostal,
          complementAdresse,
          courriel,
          horairesOuverture,
          labelsAutres,
          labelsNationaux,
          lienSource,
          thematiques,
          latitude,
          longitude,
          presentationDetail,
          presentationResume,
          siteWeb,
          telephone,
          typologie,
        }) => ({
          id: v4(),
          idDataInclusion,
          dateMaj: new Date(dateMaj),
          source,
          nom,
          rna,
          siret,
          commune,
          adresse,
          antenne,
          accessibilite,
          codeInsee,
          codePostal,
          complementAdresse,
          courriel,
          horairesOuverture,
          labelsAutres,
          labelsNationaux,
          lienSource,
          thematiques,
          latitude,
          longitude,
          presentationDetail,
          presentationResume,
          siteWeb,
          telephone,
          typologie,
        }),
      ),
    }),
    ...toUpdate.map(
      ({
        id: idDataInclusion,
        dateMaj,
        source,
        nom,
        rna,
        siret,
        commune,
        adresse,
        antenne,
        accessibilite,
        codeInsee,
        codePostal,
        complementAdresse,
        courriel,
        horairesOuverture,
        labelsAutres,
        labelsNationaux,
        lienSource,
        thematiques,
        latitude,
        longitude,
        presentationDetail,
        presentationResume,
        siteWeb,
        telephone,
        typologie,
      }) =>
        prismaClient.structure.update({
          where: {
            idDataInclusion,
          },
          data: {
            id: v4(),
            idDataInclusion,
            dateMaj: new Date(dateMaj),
            source,
            nom,
            rna,
            siret,
            commune,
            adresse,
            antenne,
            accessibilite,
            codeInsee,
            codePostal,
            complementAdresse,
            courriel,
            horairesOuverture,
            labelsAutres,
            labelsNationaux,
            lienSource,
            thematiques,
            latitude,
            longitude,
            presentationDetail,
            presentationResume,
            siteWeb,
            telephone,
            typologie,
          },
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
