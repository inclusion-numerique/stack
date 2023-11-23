import { DefaultValues } from 'react-hook-form/dist/types/form'
import { BesoinsEnIngenierieFinancierePrioriteData } from '@app/web/gouvernance/BesoinsEnIngenierieFinanciere'
import { BesoinsIngenierieFinanciereForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import {
  besoinsCategoriesLabels,
  besoinsLabels,
} from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/besoinsLabels'
import { getEtpDetails } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/besoinsEtps'
import { numberToString } from '@app/web/utils/formatNumber'

type EndsWithPriorite<T extends string> = T extends `${infer _Rest}Priorite`
  ? T
  : never

export type PrioriteKey = EndsWithPriorite<
  keyof BesoinsEnIngenierieFinancierePrioriteData['priorites']
>

export const prioriteKeyLabels = {
  animerEtMettreEnOeuvrePrestationPriorite:
    besoinsLabels.animerEtMettreEnOeuvre,
  appuyerLaCertificationQualiopiPriorite:
    besoinsLabels.appuyerLaCertificationQualiopi,
  collecterDesDonneesTerritorialesPrestationPriorite:
    besoinsLabels.collecterDesDonneesTerritoriales,
  coConstruireLaFeuilleDeRoutePrestationPriorite:
    besoinsLabels.coConstruireLaFeuilleDeRoute,
  creerUnVehiculeJuridiquePrestationPriorite:
    besoinsLabels.creerUnVehiculeJuridique,
  faireUnDiagnosticTerritorialPrestationPriorite:
    besoinsLabels.faireUnDiagnosticTerritorial,
  financerLeDeploiementAutrePrestationPriorite:
    besoinsCategoriesLabels.financerLeDeploiement,
  formaliserLaFeuilleDeRouteAutrePrestationPriorite:
    besoinsCategoriesLabels.formaliserLaFeuilleDeRoute,
  formerLesAgentsPublicsPriorite: besoinsLabels.formerLesAgentsPublics,
  formerLesProfessionnelsAutrePriorite:
    besoinsCategoriesLabels.formerLesProfessionnels,
  formerLesSalariesAssociatifsPriorite:
    besoinsLabels.formerLesSalariesAssociatifs,
  monterDesDossiersDeSubventionPrestationPriorite:
    besoinsLabels.monterDesDossiersDeSubvention,
  outillerLesActeursAutrePrestationPriorite:
    besoinsCategoriesLabels.outillerLesActeurs,
  redigerLaFeuilleDeRoutePrestationPriorite:
    besoinsLabels.redigerLaFeuilleDeRoute,
  sensibiliserLesActeursPrestationPriorite:
    besoinsLabels.sensibiliserLesActeurs,
  structurerUneFiliereDeReconditionnementPrestationPriorite:
    besoinsLabels.structurerUneFiliereDeReconditionnement,
  structurerUnFondsLocalPrestationPriorite:
    besoinsLabels.structurerUnFondsLocal,
  totalEtpPriorite: 'Ressource humaine',
} satisfies { [key in PrioriteKey]: string }

export const getPriorisationCardInfos = ({
  defaultValue,
  besoinsEnIngenierieFinanciere,
}: {
  defaultValue: DefaultValues<BesoinsEnIngenierieFinancierePrioriteData> & {
    gouvernanceId: string
  }
  besoinsEnIngenierieFinanciere: BesoinsIngenierieFinanciereForForm
}) => {
  const priorites = defaultValue.priorites ?? {}

  return Object.entries(priorites).map(([prioriteKey, priorite]) => {
    const typedKey = prioriteKey as PrioriteKey

    if (typedKey === 'totalEtpPriorite') {
      return {
        titre: `${prioriteKeyLabels[typedKey]} (${numberToString(
          besoinsEnIngenierieFinanciere.totalEtp,
        )} ETP)`,
        text: '',
        prioriteKey: typedKey,
        priorite,
        etpDetails: getEtpDetails(besoinsEnIngenierieFinanciere),
        autrePrecision: null as string | null,
      }
    }

    const isAutre =
      typedKey.endsWith('AutrePriorite') ||
      typedKey.endsWith('AutrePrestationPriorite')
    const precisionKey = isAutre
      ? typedKey
          .replace(/PrestationPriorite$/, 'Precisions')
          .replace(/Priorite$/, 'Precisions')
      : null

    // TODO Title and text for formations

    return {
      titre: 'Prestation de service',
      text: prioriteKeyLabels[typedKey],
      prioriteKey: typedKey,
      priorite,
      autrePrecision: precisionKey
        ? (besoinsEnIngenierieFinanciere[precisionKey] as string)
        : undefined,
    }
  })
}

export type PriorisationCardInfo = ReturnType<
  typeof getPriorisationCardInfos
>[number]
