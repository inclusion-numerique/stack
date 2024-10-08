import { z } from 'zod'
import type { Genre } from '@prisma/client'
import type { CellObject, WorkSheet } from 'xlsx'
import * as XLSX from 'xlsx'
import {
  type Commune,
  type CommunesClient,
  createCommunesClient,
} from '@app/web/communes/communesClient'
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

const getCell = (
  worksheet: WorkSheet,
  rowNumber: number,
  colNumber: number,
): CellObject | undefined => {
  const cellAddress = XLSX.utils.encode_cell({
    c: colNumber - 1,
    r: rowNumber - 1,
  })
  return worksheet[cellAddress] as CellObject | undefined
}

function getCellValueAsString(
  worksheet: WorkSheet,
  rowNumber: number,
  colNumber: number,
): string | null {
  const cell = getCell(worksheet, rowNumber, colNumber)

  if (cell && cell.v != null && cell.v !== 0) {
    return cell.v.toString().trim()
  }
  return null
}

function getCellValueAsNumber(
  worksheet: WorkSheet,
  rowNumber: number,
  colNumber: number,
): number | null {
  const cell = getCell(worksheet, rowNumber, colNumber)
  if (cell && typeof cell.v === 'number') {
    return cell.v
  }

  if (cell && cell.v != null) {
    const value = Number(cell.v)
    if (!Number.isNaN(value)) {
      return value
    }
  }
  return null
}

const rowIsEmpty = (worksheet: WorkSheet, rowNumber: number): boolean => {
  // eslint-disable-next-line no-plusplus
  for (let colNumber = 1; colNumber <= 10; colNumber++) {
    const value = getCellValueAsString(worksheet, rowNumber, colNumber)
    if (value) {
      return false
    }
  }
  return true
}

const parseBeneficiaireRow = (
  worksheet: WorkSheet,
  rowNumber: number,
  communesClient: CommunesClient,
) => {
  const nom = getCellValueAsString(worksheet, rowNumber, 1)
  const prenom = getCellValueAsString(worksheet, rowNumber, 2)
  const anneeNaissance = getCellValueAsNumber(worksheet, rowNumber, 3)
  const communeNom = getCellValueAsString(worksheet, rowNumber, 4)
  const communeCodeInsee = getCellValueAsString(worksheet, rowNumber, 5)
  const communeCodePostal = getCellValueAsString(worksheet, rowNumber, 6)
  const numeroTelephone = getCellValueAsString(worksheet, rowNumber, 7)
  const email = getCellValueAsString(worksheet, rowNumber, 8)
  const genre = getCellValueAsString(worksheet, rowNumber, 9)
  const notesSupplementaires = getCellValueAsString(worksheet, rowNumber, 10)

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

export const importBeneficiaireWorksheetName = 'Bénéficiaires'

export const analyseImportBeneficiairesExcel = async (
  beneficiairesWorksheet: WorkSheet,
): Promise<Analysis> => {
  if (!beneficiairesWorksheet) {
    return {
      status: 'error',
      rows: [],
    }
  }

  const beneficiairesRowsStart = 4

  const result: ParsedBeneficiaireRow[] = []

  let rowNumber = beneficiairesRowsStart

  const communesClient = await createCommunesClient()

  let hasError = false

  while (!rowIsEmpty(beneficiairesWorksheet, rowNumber)) {
    const parsed = parseBeneficiaireRow(
      beneficiairesWorksheet,
      rowNumber,
      communesClient,
    )
    if (parsed.errors) {
      hasError = true
    }
    result.push(parsed)
    rowNumber += 1
  }

  return {
    status: hasError ? 'error' : 'ok',
    rows: result,
  }
}
