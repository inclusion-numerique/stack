import type {
  BesoinsEnIngenierieFinanciere,
  DemandeDeSubvention,
  Gouvernance,
} from '@prisma/client'
import { Decimal } from 'decimal.js'

export const isGouvernanceV2 = <T extends Pick<Gouvernance, 'v2Enregistree'>>(
  gouvernance?: Pick<Gouvernance, 'v2Enregistree'>,
): gouvernance is T & { v2Enregistree: Date } => !!gouvernance?.v2Enregistree

export const isGouvernanceBesoinsCompleted = <
  T extends Pick<BesoinsEnIngenierieFinanciere, 'priorisationEnregistree'>,
  V extends {
    besoinsEnIngenierieFinanciere: T | null
  },
>(
  gouvernance?: V | null,
): gouvernance is V & { besoinsEnIngenierieFinanciere: T } =>
  !!gouvernance?.besoinsEnIngenierieFinanciere?.priorisationEnregistree

export const getDemandesDeSubventionsForGouvernance = <
  T extends Pick<DemandeDeSubvention, 'valideeEtEnvoyee'>,
  V extends {
    feuillesDeRoute: {
      demandesDeSubvention: T[]
    }[]
  },
>(
  gouvernance?: V,
): V['feuillesDeRoute'][number]['demandesDeSubvention'] =>
  gouvernance?.feuillesDeRoute.flatMap(
    ({ demandesDeSubvention }) => demandesDeSubvention,
  ) ?? ([] as T[])

export const getMontantDotationRestante = (gouvernance: {
  departement: {
    dotation202406: Decimal
  }
  feuillesDeRoute: {
    demandesDeSubvention: Pick<
      DemandeDeSubvention,
      'valideeEtEnvoyee' | 'subventionDemandee'
    >[]
  }[]
}) => {
  const {
    departement: { dotation202406 },
  } = gouvernance
  const dotation = dotation202406
  const demandesDeSubventions =
    getDemandesDeSubventionsForGouvernance(gouvernance)

  const totalDemande = demandesDeSubventions.reduce(
    (total, { subventionDemandee }) => total.add(subventionDemandee),
    new Decimal(0),
  )

  const montantRestant = dotation.sub(totalDemande)

  return {
    dotation,
    totalDemande,
    montantRestant,
  }
}

export const getEarliestDemandesDeSubventionCreee = <
  T extends { creation: Date },
>(
  demandesDeSubventions: T[],
): T =>
  demandesDeSubventions.reduce((earliest, demande) =>
    earliest.creation < demande.creation ? earliest : demande,
  )

export const getLatestDemandesDeSubventionModifiee = <
  T extends { modification: Date },
>(
  demandesDeSubventions: T[],
): T =>
  demandesDeSubventions.reduce((latest, demande) =>
    latest.modification > demande.modification ? latest : demande,
  )
