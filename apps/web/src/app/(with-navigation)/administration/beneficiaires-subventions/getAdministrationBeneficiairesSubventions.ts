import { Decimal } from 'decimal.js'
import { prismaClient } from '@app/web/prismaClient'
import { membreSelect } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import {
  getMembreGouvernanceCodeInsee,
  getMembreGouvernanceSiret,
  getMembreGouvernanceStatut,
  getMembreGouvernanceStringName,
  getMembreGouvernanceTypologie,
} from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getMembreGouvernanceStringName'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import { dotationFormation202406 } from '@app/web/gouvernance/dotationFormation202406'
import { getDemandesSubventionCounts } from '@app/web/app/(with-navigation)/administration/gouvernances/getDemandesSubventionCounts'

const getBeneficiairesRows = async ({
  gouvernanceId,
  membreId,
  forConvention = false,
}: {
  gouvernanceId?: string
  membreId?: string
  forConvention?: boolean
}) => {
  const rows = await prismaClient.membreGouvernance.findMany({
    select: {
      ...membreSelect.select,
      gouvernance: {
        select: {
          id: true,
          createur: true,
          sousPrefetReferentEmail: true,
          sousPrefetReferentNom: true,
          sousPrefetReferentPrenom: true,
          departement: {
            select: {
              code: true,
              nom: true,
              searchable: true,
              dotation202406: true,
              region: {
                select: {
                  nom: true,
                  searchable: true,
                },
              },
            },
          },
        },
      },
      formulaireGouvernance: {
        select: {
          createur: true,
          contactPolitique: true,
          contactTechnique: true,
          contactStructure: true,
        },
      },
      beneficiaireSubventions: {
        select: {
          id: true,
          subvention: true,
          demandeDeSubvention: {
            select: {
              id: true,
              valideeEtEnvoyee: true,
              acceptee: true,
              budgetGlobal: true,
              feuilleDeRoute: {
                select: {
                  id: true,
                  nom: true,
                },
              },
            },
          },
        },
        where: forConvention
          ? {
              demandeDeSubvention: {
                OR: [
                  {
                    valideeEtEnvoyee: {
                      not: null,
                    },
                  },
                  {
                    acceptee: {
                      not: null,
                    },
                  },
                ],
              },
            }
          : undefined,
      },
      beneficiaireDotationFormation: {
        select: {
          id: true,
        },
        where: forConvention
          ? {
              beneficiaireDotationFormationValideEtEnvoye: {
                not: null,
              },
            }
          : undefined,
      },
    },
    where: {
      id: membreId,
      OR: [
        { beneficiaireDotationFormation: { isNot: null } },
        {
          beneficiaireSubventions: {
            some: {},
          },
        },
      ],
      gouvernance: {
        id: gouvernanceId,
        v2Enregistree: {
          not: null,
        },
        supression: null,
      },
    },
  })

  return rows
}

type BeneficiairesRow = Awaited<ReturnType<typeof getBeneficiairesRows>>[number]

const getContacts = ({
  formulaireGouvernance: {
    contactPolitique,
    contactTechnique,
    contactStructure,
  },
}: BeneficiairesRow) =>
  [
    contactPolitique
      ? {
          type: 'Contact politique',
          nom: `${contactPolitique.prenom} ${contactPolitique.nom}`.trim(),
          email: contactPolitique.email,
          fonction: contactPolitique.fonction,
        }
      : null,
    contactTechnique
      ? {
          type: 'Contact technique',
          nom: `${contactTechnique.prenom} ${contactTechnique.nom}`.trim(),
          email: contactTechnique.email,
          fonction: contactTechnique.fonction,
        }
      : null,
    contactStructure
      ? {
          type: 'Contact structure',
          nom: `${contactStructure.prenom} ${contactStructure.nom}`.trim(),
          email: contactStructure.email,
          fonction: contactStructure.fonction,
        }
      : null,
  ].filter(isDefinedAndNotNull)

