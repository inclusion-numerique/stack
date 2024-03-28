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

const getBeneficiairesRows = async () => {
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
              feuilleDeRoute: {
                select: {
                  id: true,
                  nom: true,
                },
              },
            },
          },
        },
      },
      beneficiaireDotationFormation: {
        select: {
          id: true,
        },
      },
    },
    where: {
      OR: [
        { beneficiaireDotationFormation: { isNot: null } },
        {
          beneficiaireSubventions: {
            some: {},
          },
        },
      ],
      gouvernance: {
        v2Enregistree: {
          not: null,
        },
      },
    },
  })

  return rows
}

type BeneficiairesRow = Awaited<ReturnType<typeof getBeneficiairesRows>>[number]

const getContacts = ({
  gouvernance: {
    createur,
    sousPrefetReferentPrenom,
    sousPrefetReferentNom,
    sousPrefetReferentEmail,
  },
  formulaireGouvernance: {
    contactPolitique,
    contactTechnique,
    contactStructure,
  },
}: BeneficiairesRow) =>
  [
    {
      type: 'Créateur gouvernance',
      nom: createur.name,
      email: createur.email,
      fonction: null,
    },
    {
      type: 'Sous-préfet référent',
      nom: `${sousPrefetReferentPrenom} ${sousPrefetReferentNom}`.trim(),
      email: sousPrefetReferentEmail,
      fonction: null,
    },
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

export const getAdministrationBeneficiairesSubventionsData = async () => {
  const rows = await getBeneficiairesRows()

  return rows.map((membre) => {
    const { id, gouvernance, beneficiaireSubventions } = membre

    const beneficiaires = beneficiaireSubventions.map(
      (beneficiaire) => beneficiaire,
    )

    const demandesSubventions = beneficiaires.map(
      ({ demandeDeSubvention }) => demandeDeSubvention,
    )

    const montantDemande = beneficiaires.reduce(
      (accumulator, beneficiaire) => accumulator.add(beneficiaire.subvention),
      new Decimal(0),
    )

    const demandesCounts = {
      total: demandesSubventions.length,
      enCours: demandesSubventions.filter(
        ({ valideeEtEnvoyee }) => !valideeEtEnvoyee,
      ).length,
      aInstruire: demandesSubventions.filter(
        ({ valideeEtEnvoyee, acceptee }) => !!valideeEtEnvoyee && !acceptee,
      ).length,
      validees: demandesSubventions.filter(({ acceptee }) => !!acceptee).length,
    }

    const contacts = getContacts(membre)

    return {
      id,
      nom: getMembreGouvernanceStringName(membre),
      gouvernance,
      montantDemande,
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
  const montantDemandeTotal = data.reduce(
    (accumulator, membre) => accumulator.add(membre.montantDemande),
    new Decimal(0),
  )

  const demandesCounts = data.reduce(
    (accumulator, beneficiaire) => {
      const { demandesCounts: currentCounts } = beneficiaire
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
    montantDemandeTotal,
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
