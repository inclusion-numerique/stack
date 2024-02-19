import { DefaultValues } from 'react-hook-form/dist/types/form'
import { GouvernanceWithBesoinsIngenierieFinanciereForForm } from '@app/web/app/(private-with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { BesoinsEnIngenierieFinanciereData } from '@app/web/gouvernance/BesoinsEnIngenierieFinanciere'

export const getBesoinsEnIngenierieSelectionDefaultValues = (
  gouvernance: GouvernanceWithBesoinsIngenierieFinanciereForForm,
): DefaultValues<BesoinsEnIngenierieFinanciereData> & {
  gouvernanceId: string
} => {
  if (!gouvernance?.besoinsEnIngenierieFinanciere) {
    return { gouvernanceId: gouvernance.id }
  }
  const {
    faireUnDiagnosticTerritorial,
    faireUnDiagnosticTerritorialEtp,
    faireUnDiagnosticTerritorialPrestation,
    coConstruireLaFeuilleDeRoute,
    coConstruireLaFeuilleDeRouteEtp,
    coConstruireLaFeuilleDeRoutePrestation,
    redigerLaFeuilleDeRoute,
    redigerLaFeuilleDeRouteEtp,
    redigerLaFeuilleDeRoutePrestation,
    creerUnVehiculeJuridique,
    creerUnVehiculeJuridiqueEtp,
    creerUnVehiculeJuridiquePrestation,
    formaliserLaFeuilleDeRouteAutre,
    formaliserLaFeuilleDeRouteAutreEtp,
    formaliserLaFeuilleDeRouteAutrePrestation,
    formaliserLaFeuilleDeRouteAutrePrecisions,
    structurerUnFondsLocal,
    structurerUnFondsLocalEtp,
    structurerUnFondsLocalPrestation,
    monterDesDossiersDeSubvention,
    monterDesDossiersDeSubventionEtp,
    monterDesDossiersDeSubventionPrestation,
    animerEtMettreEnOeuvre,
    animerEtMettreEnOeuvreEtp,
    animerEtMettreEnOeuvrePrestation,
    financerLeDeploiementAutre,
    financerLeDeploiementAutreEtp,
    financerLeDeploiementAutrePrestation,
    financerLeDeploiementAutrePrecisions,
    structurerUneFiliereDeReconditionnement,
    structurerUneFiliereDeReconditionnementEtp,
    structurerUneFiliereDeReconditionnementPrestation,
    collecterDesDonneesTerritoriales,
    collecterDesDonneesTerritorialesEtp,
    collecterDesDonneesTerritorialesPrestation,
    sensibiliserLesActeurs,
    sensibiliserLesActeursEtp,
    sensibiliserLesActeursPrestation,
    outillerLesActeursAutre,
    outillerLesActeursAutrePrecisions,
    outillerLesActeursAutreEtp,
    outillerLesActeursAutrePrestation,
    formerLesAgentsPublics,
    formerLesAgentsPublicsNombre,
    formerLesSalariesAssociatifs,
    formerLesSalariesAssociatifsNombre,

    appuyerLaCertificationQualiopi,
    formerLesProfessionnelsAutre,
    formerLesProfessionnelsAutrePrecisions,
  } = gouvernance.besoinsEnIngenierieFinanciere

  const defaultValues = {
    gouvernanceId: gouvernance.id,
    faireUnDiagnosticTerritorial: {
      besoin: faireUnDiagnosticTerritorial,
      etp: faireUnDiagnosticTerritorialEtp,
      prestation: faireUnDiagnosticTerritorialPrestation,
      rh: faireUnDiagnosticTerritorialEtp !== null,
    },
    coConstruireLaFeuilleDeRoute: {
      besoin: coConstruireLaFeuilleDeRoute,
      etp: coConstruireLaFeuilleDeRouteEtp,
      prestation: coConstruireLaFeuilleDeRoutePrestation,
      rh: coConstruireLaFeuilleDeRouteEtp !== null,
    },
    redigerLaFeuilleDeRoute: {
      besoin: redigerLaFeuilleDeRoute,
      etp: redigerLaFeuilleDeRouteEtp,
      prestation: redigerLaFeuilleDeRoutePrestation,
      rh: redigerLaFeuilleDeRouteEtp !== null,
    },
    creerUnVehiculeJuridique: {
      besoin: creerUnVehiculeJuridique,
      etp: creerUnVehiculeJuridiqueEtp,
      prestation: creerUnVehiculeJuridiquePrestation,
      rh: creerUnVehiculeJuridiqueEtp !== null,
    },
    formaliserLaFeuilleDeRouteAutre: {
      besoin: formaliserLaFeuilleDeRouteAutre,
      etp: formaliserLaFeuilleDeRouteAutreEtp,
      prestation: formaliserLaFeuilleDeRouteAutrePrestation,
      rh: formaliserLaFeuilleDeRouteAutreEtp !== null,
      precisions: formaliserLaFeuilleDeRouteAutrePrecisions,
    },
    structurerUnFondsLocal: {
      besoin: structurerUnFondsLocal,
      etp: structurerUnFondsLocalEtp,
      prestation: structurerUnFondsLocalPrestation,
      rh: structurerUnFondsLocalEtp !== null,
    },
    monterDesDossiersDeSubvention: {
      besoin: monterDesDossiersDeSubvention,
      etp: monterDesDossiersDeSubventionEtp,
      prestation: monterDesDossiersDeSubventionPrestation,
      rh: monterDesDossiersDeSubventionEtp !== null,
    },
    animerEtMettreEnOeuvre: {
      besoin: animerEtMettreEnOeuvre,
      etp: animerEtMettreEnOeuvreEtp,
      prestation: animerEtMettreEnOeuvrePrestation,
      rh: animerEtMettreEnOeuvreEtp !== null,
    },
    financerLeDeploiementAutre: {
      besoin: financerLeDeploiementAutre,
      etp: financerLeDeploiementAutreEtp,
      prestation: financerLeDeploiementAutrePrestation,
      rh: financerLeDeploiementAutreEtp !== null,
      precisions: financerLeDeploiementAutrePrecisions,
    },
    structurerUneFiliereDeReconditionnement: {
      besoin: structurerUneFiliereDeReconditionnement,
      etp: structurerUneFiliereDeReconditionnementEtp,
      prestation: structurerUneFiliereDeReconditionnementPrestation,
      rh: structurerUneFiliereDeReconditionnementEtp !== null,
    },
    collecterDesDonneesTerritoriales: {
      besoin: collecterDesDonneesTerritoriales,
      etp: collecterDesDonneesTerritorialesEtp,
      prestation: collecterDesDonneesTerritorialesPrestation,
      rh: collecterDesDonneesTerritorialesEtp !== null,
    },
    sensibiliserLesActeurs: {
      besoin: sensibiliserLesActeurs,
      etp: sensibiliserLesActeursEtp,
      prestation: sensibiliserLesActeursPrestation,
      rh: sensibiliserLesActeursEtp !== null,
    },
    outillerLesActeursAutre: {
      besoin: outillerLesActeursAutre,
      etp: outillerLesActeursAutreEtp,
      prestation: outillerLesActeursAutrePrestation,
      rh: outillerLesActeursAutreEtp !== null,
      precisions: outillerLesActeursAutrePrecisions,
    },
    formerLesAgentsPublics,
    formerLesAgentsPublicsNombre,
    formerLesSalariesAssociatifs,
    formerLesSalariesAssociatifsNombre,
    appuyerLaCertificationQualiopi,
    formerLesProfessionnelsAutre,
    formerLesProfessionnelsAutrePrecisions,
  } satisfies DefaultValues<BesoinsEnIngenierieFinanciereData>

  return defaultValues
}