export const getAdministrationBeneficiairesSubventionsData = async ({
  gouvernanceId,
  membreId,
  forConvention = false,
}: {
  gouvernanceId?: string
  membreId?: string
  forConvention?: boolean
}) => {
  const rows = await getBeneficiairesRows({
    gouvernanceId,
    membreId,
    forConvention,
  })

  return rows.map((membre) => {
    const {
      id,
      gouvernance,
      beneficiaireSubventions,
      beneficiaireDotationFormation,
    } = membre

    const beneficiaires = beneficiaireSubventions.map(
      (beneficiaire) => beneficiaire,
    )

    const demandesSubventions = beneficiaires.map(
      ({ demandeDeSubvention }) => demandeDeSubvention,
    )

    const subventionIngenierie = beneficiaires.reduce(
      (accumulator, beneficiaire) => accumulator.add(beneficiaire.subvention),
      new Decimal(0),
    )

    const subventionIngenierieAcceptee = beneficiaires.reduce(
      (accumulator, beneficiaire) => {
        if (beneficiaire.demandeDeSubvention.acceptee) {
          return accumulator.add(beneficiaire.subvention)
        }
        return accumulator
      },
      new Decimal(0),
    )

    // Includes accepted and sent demandes
    const subventionIngenierieConvention = beneficiaires.reduce(
      (accumulator, beneficiaire) => {
        if (
          beneficiaire.demandeDeSubvention.valideeEtEnvoyee ||
          beneficiaire.demandeDeSubvention.acceptee
        ) {
          return accumulator.add(beneficiaire.subvention)
        }
        return accumulator
      },
      new Decimal(0),
    )

    const budgetGlobal = demandesSubventions.reduce(
      (accumulator, demande) => accumulator.add(demande.budgetGlobal),
      new Decimal(0),
    )

    const subventionFormation = beneficiaireDotationFormation
      ? dotationFormation202406
      : null

    const subventionTotal = subventionIngenierie.add(
      subventionFormation ?? new Decimal(0),
    )

    const subventionTotaleAcceptee = subventionIngenierieAcceptee.add(
      subventionFormation ?? new Decimal(0),
    )

    const subventionTotaleConvention = subventionIngenierieConvention.add(
      subventionFormation ?? new Decimal(0),
    )

    const demandesCounts = getDemandesSubventionCounts(demandesSubventions)

    const contacts = getContacts(membre)

    return {
      id,
      nom: getMembreGouvernanceStringName(membre),
      gouvernance,
      budgetGlobal,
      subventionIngenierie,
      subventionIngenierieConvention,
      subventionFormation,
      subventionTotal,
      subventionIngenierieAcceptee,
      subventionTotaleAcceptee,
      subventionTotaleConvention,
      type: getMembreGouvernanceTypologie(membre),
      statutGouvernance: getMembreGouvernanceStatut(membre),
      demandesCounts,
      codeInsee: getMembreGouvernanceCodeInsee(membre),
      siret: getMembreGouvernanceSiret(membre),
      contacts,
    }
  })
}

export type AdministrationBeneficiairesSubventionsDataRow = Awaited<
  ReturnType<typeof getAdministrationBeneficiairesSubventionsData>
>[number]

export const getAdministrationBeneficiairesSubventionsMetadata = (
  data: AdministrationBeneficiairesSubventionsDataRow[],
) => {
  const montantIngenierieTotal = data.reduce(
    (accumulator, membre) => accumulator.add(membre.subventionIngenierie),
    new Decimal(0),
  )

  const montantFormationTotal = data.reduce(
    (accumulator, membre) =>
      accumulator.add(membre.subventionFormation ?? new Decimal(0)),
    new Decimal(0),
  )

  const montantTotal = montantIngenierieTotal.add(montantFormationTotal)

  const demandesCounts = data.reduce(
    (accumulator, beneficiaire) => {
      const { demandesCounts: currentCounts } = beneficiaire
      return {
        total: accumulator.total + currentCounts.total,
        enCours: accumulator.enCours + currentCounts.enCours,
        aInstruire: accumulator.aInstruire + currentCounts.aInstruire,
        acceptees: accumulator.acceptees + currentCounts.acceptees,
      }
    },
    {
      total: 0,
      enCours: 0,
      aInstruire: 0,
      acceptees: 0,
    },
  )

  return {
    montantIngenierieTotal,
    montantFormationTotal,
    montantTotal,
    demandesCounts,
  }
}

export const contactToString = ({
  nom,
  type,
  fonction,
  email,
}: AdministrationBeneficiairesSubventionsDataRow['contacts'][number]) =>
  `${type} : ${nom} ${email}${fonction ? ` (${fonction})` : ''}`

export const searchableContactToString = ({
  nom,
  type,
  fonction,
  email,
}: AdministrationBeneficiairesSubventionsDataRow['contacts'][number]) =>
  `${type} ${nom} ${fonction ?? ''} ${email}`

export const searchableContactsToString = (
  contacts: AdministrationBeneficiairesSubventionsDataRow['contacts'],
) => contacts.map(searchableContactToString).join(' ')
