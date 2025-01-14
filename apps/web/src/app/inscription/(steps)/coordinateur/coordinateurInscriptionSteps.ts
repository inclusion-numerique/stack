/**
 * Inscription pour un conseiller numérique qui a une structure employeuse
 * MAIS PAS de lieux d’activité
 */

export const coordinateurInscriptionStepsCount = 2

export const coordinateurInscriptionSteps = {
  intro: `/inscription/identification`,
  structureEmployeuse: `/inscription/coordinateur/structure-employeuse`,
  structureEmployeuseLieuActivite: `/inscription/coordinateur/structure-employeuse-lieu-activite`,
  lieuxActivite: `/inscription/coordinateur/lieux-activite`,
  accompagnement: `/inscription/coordinateur/accompagnement`,
  recapitulatif: `/inscription/coordinateur/recapitulatif`,
}
