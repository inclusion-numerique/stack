import * as Excel from 'exceljs'
import { Worksheet } from 'exceljs'
import { ActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import { MesStatistiquesPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/getMesStatistiquesPageData'
import {
  addExportMetadata,
  addFilters,
  addTitleRow,
  autosizeColumns,
  setWorkbookMetadata,
  WorksheetUser,
} from '@app/web/worksheet/buildWorksheetHelpers'
import { numberToPercentage } from '@app/web/utils/formatNumber'
import { QuantifiedShare } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/quantifiedShare'

const addStatistiquesGenerales =
  (worksheet: Excel.Worksheet) =>
  ({ totalCounts, accompagnementsParMois }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Statistiques générales sur vos accompagnements')
    worksheet.addRow([
      'Accompagnements au total',
      totalCounts.accompagnements.total,
    ])
    worksheet.addRow([
      'Bénéficiaires accompagnés',
      totalCounts.beneficiaires.total,
    ])
    worksheet.addRow(['Bénéficiaires suivis', totalCounts.beneficiaires.suivis])
    worksheet.addRow([
      'Nom Bénéficiaires anonymes',
      totalCounts.beneficiaires.anonymes,
    ])
    worksheet.addRow([
      'Accompagnements sur les 12 derniers mois',
      ...accompagnementsParMois.map(({ label }) => label),
    ])
    worksheet.addRow(['', ...accompagnementsParMois.map(({ count }) => count)])
    worksheet.addRow([])
  }

const addStatistiquesActivites =
  (worksheet: Excel.Worksheet) =>
  ({
    totalCounts: { accompagnements, activites },
  }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Statistiques sur vos activités')
    worksheet.addRow([
      'Accompagnements individuels',
      accompagnements.individuels.total,
      numberToPercentage(accompagnements.individuels.proportion),
    ])
    worksheet.addRow([
      'Ateliers collectifs',
      accompagnements.collectifs.total,
      numberToPercentage(accompagnements.collectifs.proportion),
    ])
    worksheet.addRow([
      'Aide aux démarches administratives',
      accompagnements.demarches.total,
      numberToPercentage(accompagnements.demarches.proportion),
    ])
    worksheet.addRow([
      'Nombre total de participants aux ateliers',
      activites.collectifs.participants,
    ])
    worksheet.addRow([])
  }

const addQuantifiedShareRows = (
  worksheet: Worksheet,
  items: QuantifiedShare[],
) => {
  for (const { label, count, proportion } of items) {
    worksheet.addRow([label, count, numberToPercentage(proportion)])
  }
}

const addStatistiquesThematiquesMediationNumerique =
  (worksheet: Excel.Worksheet) =>
  ({ activites: { thematiques } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Thématiques Médiation numérique')
    addQuantifiedShareRows(worksheet, thematiques)
    worksheet.addRow([])
  }

const addStatistiquesThematiquesDemarchesAdministratives =
  (worksheet: Excel.Worksheet) =>
  ({ activites: { thematiquesDemarches } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Thématiques Démarches administratives')
    addQuantifiedShareRows(worksheet, thematiquesDemarches)
    worksheet.addRow([])
  }

const addStatistiquesMaterielUtilises =
  (worksheet: Excel.Worksheet) =>
  ({ activites: { materiels } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Matériel utilisés')
    addQuantifiedShareRows(worksheet, materiels)
    worksheet.addRow([])
  }

const addStatistiquesCanauxActivites =
  (worksheet: Excel.Worksheet) =>
  ({ activites: { typeLieu } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Canaux des activités')
    addQuantifiedShareRows(worksheet, typeLieu)
    worksheet.addRow([])
  }

const addStatistiquesDureesActivites =
  (worksheet: Excel.Worksheet) =>
  ({ activites: { durees } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Durées des activités')
    addQuantifiedShareRows(worksheet, durees)
    worksheet.addRow([])
  }

const addStatistiquesNombreActivitesParLieux =
  (worksheet: Excel.Worksheet) =>
  ({ structures }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Nombre d’activités par lieux')
    addQuantifiedShareRows(worksheet, structures)
    worksheet.addRow([])
  }

const addStatistiquesGenre =
  (worksheet: Excel.Worksheet) =>
  ({ beneficiaires: { genres } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Genre')
    addQuantifiedShareRows(worksheet, genres)
    worksheet.addRow([])
  }

const addStatistiquesTranchesAge =
  (worksheet: Excel.Worksheet) =>
  ({ beneficiaires: { trancheAges } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Tranches d’âge')
    addQuantifiedShareRows(worksheet, trancheAges)
    worksheet.addRow([])
  }

const addStatistiquesStatus =
  (worksheet: Excel.Worksheet) =>
  ({ beneficiaires: { statutsSocial } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Statuts')
    addQuantifiedShareRows(worksheet, statutsSocial)
    worksheet.addRow([])
  }

const addStatistiquesCommuneResidenceBeneficiaires =
  (worksheet: Excel.Worksheet) =>
  ({ beneficiaires: { communes } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Commune de résidence des bénéficiaires')
    addQuantifiedShareRows(worksheet, communes)
    worksheet.addRow([])
  }

export type BuildStatistiquesWorksheetInput = {
  // This is the user that requested the worksheet, it might not be the same user as the one that owns the activites
  user: WorksheetUser
  // This is the user that owns the activites
  mediateur: WorksheetUser
  filters: ActivitesFiltersLabels
  statistiques: MesStatistiquesPageData
  worksheetGenerationDate?: Date // Defaults to current date
}

export const buildStatistiquesWorksheet = ({
  user,
  mediateur,
  filters,
  statistiques,
  worksheetGenerationDate = new Date(),
}: BuildStatistiquesWorksheetInput): Excel.Workbook => {
  const workbook = new Excel.Workbook()

  setWorkbookMetadata(workbook)

  const worksheet = workbook.addWorksheet('Statistiques')

  addExportMetadata(worksheet)({ user, date: worksheetGenerationDate })
  addFilters(worksheet)(filters, {
    // only display the mediateur name if the user is NOT the mediateur used for export
    mediateurScope: user.id === mediateur.id ? null : mediateur,
  })
  addStatistiquesGenerales(worksheet)(statistiques)
  addStatistiquesActivites(worksheet)(statistiques)
  addStatistiquesThematiquesMediationNumerique(worksheet)(statistiques)
  addStatistiquesThematiquesDemarchesAdministratives(worksheet)(statistiques)
  addStatistiquesMaterielUtilises(worksheet)(statistiques)
  addStatistiquesCanauxActivites(worksheet)(statistiques)
  addStatistiquesDureesActivites(worksheet)(statistiques)
  addStatistiquesNombreActivitesParLieux(worksheet)(statistiques)
  addTitleRow(worksheet)('Statistiques sur vos bénéficiaires')
  addStatistiquesGenre(worksheet)(statistiques)
  addStatistiquesTranchesAge(worksheet)(statistiques)
  addStatistiquesStatus(worksheet)(statistiques)
  addStatistiquesCommuneResidenceBeneficiaires(worksheet)(statistiques)

  autosizeColumns(worksheet)

  return workbook
}
