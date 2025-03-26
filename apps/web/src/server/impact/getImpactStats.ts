import { prismaClient } from '@app/web/prismaClient'

type ActiviteParMois = {
  mois: string // Format "Month YYYY"
  date_mois: Date
  total: number
  avecBeneficiaire: number
  sansBeneficiaire: number
  pourcentageAvecBeneficiaire: number
  pourcentageSansBeneficiaire: number
}

export type ImpactStats = {
  conum: {
    total: number
    actifs: number
    ratio: number
    avecSuiviBeneficiaire: number
  }
  mediateur: {
    total: number
    actifs: number
    ratio: number
    avecSuiviBeneficiaire: number
  }
  coordoConum: {
    total: number
    actifs: number
    ratio: number
  }
  coordoHD: {
    total: number
    actifs: number
    ratio: number
  }
  activitesParMois: ActiviteParMois[]
}

const getActivitesParMois = async (): Promise<ActiviteParMois[]> => {
  const rawResult = await prismaClient.$queryRaw`
      WITH mois AS (
          SELECT DISTINCT date_trunc('month', date) AS mois
          FROM activites
          WHERE suppression IS NULL
            AND date <= CURRENT_DATE
          ORDER BY mois DESC
          LIMIT 12
      )
      SELECT
          to_char(m.mois, 'Month YYYY') as mois,
          m.mois as date_mois,
          COUNT(DISTINCT a.id)::int as total,
          COUNT(DISTINCT CASE
                             WHEN EXISTS (
                                 SELECT 1
                                 FROM accompagnements acc
                                          JOIN beneficiaires b ON b.id = acc.beneficiaire_id
                                 WHERE acc.activite_id = a.id
                                   AND b.anonyme = false
                             ) THEN a.id
              END)::int as "avecBeneficiaire",
          ROUND(
                  COUNT(DISTINCT CASE
                                     WHEN EXISTS (
                                         SELECT 1
                                         FROM accompagnements acc
                                                  JOIN beneficiaires b ON b.id = acc.beneficiaire_id
                                         WHERE acc.activite_id = a.id
                                           AND b.anonyme = false
                                     ) THEN a.id
                      END)::numeric * 100.0 / NULLIF(COUNT(DISTINCT a.id), 0)
          )::int as "pourcentageAvecBeneficiaire",
          COUNT(DISTINCT CASE
                             WHEN NOT EXISTS (
                                 SELECT 1
                                 FROM accompagnements acc
                                          JOIN beneficiaires b ON b.id = acc.beneficiaire_id
                                 WHERE acc.activite_id = a.id
                                   AND b.anonyme = false
                             ) THEN a.id
              END)::int as "sansBeneficiaire",
          ROUND(
                  COUNT(DISTINCT CASE
                                     WHEN NOT EXISTS (
                                         SELECT 1
                                         FROM accompagnements acc
                                                  JOIN beneficiaires b ON b.id = acc.beneficiaire_id
                                         WHERE acc.activite_id = a.id
                                           AND b.anonyme = false
                                     ) THEN a.id
                      END)::numeric * 100.0 / NULLIF(COUNT(DISTINCT a.id), 0)
          )::int as "pourcentageSansBeneficiaire"
      FROM mois m
               LEFT JOIN activites a ON date_trunc('month', a.date) = m.mois
          AND a.suppression IS NULL
          AND a.date <= CURRENT_DATE
      GROUP BY m.mois
      ORDER BY date_mois ASC
  `

  return rawResult as any[]
}

const getMediateursAvecSuiviBeneficiaire = async (): Promise<number> => {
  return prismaClient.mediateur.count({
    where: {
      AND: [
        // Exclu les conseillers numériques
        { conseillerNumerique: null },
        // Uniquement les médiateurs avec inscription validée
        {
          user: {
            inscriptionValidee: {
              not: null,
            },
          },
        },
        // Au moins une activité avec un bénéficiaire non anonyme
        {
          activites: {
            some: {
              suppression: null,
              accompagnements: {
                some: {
                  beneficiaire: {
                    anonyme: false,
                  },
                },
              },
            },
          },
        },
      ],
    },
  })
}

