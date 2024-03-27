import { stringify } from 'csv-stringify/sync'
import { prismaClient } from '@app/web/prismaClient'
import { gouvernanceListSelect } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import {
  areGouvernanceDemandesSubventionsCompleted,
  getDemandesDeSubventionsForGouvernance,
} from '@app/web/gouvernance/gouvernanceStatus'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import {
  detailGouvernancePath,
  gouvernanceHomePath,
} from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { SortDirection } from '@app/web/app/(with-navigation)/administration/SortLink'
import { compareDates } from '@app/web/utils/compareDates'
import { compareMultiple } from '@app/web/utils/compareMultiple'
import { getSearchTokens } from '@app/web/app/(with-navigation)/administration/administrationSearch'

export type AdministrationGouvernanceListSearchParams = {
  recherche?: string
  tri?: 'departement' | 'gouvernance' | 'besoins' | 'subventions'
  ordre?: SortDirection
}

export const getAdministrationGouvernancesList = async ({
  codeDepartement,
  recherche,
  tri,
  ordre,
}: {
  codeDepartement?: string
} & AdministrationGouvernanceListSearchParams) => {
  const departementRows = await prismaClient.departement.findMany({
    select: {
      code: true,
      nom: true,
      searchable: true,
      dotation202406: true,
      gouvernancesRemontees: {
        where: {
          v2Enregistree: {
            not: null,
          },
        },
        select: {
          ...gouvernanceListSelect,
          besoinsEnIngenierieFinanciere: {
            select: {
              id: true,
              priorisationEnregistree: true,
            },
          },
          _count: {
            select: {
              membres: true,
            },
          },
        },
      },
    },
    where: {
      code: codeDepartement,
    },
    orderBy: {
      code: 'asc',
    },
  })

  // Small dataset and admin feature only, so we execute filters in memory
  const rechercheTokens = getSearchTokens(recherche)

  const departements = rechercheTokens
    ? departementRows.filter((departement) => {
        const { searchable } = departement
        return rechercheTokens.some((token) => searchable.includes(token))
      })
    : departementRows

  const gouvernanceCounts = {
    completed: departements.filter(
      (departement) => departement.gouvernancesRemontees.length > 0,
    ).length,
  }

  const besoinsCounts = {
    completed: departements.filter((departement) =>
      departement.gouvernancesRemontees.some(
        (gouvernance) =>
          gouvernance.besoinsEnIngenierieFinanciere?.priorisationEnregistree,
      ),
    ).length,
  }

  const subventionsCount = {
    completed: departements.filter((departement) =>
      departement.gouvernancesRemontees.some((gouvernance) =>
        areGouvernanceDemandesSubventionsCompleted(gouvernance),
      ),
    ).length,
  }

  const data = departements
    .map((departement) => {
      const { gouvernancesRemontees } = departement
      const gouvernance = gouvernancesRemontees[0]

      const besoinsIngenierieCompletedDate =
        gouvernance?.besoinsEnIngenierieFinanciere?.priorisationEnregistree
      const demandesSubvention = gouvernance
        ? getDemandesDeSubventionsForGouvernance(gouvernance)
        : []
      const areDemandesCompleted = gouvernance
        ? areGouvernanceDemandesSubventionsCompleted(gouvernance)
        : false

      return {
        departement,
        gouvernance,
        besoinsIngenierieCompletedDate,
        demandesSubvention,
        areDemandesCompleted,
      }
    })
    .sort((a, b) => {
      const orderMultiplier = ordre === 'desc' ? -1 : 1

      const defaultOrder = a.departement.code.localeCompare(b.departement.code)

      if (tri === 'gouvernance') {
        return (
          compareMultiple(
            compareDates(
              a.gouvernance?.v2Enregistree,
              b.gouvernance?.v2Enregistree,
            ),
            defaultOrder,
          ) * orderMultiplier
        )
      }

      if (tri === 'besoins') {
        return (
          compareMultiple(
            compareDates(
              a.besoinsIngenierieCompletedDate,
              b.besoinsIngenierieCompletedDate,
            ),
            defaultOrder,
          ) * orderMultiplier
        )
      }

      if (tri === 'subventions') {
        return (
          compareMultiple(
            a.areDemandesCompleted === b.areDemandesCompleted
              ? 0
              : a.areDemandesCompleted
                ? 1
                : -1,
            a.demandesSubvention.length - b.demandesSubvention.length,
            defaultOrder,
          ) * orderMultiplier
        )
      }

      return defaultOrder * orderMultiplier
    })

  const csvData = stringify(
    [
      [
        'Département',
        'Nom',
        'Gouvernance complétée',
        'Besoins complétés',
        'Demandes de subventions complétées',
        'Demandes de subventions en cours',
        'Détails gouvernance',
        'Vue préfet',
      ],
      ...data.map(
        ({
          departement: { code, nom },
          gouvernance,
          besoinsIngenierieCompletedDate,
          demandesSubvention,
          areDemandesCompleted,
        }) => [
          code,
          nom,
          gouvernance ? dateAsDay(gouvernance.v2Enregistree) : null,
          besoinsIngenierieCompletedDate
            ? dateAsDay(besoinsIngenierieCompletedDate)
            : null,
          areDemandesCompleted ? 'Oui' : 'Non',
          demandesSubvention.length,
          gouvernance
            ? getServerUrl(
                detailGouvernancePath(
                  { codeDepartement: code },
                  gouvernance.id,
                ),
              )
            : null,
          getServerUrl(gouvernanceHomePath({ codeDepartement: code })),
        ],
      ),
    ],
    {
      delimiter: ',',
      record_delimiter: '\r\n', // For Windows compatibility
    },
  )

  return {
    data,
    departements,
    gouvernanceCounts,
    besoinsCounts,
    subventionsCount,
    csvData,
  }
}

export type DepartementAdministrationInfo = Awaited<
  ReturnType<typeof getAdministrationGouvernancesList>
>
