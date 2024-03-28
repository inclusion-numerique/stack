import { Decimal } from 'decimal.js'
import { prismaClient } from '@app/web/prismaClient'
import {
  getDemandesSubventionsForFormSelect,
  gouvernanceSelect,
} from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { getDemandesDeSubventionsForGouvernance } from '@app/web/gouvernance/gouvernanceStatus'
import { dotationFormation202406 } from '@app/web/gouvernance/dotationFormation202406'
import {
  getStatutBeneficiaireFormation,
  getStatutDemandesSubvention,
} from '@app/web/gouvernance/statutDemandesSubvention'

export const getAdministrationGouvernancesData = async ({}) => {
  const rows = await prismaClient.departement.findMany({
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
          ...gouvernanceSelect,
          feuillesDeRoute: {
            select: {
              ...getDemandesSubventionsForFormSelect.feuillesDeRoute.select,
              ...gouvernanceSelect.feuillesDeRoute.select,
            },
          },
        },
      },
    },
    orderBy: {
      code: 'asc',
    },
  })

  return rows.map((departement) => {
    const { gouvernancesRemontees, dotation202406 } = departement
    const gouvernance = gouvernancesRemontees[0]
    const demandesSubvention = gouvernance
      ? getDemandesDeSubventionsForGouvernance(gouvernance)
      : []
    const statutDemandesSubvention = getStatutDemandesSubvention(gouvernance)
    const statutBeneficiaireFormation =
      getStatutBeneficiaireFormation(gouvernance)

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

    const membresCounts = {
      total: gouvernance?.membres.length ?? 0,
      coPorteurs: gouvernance?.pasDeCoporteurs
        ? 0
        : gouvernance?.membres.filter((membre) => membre.coporteur).length ?? 0,
    }

    const feuillesDeRoutesCount = gouvernance?.feuillesDeRoute.length ?? 0

    const dotationIngenierie = dotation202406

    const dotationTotale = dotation202406.add(dotationFormation202406)

    // TODO add formation beneficiaire member id to the set
    const deduplicatedBeneficiaires = new Set(
      demandesSubvention.flatMap((demande) =>
        demande.beneficiaires.map(
          (beneficiaire) => beneficiaire.membreGouvernance.id,
        ),
      ),
    )

    return {
      departement,
      dotationTotale,
      dotationIngenierie,
      gouvernance,
      demandesSubvention,
      statutDemandesSubvention,
      statutBeneficiaireFormation,
      montantDemande,
      feuillesDeRoutesCount,
      membresCounts,
      deduplicatedBeneficiairesCount: deduplicatedBeneficiaires.size,
      demandesCounts: {
        enCours,
        aInstruire,
        validees,
        total: demandesSubvention.length,
      },
    }
  })
}

export type AdministrationGouvernancesDataRow = Awaited<
  ReturnType<typeof getAdministrationGouvernancesData>
>[number]

export const getAdministrationGouvernancesMetadata = (
  data: AdministrationGouvernancesDataRow[],
) => {
  const dotationTotale = data.reduce(
    (accumulator, row) => accumulator.add(row.dotationTotale),
    new Decimal(0),
  )

  const dotationIngenierieTotale = data.reduce(
    (accumulator, row) => accumulator.add(row.dotationIngenierie),
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
    dotationTotale,
    dotationIngenierieTotale,
    montantDemandeTotal,
    demandesCounts,
  }
}
