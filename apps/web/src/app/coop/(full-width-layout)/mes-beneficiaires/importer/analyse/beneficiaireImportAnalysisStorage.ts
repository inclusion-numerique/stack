import { AnalyseResponse } from '@app/web/app/coop/(full-width-layout)/mes-beneficiaires/importer/analyse/route'

const getStorageKey = (id: string) => `beneficiaire-import-analysis-${id}`

export const storeBeneficiaireImportAnalysis = ({
  id,
  analysis,
}: AnalyseResponse) => {
  sessionStorage.setItem(getStorageKey(id), JSON.stringify(analysis))
}

export const getBeneficiaireImportAnalysis = (
  id: string,
): AnalyseResponse | null => {
  const analysis = sessionStorage.getItem(getStorageKey(id))
  return analysis
    ? { analysis: JSON.parse(analysis) as AnalyseResponse['analysis'], id }
    : null
}
