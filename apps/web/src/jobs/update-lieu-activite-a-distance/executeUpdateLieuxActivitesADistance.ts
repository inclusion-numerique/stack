import { output } from '@app/web/jobs/output'
import { prismaClient } from '@app/web/prismaClient'
import { UpdateLieuxActivitesAdistanceJob } from './updateLieuxActivitesAdistanceJob'

export const executeUpdateLieuxActivitesADistance = async (
  _job: UpdateLieuxActivitesAdistanceJob,
) => {
  const activitesToUpdate = await prismaClient.activite.findMany({
    where: {
      typeLieu: 'ADistance',
      lieuCodeInsee: null,
    },
    include: {
      mediateur: {
        include: {
          user: {
            include: {
              emplois: {
                include: {
                  structure: true,
                },
              },
            },
          },
        },
      },
    },
  })

  output.log(`Found ${activitesToUpdate.length} activites to update`)

  for (const activite of activitesToUpdate) {
    const structureEmployeuse =
      activite.mediateur?.user?.emplois?.[0]?.structure

    if (!structureEmployeuse) {
      output.log(
        `No structure employeuse found for activite ${activite.id} and mediateur ${activite.mediateur?.id}`,
      )
      continue
    }

    await prismaClient.activite.update({
      where: {
        id: activite.id,
      },
      data: {
        lieuCodePostal: structureEmployeuse.codePostal,
        lieuCommune: structureEmployeuse.commune,
        lieuCodeInsee: structureEmployeuse.codeInsee,
      },
    })
  }

  return {
    success: true,
  }
}