const getConseillersNumeriquesAvecSuiviBeneficiaire =
  async (): Promise<number> => {
    return prismaClient.mediateur.count({
      where: {
        AND: [
          // Uniquement les conseillers numériques
          {
            conseillerNumerique: {
              isNot: null,
            },
          },
          // Uniquement les médiateurs avec inscription validée
          {
            user: {
              inscriptionValidee: {
                not: null,
              },
            },
          },
          // Au moins une activité avec un bénéficiaire non anonyme
          {
            activites: {
              some: {
                suppression: null,
                accompagnements: {
                  some: {
                    beneficiaire: {
                      anonyme: false,
                    },
                  },
                },
              },
            },
          },
        ],
      },
    })
  }

export const getImpactStats = async (): Promise<ImpactStats> => {
  const [
    conum,
    conumActifs,
    conumAvecSuiviBeneficiaire,
    mediateur,
    mediateurActifs,
    mediateurAvecSuiviBeneficiaire,
    coordoConum,
    coordoConumActifs,
    coordoHD,
    coordoHDActifs,
    activitesParMois,
  ] = await Promise.all([
    prismaClient.conseillerNumerique.count(),
    prismaClient.conseillerNumerique.count({
      where: {
        mediateur: {
          activites: {
            some: {
              date: {
                gte: new Date(new Date().setDate(new Date().getDate() - 30)),
              },
              suppression: null,
            },
          },
        },
      },
    }),
    getConseillersNumeriquesAvecSuiviBeneficiaire(),
    prismaClient.mediateur.count({
      where: {
        AND: [
          {
            user: {
              inscriptionValidee: {
                not: null,
              },
            },
          },
          {
            conseillerNumerique: null,
          },
        ],
      },
    }),
    prismaClient.mediateur.count({
      where: {
        AND: [
          {
            user: {
              inscriptionValidee: {
                not: null,
              },
            },
          },
          {
            conseillerNumerique: null,
          },
          {
            activites: {
              some: {
                date: {
                  gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                },
                suppression: null,
              },
            },
          },
        ],
      },
    }),
    getMediateursAvecSuiviBeneficiaire(),
    prismaClient.coordinateur.count({
      where: {
        conseillerNumeriqueId: {
          not: null,
        },
      },
    }),
    prismaClient.coordinateur.count({
      where: {
        conseillerNumeriqueId: {
          not: null,
        },
        user: {
          lastLogin: {
            gte: new Date(new Date().setDate(new Date().getDate() - 31)),
          },
        },
      },
    }),
    prismaClient.coordinateur.count({
      where: {
        conseillerNumeriqueId: null,
      },
    }),
    prismaClient.coordinateur.count({
      where: {
        conseillerNumeriqueId: null,
        user: {
          lastLogin: {
            gte: new Date(new Date().setDate(new Date().getDate() - 31)),
          },
        },
      },
    }),

    getActivitesParMois(),
  ])

  return {
    conum: {
      total: conum,
      actifs: conumActifs,
      ratio: Math.round((conumActifs * 100) / conum),
      avecSuiviBeneficiaire: conumAvecSuiviBeneficiaire,
    },
    mediateur: {
      total: mediateur,
      actifs: mediateurActifs,
      ratio: Math.round((mediateurActifs * 100) / mediateur),
      avecSuiviBeneficiaire: mediateurAvecSuiviBeneficiaire,
    },
    coordoConum: {
      total: coordoConum,
      actifs: coordoConumActifs,
      ratio: Math.round((coordoConumActifs * 100) / coordoConum),
    },
    coordoHD: {
      total: coordoHD,
      actifs: coordoHDActifs,
      ratio: Math.round((coordoHDActifs * 100) / coordoHD),
    },
    activitesParMois,
  }
}
