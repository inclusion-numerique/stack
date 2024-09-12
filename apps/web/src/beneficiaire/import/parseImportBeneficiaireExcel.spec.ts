import { resolve } from 'path'
import ExcelJS from 'exceljs'
import { readFileSync } from 'fs'
import { parseImportBeneficiaireExcel } from '@app/web/beneficiaire/import/parseImportBeneficiaireExcel'

const loadLocalExcelFile = async (file: string) => {
  const filePath = resolve(__dirname, `./_test/${file}`)

  const fileBuffer = readFileSync(filePath)

  const workbook = new ExcelJS.Workbook()

  await workbook.xlsx.load(fileBuffer)

  return workbook
}

describe('parseImportBeneficiaireExcel', () => {
  it('should parse a valid excel file', async () => {
    const workbook = await loadLocalExcelFile(
      'import-beneficiaires_modele.xlsx',
    )

    expect(await parseImportBeneficiaireExcel(workbook)).toEqual({
      status: 'ok',
      rows: [
        {
          values: {
            nom: 'Exemple',
            prenom: 'Léa',
            anneeNaissance: 1970,
            numeroTelephone: '0102030405',
            communeCodeInsee: '32057',
            communeNom: 'Blaziert',
            communeCodePostal: '32100',
            email: undefined,
            genre: 'Féminin',
            notesSupplementaires: undefined,
          },
          parsed: {
            genre: 'Feminin',
            commune: {
              codePostal: '32100',
              nom: 'Blaziert',
              codeInsee: '32057',
            },
          },
        },
      ],
    })
  })

  it('should parse an excel with errors', async () => {
    const workbook = await loadLocalExcelFile('import-beneficiaire_errors.xlsx')

    expect(await parseImportBeneficiaireExcel(workbook)).toEqual({
      status: 'error',
      rows: [
        {
          values: {
            nom: null,
            prenom: 'Léa',
            anneeNaissance: 1970,
            numeroTelephone: '0102030405',
            communeCodeInsee: '32057',
            communeNom: 'Blaziert',
            communeCodePostal: '32100',
            email: undefined,
            genre: 'Féminin',
            notesSupplementaires: undefined,
          },
          parsed: {
            genre: 'Feminin',
            commune: {
              codePostal: '32100',
              nom: 'Blaziert',
              codeInsee: '32057',
            },
          },
          errors: {
            nom: 'Le nom est obligatoire',
          },
        },
      ],
    })
  })
})
