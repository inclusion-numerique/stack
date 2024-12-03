import * as Excel from 'exceljs'
import { ActiviteForList } from '@app/web/cra/activitesQueries'
import {
  autonomieStars,
  autonomieValues,
  degreDeFinalisationDemarcheHints,
  degreDeFinalisationDemarcheLabels,
  materielLabels,
  niveauAtelierStars,
  niveauAtelierValues,
  structuresRedirectionLabels,
  thematiqueDemarcheAdministrativeLabels,
  thematiqueLabels,
  typeActiviteLabels,
  typeLieuLabels,
} from '@app/web/cra/cra'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import { booleanToYesNoLabel } from '@app/web/utils/yesNoBooleanOptions'
import {
  genreLabels,
  statutSocialLabels,
  trancheAgeLabels,
} from '@app/web/beneficiaire/beneficiaire'
import { ActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import {
  addExportMetadata,
  addFilters,
  autosizeColumns,
  setWorkbookMetadata,
  WorksheetUser,
} from '@app/web/worksheet/buildWorksheetHelpers'

export type BuildActivitesWorksheetInput = {
  // This is the user that requested the worksheet, it might not be the same user as the one that owns the activites
  user: WorksheetUser
  // This is the user that owns the activites
  mediateur: WorksheetUser
  filters: ActivitesFiltersLabels
  activites: ActiviteForList[]
  worksheetGenerationDate?: Date // Defaults to current date
}

const intraCellLineBreak = '\n'

const beneficiairesListCellFormatter =
  (activite: ActiviteForList) =>
  (
    toStringValue: (
      beneficiaire: ActiviteForList['accompagnements'][number]['beneficiaire'],
    ) => string,
  ) =>
    activite.accompagnements
      .map((accompagnement) => accompagnement.beneficiaire)
      .map(toStringValue)
      .join(intraCellLineBreak)

export const buildActivitesWorksheet = ({
  activites,
  user,
  filters,
  mediateur,
  worksheetGenerationDate = new Date(),
}: BuildActivitesWorksheetInput): Excel.Workbook => {
  const workbook = new Excel.Workbook()

  setWorkbookMetadata(workbook)

  const worksheet = workbook.addWorksheet('Activités')

  addExportMetadata(worksheet)({
    user,
    date: worksheetGenerationDate,
    activitesCount: activites.length,
  })

  addFilters(worksheet)(filters, {
    // only display the mediateur name if the user is NOT the mediateur used for export
    mediateurScope: user.id === mediateur.id ? null : mediateur,
  })

  const activitesTableHeaders = [
    'Date',
    'Type',
    'Nombre de participants',
    'Bénéficiaire',
    'Canaux d’accompagnement',
    'Lieu',
    'Durée (min)',
    'Nom de l’atelier',
    'Matériel numérique utilisé',
    'Thématique(s) d’accompagnement',
    'Nom de la démarche administrative',
    'Niveau d’autonomie du bénéficiaire',
    'Niveau de l’atelier',
    'Le bénéficiaire est-il orienté vers une autre structure ?',
    'La démarche est-elle finalisée ?',
    'Structure de redirection',
    'Commune de résidence du bénéficiaire',
    'Genre du bénéficiaire',
    'Tranche d’âge du bénéficiaire',
    'Statut du bénéficiaire',
    'Notes supplémentaires',
  ]

  const separatorRowBeforeTable = worksheet.addRow([''])

  const tableStartRowNumber = separatorRowBeforeTable.number + 1

  worksheet.addTable({
    name: 'Activités',
    ref: `A${tableStartRowNumber}`,
    headerRow: true,
    totalsRow: false,
    columns: activitesTableHeaders.map((label) => ({
      name: label,
      filterButton: true,
    })),
    rows: activites.map((activite) => {
      const beneficiairesListCell = beneficiairesListCellFormatter(activite)
      const {
        date,
        type,
        typeLieu,
        lieuCommune,
        lieuCodePostal,
        structure,
        duree,
        titreAtelier,
        materiel,
        thematiques,
        thematiquesDemarche,
        precisionsDemarche,
        autonomie,
        niveau,
        notes,
        orienteVersStructure,
        degreDeFinalisation,
        structureDeRedirection,
      } = activite

      return [
        date,
        typeActiviteLabels[type],
        activite.accompagnements.length,
        beneficiairesListCell(getBeneficiaireDisplayName),
        typeLieuLabels[typeLieu],
        structure
          ? `${structure.nom}, ${structure.codePostal} ${structure.commune}`
          : lieuCommune
            ? `${lieuCodePostal} ${lieuCommune}`
            : '',
        duree,
        titreAtelier || '',
        materiel
          .map((materielValue) => materielLabels[materielValue])
          .join(intraCellLineBreak),
        [
          ...thematiques.map((thematique) => thematiqueLabels[thematique]),
          ...thematiquesDemarche.map(
            (thematique) => thematiqueDemarcheAdministrativeLabels[thematique],
          ),
        ].join(intraCellLineBreak),
        precisionsDemarche || '',
        autonomie
          ? `${autonomieStars[autonomie]}/${autonomieValues.length}`
          : '',
        niveau
          ? `${niveauAtelierStars[niveau]}/${niveauAtelierValues.length}`
          : '',
        orienteVersStructure === null
          ? ''
          : booleanToYesNoLabel(orienteVersStructure),
        degreDeFinalisation
          ? `${degreDeFinalisationDemarcheLabels[degreDeFinalisation]} ${degreDeFinalisationDemarcheHints[degreDeFinalisation]}`.trim()
          : '',
        structureDeRedirection
          ? structuresRedirectionLabels[structureDeRedirection]
          : '',
        beneficiairesListCell(({ commune, communeCodePostal }) =>
          commune ? `${communeCodePostal} ${commune}` : '-',
        ),
        beneficiairesListCell(
          ({ genre }) => genreLabels[genre ?? 'NonCommunique'],
        ),
        beneficiairesListCell(
          ({ trancheAge }) => trancheAgeLabels[trancheAge ?? 'NonCommunique'],
        ),
        beneficiairesListCell(
          ({ statutSocial }) =>
            statutSocialLabels[statutSocial ?? 'NonCommunique'],
        ),
        notes || '',
      ]
    }),
  })

  const dateColumnIndex = 1
  worksheet
    .getColumn(dateColumnIndex)
    .eachCell({ includeEmpty: true }, (cell, rowNumber) => {
      if (rowNumber >= tableStartRowNumber && cell.value) {
        // eslint-disable-next-line no-param-reassign
        cell.numFmt = 'dd/mm/yyyy' // Set date format only for rows starting from tableStartRowNumber
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
