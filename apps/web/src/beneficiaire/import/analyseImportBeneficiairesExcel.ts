import type { Cell, Row, Workbook } from 'exceljs'
import { z } from 'zod'
import type { Genre } from '@prisma/client'
import {
  type Commune,
  CommunesClient,
  getCommunesClient,
} from '@app/web/communes/findCommune'
import { anneeNaissanceValidation } from '@app/web/beneficiaire/BeneficiaireValidation'
import { genreValues } from '@app/web/beneficiaire/beneficiaire'

export const ParsedBeneficiaireRowSchema = z.object({
  values: z.object({
    nom: z.string().nullish(),
    prenom: z.string().nullish(),
    anneeNaissance: z.union([z.string().nullish(), z.number().nullish()]),
    numeroTelephone: z.string().nullish(),
    communeCodeInsee: z.string().nullish(),
    communeNom: z.string().nullish(),
    communeCodePostal: z.string().nullish(),
    email: z.string().nullish(),
    genre: z.string().nullish(),
    notesSupplementaires: z.string().nullish(),
  }),
  parsed: z.object({
    commune: z
      .object({
        codePostal: z.string(),
        nom: z.string(),
        codeInsee: z.string(),
      })
      .nullable(),
    anneeNaissance: z.number().nullable(),
    genre: z.enum(genreValues).nullable(),
  }),
  errors: z
    .object({
      nom: z.string().optional(),
      prenom: z.string().optional(),
      anneeNaissance: z.string().optional(),
      communeCodeInsee: z.string().optional(),
      communeNom: z.string().optional(),
      communeCodePostal: z.string().optional(),
      numeroTelephone: z.string().optional(),
      email: z.string().optional(),
      genre: z.string().optional(),
      notesSupplementaires: z.string().optional(),
    })
    .nullish(),
})

export type ParsedBeneficiaireRow = z.infer<typeof ParsedBeneficiaireRowSchema>

export const AnalysisSchema = z.object({
  rows: z.array(ParsedBeneficiaireRowSchema),
  status: z.enum(['ok', 'error']),
})

export type Analysis = z.infer<typeof AnalysisSchema>

const parseGenre = (
  genreRaw: string | null | undefined,
): {
  value?: Genre | null
  error?: string
} => {
  if (!genreRaw) {
    return { value: 'NonCommunique' }
  }

  if (genreRaw.startsWith('F')) {
    return { value: 'Feminin' }
  }
  if (genreRaw.startsWith('M')) {
    return { value: 'Masculin' }
  }

  return { error: 'Genre invalide' }
}

const parseAnneeNaissance = (anneeNaissanceRaw: number | null | undefined) => {
  if (!anneeNaissanceRaw) {
    return { value: null }
  }

  const parsed = anneeNaissanceValidation.safeParse(anneeNaissanceRaw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  return { value: anneeNaissanceRaw }
}

const rowIsEmpty = (row: Row) => (row.values as Cell[]).every((value) => !value)

const getCellValue = (
  cell: Cell | undefined,
): string | number | Date | null => {
  if (!cell) {
    return null
  }
  if ('formula' in cell) {
    return cell.result ?? null
  }

  return cell
}

const getCellValueAsString = (cell: Cell | undefined): string | null => {
  const value = getCellValue(cell)
  if (value === null) {
    return null
  }
  return value.toString().trim()
}

const getCellValueAsNumber = (cell: Cell | undefined): number | null => {
  const value = getCellValue(cell)
  if (value === null) {
    return null
  }
  if (typeof value === 'number') {
    return value
  }
  return Number.parseInt(value.toString().trim(), 10)
}

const parseBeneficiaireRow = (row: Row, communesClient: CommunesClient) => {
  const values = row.values as Cell[]

  const nom = getCellValueAsString(values[1])
  const prenom = getCellValueAsString(values[2])
  const anneeNaissance = getCellValueAsNumber(values[3])
  const communeCodeInsee = getCellValueAsString(values[4])
  const communeNom = getCellValueAsString(values[5])
  const communeCodePostal = getCellValueAsString(values[6])
  const numeroTelephone = getCellValueAsString(values[7])
  const email = getCellValueAsString(values[8])
  const genre = getCellValueAsString(values[9])
  const notesSupplementaires = getCellValueAsString(values[10])

  const errors: ParsedBeneficiaireRow['errors'] = {}

  let commune: Commune | null = null

  if (!nom) {
    errors.nom = 'Le nom est obligatoire'
  }
  if (!prenom) {
    errors.prenom = 'Le prénom est obligatoire'
  }

  if (communeCodeInsee) {
    commune = communesClient.findCommuneByInsee(communeCodeInsee)
    if (commune) {
      if (commune.codePostal !== communeCodePostal) {
        errors.communeCodePostal =
          'Le code postal de la commune ne correspond pas'
      }
      if (commune.nom !== communeNom) {
        errors.communeNom = 'Le nom de la commune ne correspond pas'
      }
    } else {
      errors.communeCodeInsee = 'Code commune non trouvé'
    }
  }

  const parsedGenre = parseGenre(genre)
  if (parsedGenre.error) {
    errors.genre = parsedGenre.error
  }

  const parsedAnneeNaissance = parseAnneeNaissance(anneeNaissance)
  if (parsedAnneeNaissance.error) {
    errors.anneeNaissance = parsedAnneeNaissance.error
  }

  const result: ParsedBeneficiaireRow = {
    values: {
      nom,
      prenom,
      anneeNaissance,
      numeroTelephone,
      communeCodeInsee,
      communeNom,
      communeCodePostal,
      email,
      genre,
      notesSupplementaires,
    },
    parsed: {
      genre: parsedGenre.value ?? null,
      commune,
      anneeNaissance: parsedAnneeNaissance.value ?? null,
    },
  }

  if (Object.entries(errors).length > 0) {
    result.errors = errors
  }
  return result
}

export const analyseImportBeneficiairesExcel = async (
  workbook: Workbook,
): Promise<Analysis> => {
  const beneficiairesWorksheet = workbook.getWorksheet('Bénéficiaires')

  if (!beneficiairesWorksheet) {
    return {
      status: 'error',
      rows: [],
    }
  }

  const beneficiairesRowsStart = 3

  const result: ParsedBeneficiaireRow[] = []

  let rowNumber = beneficiairesRowsStart
  let currentRow = beneficiairesWorksheet.getRow(rowNumber)

  const communesClient = await getCommunesClient()

  let hasError = false

  while (!rowIsEmpty(currentRow)) {
    const parsed = parseBeneficiaireRow(currentRow, communesClient)
    if (parsed.errors) {
      hasError = true
    }
    result.push(parsed)
    rowNumber += 1
    currentRow = beneficiairesWorksheet.getRow(rowNumber)
  }

  return {
    status: hasError ? 'error' : 'ok',
    rows: result,
  }
}
