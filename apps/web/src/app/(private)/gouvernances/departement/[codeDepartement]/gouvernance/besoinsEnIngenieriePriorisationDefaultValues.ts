import { DefaultValues } from 'react-hook-form/dist/types/form'
import { BesoinsIngenierieFinanciereForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { BesoinsEnIngenierieFinancierePrioriteData } from '@app/web/gouvernance/BesoinsEnIngenierieFinanciere'

export const getBesoinsEnIngenieriePriorisationDefaultValues = (
  gouvernance: BesoinsIngenierieFinanciereForForm,
): DefaultValues<BesoinsEnIngenierieFinancierePrioriteData> & {
  gouvernanceId: string
} => {
  if (!gouvernance?.besoinsEnIngenierieFinanciere) {
    return { gouvernanceId: gouvernance.id }
  }
  const { faireUnDiagnosticTerritorialPrestationPriorite } =
    gouvernance.besoinsEnIngenierieFinanciere

  const defaultValues = {
    gouvernanceId: gouvernance.id,
    faireUnDiagnosticTerritorialPrestationPriorite:
      faireUnDiagnosticTerritorialPrestationPriorite ?? undefined,
  } satisfies DefaultValues<BesoinsEnIngenierieFinancierePrioriteData>

  return defaultValues
}
