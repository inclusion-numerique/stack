import * as Excel from 'exceljs'
import {
  autosizeColumns,
  setWorkbookMetadata,
} from '@app/web/worksheet/buildWorksheetHelpers'
import { NonEmptyConseillerNumeriqueCrasResult } from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'
import { craConseillerNumeriqueToPrismaModel } from '@app/web/external-apis/conseiller-numerique/crasConseillerNumeriqueToPrismaModel'

export type BuildArchivesCrasV1WorksheetInput = {
  v1Cras: NonEmptyConseillerNumeriqueCrasResult
}

const intraCellLineBreak = '\n'

const multilineCellContent = (values: string[]) =>
  values.join(intraCellLineBreak)

const v1CraHeaders = [
  'Date Accompagnement',
  'Date Création',
  'Commune',
  'Code Commune',
  'Code Postal',
  'Département',
  'Région',
  'Nom Structure',
  'Type Structure',
  'SIRET',
  'Canal',
  'Activité',
  'Durée (min)',
  'Nb Participants',
  'Nb Participants Récurrents',
  'Organismes',
  'Atelier',
  'Individuel',
  'Redirection',
  'Statut Emploi',
  'Statut Étudiant',
  'Statut Retraité',
  'Statut Sans Emploi',
  'Statut Hétérogène',
  'Âge <12 ans',
  'Âge 12-18 ans',
  'Âge 18-35 ans',
  'Âge 35-60 ans',
  'Âge >60 ans',
  'Thèmes',
  'Annotation',
  'Sous-Thèmes Informatique',
  'Sous-Thèmes Accompagner',
  'Sous-Thèmes Santé',
  'Sous-Thèmes Bureautique',
  'ID interne',
]

export const buildArchivesCrasV1Worksheet = ({
  v1Cras,
}: BuildArchivesCrasV1WorksheetInput): Excel.Workbook => {
  const workbook = new Excel.Workbook()

  setWorkbookMetadata(workbook)

  const worksheet = workbook.addWorksheet('Activités')

  const tableStartRowNumber = 1

  const dateColumnIndex = 1
  const createdAtColumnIndex = 2

  // TODO will use query from our own database
  const importedAt = new Date()
  const cleanedCras = v1Cras.cras.map((item) =>
    craConseillerNumeriqueToPrismaModel({ item, importedAt }),
  )

  worksheet.addTable({
    name: 'Cras',
    ref: `A${tableStartRowNumber}`,
    headerRow: true,
    totalsRow: false,
    columns: v1CraHeaders.map((label) => ({
      name: label,
      filterButton: true,
    })),
    rows: cleanedCras.map((item) => {
      const {
        themes,
        nomCommune,
        nbParticipantsRecurrents,
        nbParticipants,
        dateAccompagnement,
        codeCommune,
        canal,
        activite,
        duree,
        codePostal,
        createdAt,
        id,
        organismes,
        accompagnementAtelier,
        accompagnementIndividuel,
        accompagnementRedirection,
        ageDe12a18Ans,
        ageDe18a35Ans,
        ageDe35a60Ans,
        ageMoins12Ans,
        agePlus60Ans,
        sousThemesEquipementInformatique,
        sousThemesSante,
        sousThemesAccompagner,
        sousThemesTraitementTexte,
        annotation,
        statutEnEmploi,
        statutEtudiant,
        statutHeterogene,
        statutRetraite,
        statutSansEmploi,
        structureCodeDepartement,
        structureCodeRegion,
        structureNom,
        structureSiret,
        structureType,
      } = item

      return [
        // 1. Date Accompagnement
        dateAccompagnement ? new Date(dateAccompagnement) : null,
        // 2. Date Création
        createdAt ? new Date(createdAt) : null,
        // 3. Commune
        nomCommune,
        // 4. Code Commune
        codeCommune,
        // 5. Code Postal
        codePostal,
        // 6. Département
        structureCodeDepartement,
        // 7. Région
        structureCodeRegion,
        // 8. Nom Structure
        structureNom,
        // 9. Type Structure
        structureType,
        // 10. SIRET
        structureSiret,
        // 12. Canal
        canal,
        // 13. Activité
        activite,
        // 14. Durée (min)
        duree,
        // 15. Nb Participants
        nbParticipants,
        // 16. Nb Participants Récurrents
        nbParticipantsRecurrents,
        // 17. Organismes (peut être un tableau)
        organismes
          ? Object.entries(organismes)
              .map(([key, value]) => `${key}: ${value?.toString()}`)
              .join(', ')
          : null,
        // 18. Atelier
        accompagnementAtelier ? 'Oui' : 'Non',
        // 19. Individuel
        accompagnementIndividuel ? 'Oui' : 'Non',
        // 20. Redirection
        accompagnementRedirection ? 'Oui' : 'Non',
        // 21. Statut Emploi
        statutEnEmploi,
        // 22. Statut Étudiant
        statutEtudiant,
        // 23. Statut Retraité
        statutRetraite,
        // 24. Statut Sans Emploi
        statutSansEmploi,
        // 25. Statut Hétérogène
        statutHeterogene,
        // 26. Âge <12 ans
        ageMoins12Ans,
        // 27. Âge 12-18 ans
        ageDe12a18Ans,
        // 28. Âge 18-35 ans
        ageDe18a35Ans,
        // 29. Âge 35-60 ans
        ageDe35a60Ans,
        // 30. Âge >60 ans
        agePlus60Ans,
        // 31. Thèmes (peut être un tableau)
        Array.isArray(themes) ? multilineCellContent(themes) : themes,
        // Annotation
        annotation,
        // 32. Sous-Thèmes Informatique (peut être un tableau)
        Array.isArray(sousThemesEquipementInformatique)
          ? multilineCellContent(sousThemesEquipementInformatique)
          : null,
        // 33. Sous-Thèmes Accompagner (peut être un tableau)
        Array.isArray(sousThemesAccompagner)
          ? multilineCellContent(sousThemesAccompagner)
          : null,
        // 34. Sous-Thèmes Santé (peut être un tableau)
        Array.isArray(sousThemesSante)
          ? multilineCellContent(sousThemesSante)
          : null,
        // 35. Sous-Thèmes Bureautique (peut être un tableau)
        Array.isArray(sousThemesTraitementTexte)
          ? multilineCellContent(sousThemesTraitementTexte)
          : null,

        // 36. ID interne
        id,
      ]
    }),
  })

  worksheet
    .getColumn(dateColumnIndex)
    .eachCell({ includeEmpty: true }, (cell, rowNumber) => {
      if (rowNumber >= tableStartRowNumber && cell.value) {
        // eslint-disable-next-line no-param-reassign
        cell.numFmt = 'dd/mm/yyyy' // Set date format only for rows starting from tableStartRowNumber
      }
    })

  worksheet
    .getColumn(createdAtColumnIndex)
    .eachCell({ includeEmpty: true }, (cell, rowNumber) => {
      if (rowNumber >= tableStartRowNumber && cell.value) {
        // eslint-disable-next-line no-param-reassign
        cell.numFmt = 'dd/mm/yyyy HH:mm' // Set date format only for rows starting from tableStartRowNumber
      }
    })

  // Ensure that the rows auto-adjust their height to fit the wrapped text and displays break lines
  worksheet.eachRow((row) => {
    // eslint-disable-next-line no-param-reassign
    row.alignment = { wrapText: true, vertical: 'top' }
  })

  autosizeColumns(worksheet)

  return workbook
}
