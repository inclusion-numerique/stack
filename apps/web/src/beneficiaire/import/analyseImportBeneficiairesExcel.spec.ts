import path from 'node:path'
import { readFileSync } from 'node:fs'
import {
  analyseImportBeneficiairesExcel,
  AnalysisSchema,
} from '@app/web/beneficiaire/import/analyseImportBeneficiairesExcel'
import { getBeneficiaireImportSheet } from '@app/web/beneficiaire/import/getBeneficiaireImportSheet'

const getSheetFromLocalFile = (file: string) => {
  const filePath = path.resolve(__dirname, `./_test/${file}`)

  const fileBuffer = readFileSync(filePath)

  return getBeneficiaireImportSheet(fileBuffer)
}

jest.setTimeout(10_000)

describe('analyseImportBeneficiairesExcel', () => {
  it('should parse a valid excel file', async () => {
    const workbook = getSheetFromLocalFile('import-beneficiaires_modele.xlsx')

    const result = await analyseImportBeneficiairesExcel(workbook)

    expect(result).toEqual({
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
            email: null,
            genre: 'Féminin',
            notesSupplementaires: null,
          },
          parsed: {
            anneeNaissance: 1970,
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

    expect(AnalysisSchema.safeParse(result).error).toBe(undefined)
  })

  it('should parse an excel with errors', async () => {
    const workbook = getSheetFromLocalFile('import-beneficiaire_errors.xlsx')
    const result = await analyseImportBeneficiairesExcel(workbook)

    expect(result).toEqual({
      status: 'error',
      rows: [
        {
          values: {
            nom: 'Exemple',
            prenom: 'Léa',
            anneeNaissance: 1970,
            numeroTelephone: '0102030405',
            communeCodeInsee: '01053',
            communeNom: 'Bourg-en-Bresse',
            communeCodePostal: '01000',
            email: null,
            genre: 'Féminin',
            notesSupplementaires: null,
          },
          parsed: {
            genre: 'Feminin',
            anneeNaissance: 1970,
            commune: {
              codePostal: '01000',
              nom: 'Bourg-en-Bresse',
              codeInsee: '01053',
            },
          },
        },
        {
          values: {
            nom: 'Exemple',
            prenom: null,
            anneeNaissance: 1970,
            numeroTelephone: null,
            communeCodeInsee: null,
            communeNom: null,
            communeCodePostal: null,
            email: null,
            genre: null,
            notesSupplementaires: null,
          },
          parsed: {
            genre: 'NonCommunique',
            anneeNaissance: 1970,
            commune: null,
          },
          errors: {
            prenom: 'Le prénom est obligatoire',
          },
        },
        {
          values: {
            nom: null,
            prenom: 'Albert',
            anneeNaissance: null,
            numeroTelephone: null,
            communeCodeInsee: null,
            communeNom: null,
            communeCodePostal: null,
            email: null,
            genre: null,
            notesSupplementaires: null,
          },
          parsed: {
            genre: 'NonCommunique',
            anneeNaissance: null,
            commune: null,
          },
          errors: {
            nom: 'Le nom est obligatoire',
          },
        },
      ],
    })

    expect(AnalysisSchema.safeParse(result).error).toBe(undefined)
  })
})
