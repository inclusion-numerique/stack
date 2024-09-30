import XLSX, { type WorkSheet } from 'xlsx'
import { importBeneficiaireWorksheetName } from '@app/web/beneficiaire/import/analyseImportBeneficiairesExcel'

export const getBeneficiaireImportSheet = (
  data: Buffer | ArrayBuffer,
): WorkSheet => {
  const workbook = XLSX.read(data, {
    sheets: [importBeneficiaireWorksheetName],
  })

  const sheet = workbook.Sheets[importBeneficiaireWorksheetName]
  if (!sheet) {
    throw new Error(
      `Le fichier n'a pas de feuille "${importBeneficiaireWorksheetName}"`,
    )
  }

  return sheet
}
