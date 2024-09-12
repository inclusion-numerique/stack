import type { Row, Workbook } from 'exceljs'
import { type Commune, CommunesClient, getCommunesClient } from '@app/web/communes/findCommune'
import { anneeNaissanceValidation } from '@app/web/beneficiaire/BeneficiaireValidation'

/**
 * Get values from row
 * Headers: Nom	Prénom	Année de naissance	Commune			N° de téléphone	E-mail	Genre	Notes supplémentaires
 *      Code insee	Nom	Code postal
 * @param row
 */

type ParsedBeneficiaireRow = {
  values: {
    nom: string | null
    prenom: string | null
    anneeNaissance: string | null
    communeCodeInsee: string | null
    communeNom: string | null
    communeCodePostal: string | null
    numeroTelephone: string | null
    email: string | null
    genre: string | null
    notesSupplementaires: string | null
  }
  errors?: {
    nom?: string
    prenom?: string
    anneeNaissance?: string
    commune?: string
    numeroTelephone?: string
    email?: string
    genre?: string
    notesSupplementaires?: string
  }
}

const parseGenre = (genreRaw: string | null | undefined) => {
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

const parseAnneeNaissance = (anneeNaissanceRaw: string | null | undefined) => {
  if (!anneeNaissanceRaw) {
    return { value: null }
  }

  const anneeNaissanceInt = Number.parseInt(anneeNaissanceRaw, 10)

  const parsed = anneeNaissanceValidation.safeParse(anneeNaissanceInt)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  return { value: anneeNaissanceInt }
}

const rowIsEmpty = (row: Row) => row.values.every((value) => !value)

const parseBeneficiaireRow = (row: Row, communesClient: CommunesClient) => {
  const nom = row.values[1]
  const prenom = row.values[2]
  const anneeNaissance = row.values[3]
  const communeCodeInsee = row.values[4]
  // Formula cells have a result property and a formula property
  const communeNom =
    'formula' in row.values[5] ? row.values[5].result : row.values[5]
  const communeCodePostal =
    'formula' in row.values[6] ? row.values[6].result : row.values[6]
  const numeroTelephone = row.values[7]
  const email = row.values[8]
  const genre = row.values[9]
  const notesSupplementaires = row.values[10]

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
    if (!commune) {
      errors.communeCodeInsee = 'Code commune non trouvé'
    }
    if (commune.codePostal !== communeCodePostal) {
      errors.communeCodePostal =
        'Le code postal de la commune ne correspond pas'
    }
    if (commune.nom !== communeNom) {
      errors.communeNom = 'Le nom de la commune ne correspond pas'
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

export type ParsedBeneficiaireRow = Awaited<
  ReturnType<typeof parseBeneficiaireRow>
>

export const parseImportBeneficiaireExcel = async (
  workbook: Workbook,
): Promise<ParseImportBeneficiaireExcelResult> => {
  const beneficiairesWorksheet = workbook.getWorksheet('Bénéficiaires')

  if (!beneficiairesWorksheet) {
    return {
      error:
        'Le fichier ne correspond pas au modèle, il n’a pas de feuille "Bénéficiaires"',
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

export type ParseImportBeneficiaireExcelResult = {
  rows: ParsedBeneficiaireRow[]
  status: 'ok' | 'error'
}
