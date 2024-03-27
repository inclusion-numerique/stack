import { stringify } from 'csv-stringify/sync'
import { Decimal } from 'decimal.js'
import { prismaClient } from '@app/web/prismaClient'
import { getDemandesSubventionsForFormSelect } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { getSearchTokens } from '@app/web/app/(with-navigation)/administration/administrationSearch'
import { SortDirection } from '@app/web/app/(with-navigation)/administration/SortLink'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { detailGouvernancePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import {
  areGouvernanceDemandesSubventionsCompleted,
  getDemandesDeSubventionsForGouvernance,
} from '@app/web/gouvernance/gouvernanceStatus'
import { compareMultiple } from '@app/web/utils/compareMultiple'

export type AdministrationDemandesDeSubventionsSearchParams = {
  recherche?: string
  tri?:
    | 'departement'
    | 'membres'
    | 'statut'
    | 'dotation'
    | 'montant'
    | 'demandes'
    | 'en-cours'
    | 'a-instruire'
    | 'validees'
  ordre?: SortDirection
}
export const getAdministrationDemandesDeSubventionsList = async ({
  codeDepartement,
  recherche,
  tri,
  ordre,
}: {
  codeDepartement?: string
} & AdministrationDemandesDeSubventionsSearchParams) => {
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
          ...getDemandesSubventionsForFormSelect,
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

  const rechercheTokens = getSearchTokens(recherche)

  const departements = rechercheTokens
    ? departementRows.filter((departement) => {
        const { searchable } = departement
        return rechercheTokens.some((token) => searchable.includes(token))
      })
    : departementRows

  const data = departements
    .map((departement) => {
      const { gouvernancesRemontees } = departement
      const gouvernance = gouvernancesRemontees[0]
      const demandesSubvention = gouvernance
        ? getDemandesDeSubventionsForGouvernance(gouvernance)
        : []
      const areDemandesCompleted = gouvernance
        ? areGouvernanceDemandesSubventionsCompleted(gouvernance)
        : false

      const montantDemande = demandesSubvention.reduce(
        (demandesAccumulator, demande) =>
          demandesAccumulator.add(demande.subventionDemandee),
        new Decimal(0),
      )

      const enCours = demandesSubvention.filter(
        ({ valideeEtEnvoyee }) => !valideeEtEnvoyee,
      ).length
      const aInstruire = demandesSubvention.filter(
        ({ valideeEtEnvoyee, acceptee }) => !!valideeEtEnvoyee && !acceptee,
      ).length
      const validees = demandesSubvention.filter(
        ({ acceptee }) => !!acceptee,
      ).length

      return {
        departement,
        gouvernance,
        demandesSubvention,
        areDemandesCompleted,
        montantDemande,
        membres: gouvernance?._count.membres,
        demandesCounts: {
          enCours,
          aInstruire,
          validees,
          total: demandesSubvention.length,
        },
      }
    })
    .sort((a, b) => {
      const orderMultiplier = ordre === 'desc' ? -1 : 1

      const defaultOrder = a.departement.code.localeCompare(b.departement.code)

      if (tri === 'membres') {
        return (
          compareMultiple((a.membres ?? 0) - (b.membres ?? 0), defaultOrder) *
          orderMultiplier
        )
      }

      if (tri === 'statut') {
        return (
          compareMultiple(
            a.areDemandesCompleted === b.areDemandesCompleted
              ? 0
              : a.areDemandesCompleted
                ? 1
                : -1,
            a.demandesCounts.total - b.demandesCounts.total,
            defaultOrder,
          ) * orderMultiplier
        )
      }

      if (tri === 'dotation') {
        return (
          compareMultiple(
            a.departement.dotation202406
              .sub(b.departement.dotation202406)
              .toNumber(),
            defaultOrder,
          ) * orderMultiplier
        )
      }

      if (tri === 'montant') {
        return (
          compareMultiple(
            a.montantDemande.sub(b.montantDemande).toNumber(),
            defaultOrder,
          ) * orderMultiplier
        )
      }

      if (tri === 'demandes') {
        return (
          compareMultiple(
            a.demandesCounts.total - b.demandesCounts.total,
            defaultOrder,
          ) * orderMultiplier
        )
      }

      if (tri === 'en-cours') {
        return (
          compareMultiple(
            a.demandesCounts.enCours - b.demandesCounts.enCours,
            defaultOrder,
          ) * orderMultiplier
        )
      }

      if (tri === 'a-instruire') {
        return (
          compareMultiple(
            a.demandesCounts.aInstruire - b.demandesCounts.aInstruire,
            defaultOrder,
          ) * orderMultiplier
        )
      }

      if (tri === 'validees') {
        return (
          compareMultiple(
            a.demandesCounts.validees - b.demandesCounts.validees,
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
        'Membres',
        'Finalisé',
        'Dotation',
        'Montant demandé',
        'Demandes de subvention',
        'En cours',
        'À instruire',
        'Validées',
        'Voir les demandes',
        'Détails gouvernance',
      ],
      ...data.map(
        ({
          departement: { code, nom, dotation202406 },
          gouvernance,
          areDemandesCompleted,
          montantDemande,
          membres,
          demandesCounts,
        }) => [
          code,
          nom,
          membres,
          areDemandesCompleted ? 'Oui' : 'Non',
          dotation202406.toNumber(),
          montantDemande.toNumber(),
          demandesCounts.total,
          demandesCounts.enCours,
          demandesCounts.aInstruire,
          demandesCounts.validees,
          getServerUrl(`/administration/demandes-de-subvention/${code}`),
          gouvernance
            ? getServerUrl(
                detailGouvernancePath(
                  { codeDepartement: code },
                  gouvernance.id,
                ),
              )
            : null,
        ],
      ),
    ],
    {
      delimiter: ',',
      record_delimiter: '\r\n', // For Windows compatibility
    },
  )

  const dotationTotale = data.reduce(
    (accumulator, row) => accumulator.add(row.departement.dotation202406),
    new Decimal(0),
  )

  const montantDemandeTotal = data.reduce(
    (accumulator, departement) => accumulator.add(departement.montantDemande),
    new Decimal(0),
  )

  const demandesCounts = data.reduce(
    (accumulator, departement) => {
      const { demandesCounts: currentCounts } = departement
      return {
        total: accumulator.total + currentCounts.total,
        enCours: accumulator.enCours + currentCounts.enCours,
        aInstruire: accumulator.aInstruire + currentCounts.aInstruire,
        validees: accumulator.validees + currentCounts.validees,
      }
    },
    {
      total: 0,
      enCours: 0,
      aInstruire: 0,
      validees: 0,
    },
  )

  return {
    departements,
    dotationTotale,
    montantDemandeTotal,
    data,
    demandesCounts,
    csvData,
  }
}
