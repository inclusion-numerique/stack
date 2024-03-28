import type { DemandeDeSubvention, Gouvernance } from '@prisma/client'
import { Decimal } from 'decimal.js'
import {
  getDemandesDeSubventionsForGouvernance,
  getMontantDotationRestante,
} from '@app/web/gouvernance/gouvernanceStatus'

export type StatutDemandeSubvention = 'Non renseigné' | 'En cours' | 'Finalisé'

export const statutsDemandeSubvention = [
  'Non renseigné',
  'En cours',
  'Finalisé',
] as const satisfies StatutDemandeSubvention[]

export type StatutAction = 'Non renseigné' | 'En cours' | 'Envoyé' | 'Validé'

export const statutsAction = [
  'Non renseigné',
  'En cours',
  'Envoyé',
  'Validé',
] as const satisfies StatutAction[]

export const getStatutDemandesSubvention = <
  T extends Pick<
    DemandeDeSubvention,
    'valideeEtEnvoyee' | 'subventionDemandee'
  >,
  V extends Pick<
    Gouvernance,
    // TODO Add formation member
    'noteDeContexteSubventions' | 'noteDeContexteSubventionsEnregistree'
  > & {
    departement: {
      dotation202406: Decimal
    }
    feuillesDeRoute: {
      demandesDeSubvention: T[]
    }[]
  },
>(
  gouvernance?: V,
): StatutDemandeSubvention => {
  const demandesDeSubvention =
    getDemandesDeSubventionsForGouvernance(gouvernance)

  const dotationRestante =
    !gouvernance || getMontantDotationRestante(gouvernance).montantRestant.gt(0)

  // TODO Formation test

  if (
    !gouvernance?.noteDeContexteSubventionsEnregistree &&
    demandesDeSubvention.length === 0
  ) {
    return 'Non renseigné'
  }

  return !!gouvernance?.noteDeContexteSubventionsEnregistree &&
    demandesDeSubvention.length > 0 &&
    demandesDeSubvention.every(({ valideeEtEnvoyee }) => !!valideeEtEnvoyee) &&
    !dotationRestante
    ? 'Finalisé'
    : 'En cours'
}

export const getStatutBeneficiaireFormation = (
  gouvernance?: Pick<Gouvernance, 'id'>,
): StatutAction => {
  if (!gouvernance) {
    return 'Non renseigné'
  }
  // TODO Formation status
  return 'Non renseigné'
}
