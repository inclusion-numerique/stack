import { BesoinsIngenierieFinanciereForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import {
  besoinsCategoriesLabels,
  besoinsLabels,
} from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/besoinsLabels'

type EndsWithEtp<T extends string> = T extends `${infer _Rest}Etp` ? T : never

export type EtpKey = Exclude<
  EndsWithEtp<keyof BesoinsIngenierieFinanciereForForm>,
  'totalEtp'
>

export const etpKeyLabel = {
  faireUnDiagnosticTerritorialEtp: besoinsLabels.faireUnDiagnosticTerritorial,
  coConstruireLaFeuilleDeRouteEtp: besoinsLabels.coConstruireLaFeuilleDeRoute,
  redigerLaFeuilleDeRouteEtp: besoinsLabels.redigerLaFeuilleDeRoute,
  animerEtMettreEnOeuvreEtp: besoinsLabels.animerEtMettreEnOeuvre,
  collecterDesDonneesTerritorialesEtp:
    besoinsLabels.collecterDesDonneesTerritoriales,
  creerUnVehiculeJuridiqueEtp: besoinsLabels.creerUnVehiculeJuridique,
  monterDesDossiersDeSubventionEtp: besoinsLabels.monterDesDossiersDeSubvention,
  sensibiliserLesActeursEtp: besoinsLabels.sensibiliserLesActeurs,
  structurerUneFiliereDeReconditionnementEtp:
    besoinsLabels.structurerUneFiliereDeReconditionnement,
  structurerUnFondsLocalEtp: besoinsLabels.structurerUnFondsLocal,

  outillerLesActeursAutreEtp: besoinsCategoriesLabels.outillerLesActeurs,
  formaliserLaFeuilleDeRouteAutreEtp:
    besoinsCategoriesLabels.formaliserLaFeuilleDeRoute,
  financerLeDeploiementAutreEtp: besoinsCategoriesLabels.financerLeDeploiement,
} satisfies {
  [key in EtpKey]: string
}

export const getEtpDetails = (besoins: BesoinsIngenierieFinanciereForForm) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { totalEtp: _, ...rest } = besoins

  const etpKeys: {
    key: keyof BesoinsIngenierieFinanciereForForm
    count: number
    text: string
    autrePrecision?: string
  }[] = []
  let total = 0

  for (const [key, value] of Object.entries(rest)) {
    if (key === 'totalEtp' || !key.endsWith('Etp')) {
      continue
    }
    const typedKey = key as EtpKey
    if (typeof value === 'number') {
      total += value
      etpKeys.push({
        key: typedKey,
        count: value,
        text: etpKeyLabel[typedKey],
        autrePrecision: typedKey.endsWith('AutreEtp')
          ? (besoins[
              // Replace last chars of string Etp by Precisions
              typedKey.replace(/Etp$/, 'Precisions') as keyof typeof besoins
            ] as string)
          : undefined,
      })
    }
  }
  return {
    etpKeys,
    total,
  }
}

export type EtpDetails = ReturnType<typeof getEtpDetails>
