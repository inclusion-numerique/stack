import { getAppData } from '@app/web/data/appData'
import { prismaClient } from '@app/web/prismaClient'

// Raw query to avoid N queries for counts
export const getGouvernancesCounts = () =>
  prismaClient.$queryRaw<
    {
      membres: number
      gouvernances: number
      regions: number
      departements: number
      epcis: number
      communes: number
      structures: number
    }[]
  >`
      SELECT COUNT(membre_gouvernance.id)                                                                        as membres,
             COUNT(DISTINCT gouvernances.id)                                                                     as gouvernances,
             COUNT(membre_gouvernance.id)
             FILTER (WHERE membre_gouvernance.region_code IS NOT NULL)                                           as regions,
             COUNT(membre_gouvernance.id)
             FILTER (WHERE membre_gouvernance.departement_code IS NOT NULL)                                          as departements,
             COUNT(membre_gouvernance.id)
             FILTER (WHERE membre_gouvernance.commune_code IS NOT NULL)                                          as communes,
             COUNT(membre_gouvernance.id)
             FILTER (WHERE membre_gouvernance.epci_code IS NOT NULL)                                             as epcis,
             COUNT(membre_gouvernance.id)
             FILTER (WHERE membre_gouvernance.siret IS NOT NULL)                              as structures
      FROM membre_gouvernance
               RIGHT JOIN gouvernances ON gouvernances.id = membre_gouvernance.gouvernance_id AND
                                          gouvernances.v2_enregistree IS NOT NULL
  `.then((rows) => {
    if (rows.length !== 1) {
      throw new Error('Unexpected number of rows for gouvernances counts')
    }
    return rows[0]
  })

export const getHomepageData = async () => {
  const [appData, conseillersNumeriques, aidantsConnect, gouvernances] =
    await Promise.all([
      getAppData(),
      prismaClient.conseillerNumerique.count({}),
      prismaClient.structureAidantsConnect.aggregate({
        _sum: {
          aidants: true,
        },
      }),
      getGouvernancesCounts(),
    ])

  return {
    dataUpdated: appData.dataUpdated,
    gouvernances,
    conseillersNumeriques,
    aidantsConnect: aidantsConnect._sum.aidants,
  }
}

export type HomepageData = Awaited<ReturnType<typeof getHomepageData>>
