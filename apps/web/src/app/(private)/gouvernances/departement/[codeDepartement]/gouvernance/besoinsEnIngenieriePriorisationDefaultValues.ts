import { DefaultValues } from 'react-hook-form/dist/types/form'
import { GouvernanceWithBesoinsIngenierieFinanciereForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { BesoinsEnIngenierieFinancierePrioriteData } from '@app/web/gouvernance/BesoinsEnIngenierieFinanciere'
import { simpleBesoinsLabels } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/besoinsLabels'
import { getPrioritesFromFormValues } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/getPrioritesFromFormValues'

export const getBesoinsEnIngenieriePriorisationDefaultValues = (
  gouvernance: GouvernanceWithBesoinsIngenierieFinanciereForForm,
): DefaultValues<BesoinsEnIngenierieFinancierePrioriteData> & {
  gouvernanceId: string
} => {
  if (!gouvernance?.besoinsEnIngenierieFinanciere) {
    return { gouvernanceId: gouvernance.id }
  }
  const data = gouvernance.besoinsEnIngenierieFinanciere

  // We put -1 as a priority for missing ones, then we iterate and give them a priority starting with 0

  const getPrioriteDefaultValue = (key: keyof typeof simpleBesoinsLabels) => {
    if (!data[`${key}Prestation`]) {
      // Prestation is not needed
      return
    }
    return data[`${key}PrestationPriorite`] ?? -1
  }

  const priorites = {
    faireUnDiagnosticTerritorialPrestationPriorite: getPrioriteDefaultValue(
      'faireUnDiagnosticTerritorial',
    ),
    coConstruireLaFeuilleDeRoutePrestationPriorite: getPrioriteDefaultValue(
      'coConstruireLaFeuilleDeRoute',
    ),
    redigerLaFeuilleDeRoutePrestationPriorite: getPrioriteDefaultValue(
      'redigerLaFeuilleDeRoute',
    ),
    creerUnVehiculeJuridiquePrestationPriorite: getPrioriteDefaultValue(
      'creerUnVehiculeJuridique',
    ),
    formaliserLaFeuilleDeRouteAutrePrestationPriorite: getPrioriteDefaultValue(
      'formaliserLaFeuilleDeRouteAutre',
    ),
    structurerUnFondsLocalPrestationPriorite: getPrioriteDefaultValue(
      'structurerUnFondsLocal',
    ),
    monterDesDossiersDeSubventionPrestationPriorite: getPrioriteDefaultValue(
      'monterDesDossiersDeSubvention',
    ),
    animerEtMettreEnOeuvrePrestationPriorite: getPrioriteDefaultValue(
      'animerEtMettreEnOeuvre',
    ),
    financerLeDeploiementAutrePrestationPriorite: getPrioriteDefaultValue(
      'financerLeDeploiementAutre',
    ),
    structurerUneFiliereDeReconditionnementPrestationPriorite:
      getPrioriteDefaultValue('structurerUneFiliereDeReconditionnement'),
    collecterDesDonneesTerritorialesPrestationPriorite: getPrioriteDefaultValue(
      'collecterDesDonneesTerritoriales',
    ),
    sensibiliserLesActeursPrestationPriorite: getPrioriteDefaultValue(
      'sensibiliserLesActeurs',
    ),
    outillerLesActeursAutrePrestationPriorite: getPrioriteDefaultValue(
      'outillerLesActeursAutre',
    ),
    formerLesAgentsPublicsPriorite: data.formerLesAgentsPublics
      ? data.formerLesAgentsPublicsPriorite ?? -1
      : undefined,
    formerLesSalariesAssociatifsPriorite: data.formerLesSalariesAssociatifs
      ? data.formerLesSalariesAssociatifsPriorite ?? -1
      : undefined,
    appuyerLaCertificationQualiopiPriorite: data.appuyerLaCertificationQualiopi
      ? data.appuyerLaCertificationQualiopiPriorite ?? -1
      : undefined,
    formerLesProfessionnelsAutrePriorite: data.formerLesProfessionnelsAutre
      ? data.formerLesProfessionnelsAutrePriorite ?? -1
      : undefined,
    totalEtpPriorite:
      data.totalEtp > 0 ? data.totalEtpPriorite ?? -1 : undefined,
  } satisfies DefaultValues<BesoinsEnIngenierieFinancierePrioriteData>['priorites']

  const defaultValues = {
    gouvernanceId: gouvernance.id,
    priorites: getPrioritesFromFormValues(priorites),
  } satisfies DefaultValues<BesoinsEnIngenierieFinancierePrioriteData>

  return defaultValues
}
