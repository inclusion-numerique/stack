import { DefaultValues } from 'react-hook-form/dist/types/form'
import { BesoinsIngenierieFinanciereForForm } from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import {
  besoinsCategoriesLabels,
  besoinsLabels,
  formationsLabels,
} from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/besoinsLabels'
import { getEtpDetails } from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/besoinsEtps'
import { BesoinsEnIngenierieFinancierePrioriteData } from '@app/web/gouvernance/BesoinsEnIngenierieFinanciere'
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
      ? (typedKey
          .replace(/PrestationPriorite$/, 'Precisions')
          .replace(
            /Priorite$/,
            'Precisions',
          ) as keyof BesoinsIngenierieFinanciereForForm)
      : null

    const isFormation =
      typedKey === 'formerLesSalariesAssociatifsPriorite' ||
      typedKey === 'formerLesAgentsPublicsPriorite'

    if (!isFormation) {
      return {
        titre: 'Prestation de service',
        text: prioriteKeyLabels[typedKey],
        prioriteKey: typedKey,
        priorite,
        autrePrecision: precisionKey
          ? (besoinsEnIngenierieFinanciere[precisionKey] as string)
          : undefined,
      }
    }

    // Formation
    const formationCountKey = typedKey.replace(/Priorite$/, 'Nombre') as
      | 'formerLesSalariesAssociatifsNombre'
      | 'formerLesAgentsPublicsNombre'

    const formationLabelKey = typedKey.replace(/Priorite$/, '') as
      | 'formerLesSalariesAssociatifs'
      | 'formerLesAgentsPublics'

    const count = besoinsEnIngenierieFinanciere[formationCountKey]

    const text = `Estimation du nombre de personnes à former : ${numberToString(
      count ?? 0,
    )}`

    return {
      titre: formationsLabels[formationLabelKey],
      text,
      prioriteKey: typedKey,
      priorite,
    }
  })
}

export type PriorisationCardInfo = ReturnType<
  typeof getPriorisationCardInfos
>[number]
