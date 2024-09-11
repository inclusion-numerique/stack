import * as Excel from 'exceljs'
import { ActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import { AuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { MesStatistiquesPageData } from '@app/web/app/coop/mes-statistiques/getMesStatistiquesPageData'

const addTitleRow =
  (worksheet: Excel.Worksheet) => (title: string, bgColor?: string) => {
    const row = worksheet.addRow([title])
    row.getCell(1).font = { bold: true }
    if (!bgColor) return
    row.getCell(1).fill = {
      bgColor: { argb: bgColor },
      pattern: 'solid',
      type: 'pattern',
    }
  }

const addStatistiquesFilters =
  (worksheet: Excel.Worksheet) =>
  ({ du, au, typeLieu, nomLieu, type }: Partial<ActivitesFiltersLabels>) => {
    addTitleRow(worksheet)('Filtres :')
    worksheet.addRow(['Début de période', du])
    worksheet.addRow(['Fin de période', au])
    worksheet.addRow(['Type de lieu', typeLieu])
    worksheet.addRow(['Nom du lieu', nomLieu])
    worksheet.addRow(["Type d'accompagnement", type])
    worksheet.addRow([])
  }

const getRole = (
  user: Pick<
    AuthenticatedMediateur,
    'firstName' | 'lastName' | 'role' | 'mediateur' | 'coordinateur'
  >,
): string =>
  user.mediateur.conseillerNumerique?.id == null
    ? user.role
    : 'Conseiller numérique'

const formattedDate = (date: Date) =>
  `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`

const formattedTime = (date: Date) =>
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

const addStatistiquesExportInfo =
  (worksheet: Excel.Worksheet) =>
  (
    user: Pick<
      AuthenticatedMediateur,
      'firstName' | 'lastName' | 'role' | 'mediateur' | 'coordinateur'
    >,
    date: Date,
  ) => {
    addTitleRow(worksheet)('Informations export')

    worksheet.addRow(['Nom', user.lastName])
    worksheet.addRow(['Prénom', user.firstName])
    worksheet.addRow(['Rôle', getRole(user)])
    worksheet.addRow(["Date d'export", formattedDate(date)])
    worksheet.addRow(["Heure d'export", formattedTime(date)])
    worksheet.addRow([])
  }

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
      ...accompagnementsParMois.map(({ count }: { count: number }) => count),
    ])
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
      `${accompagnements.individuels.proportion.toFixed(2)}%`,
    ])
    worksheet.addRow([
      'Ateliers collectifs',
      accompagnements.collectifs.total,
      `${accompagnements.collectifs.proportion.toFixed(2)}%`,
    ])
    worksheet.addRow([
      'Aide aux démarches administratives',
      accompagnements.demarches.total,
      `${accompagnements.demarches.proportion.toFixed(2)}%`,
    ])
    worksheet.addRow([
      'Nombre total de participants aux ateliers',
      activites.collectifs.participants,
    ])
    worksheet.addRow([])
  }

const addStatistiquesThematiquesMediationNumerique =
  (worksheet: Excel.Worksheet) =>
  ({ activites: { thematiques } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Thématiques Médiation numérique')
    for (const { label, count, proportion } of thematiques) {
      worksheet.addRow([label, count, `${proportion}%`])
    }
    worksheet.addRow([])
  }

const addStatistiquesThematiquesDemarchesAdministratives =
  (worksheet: Excel.Worksheet) =>
  ({ activites: { thematiquesDemarches } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Thématiques Démarches administratives')
    for (const { label, count, proportion } of thematiquesDemarches) {
      worksheet.addRow([label, count, `${proportion}%`])
    }
    worksheet.addRow([])
  }

const addStatistiquesMaterielUtilises =
  (worksheet: Excel.Worksheet) =>
  ({ activites: { materiels } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Matériel utilisés')
    for (const { label, count, proportion } of materiels) {
      worksheet.addRow([label, count, `${proportion}%`])
    }
    worksheet.addRow([])
  }

const addStatistiquesCanauxActivites =
  (worksheet: Excel.Worksheet) =>
  ({ activites: { mergedTypeLieu } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Canaux des activités')
    for (const { label, count, proportion } of mergedTypeLieu) {
      worksheet.addRow([label, count, `${proportion}%`])
    }
    worksheet.addRow([])
  }

const addStatistiquesDureesActivites =
  (worksheet: Excel.Worksheet) =>
  ({ activites: { durees } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Durées des activités')
    for (const { label, count, proportion } of durees) {
      worksheet.addRow([label, count, `${proportion}%`])
    }
    worksheet.addRow([])
  }

const addStatistiquesNombreActivitesParLieux =
  (worksheet: Excel.Worksheet) =>
  ({ structures }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)("Nombre d'activités par lieux", 'F4CCCCFF')
    for (const { nom, count, proportion } of structures) {
      worksheet.addRow([nom, count, `${proportion}%`])
    }
    worksheet.addRow([])
  }

const addStatistiquesGenre =
  (worksheet: Excel.Worksheet) =>
  ({ beneficiaires: { genres } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Genre')
    for (const { label, count, proportion } of genres) {
      worksheet.addRow([label, count, `${proportion}%`])
    }
    worksheet.addRow([])
  }

const addStatistiquesTranchesAge =
  (worksheet: Excel.Worksheet) =>
  ({ beneficiaires: { trancheAges } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Tranches d’âge')
    for (const { label, count, proportion } of trancheAges) {
      worksheet.addRow([label, count, `${proportion}%`])
    }
    worksheet.addRow([])
  }

const addStatistiquesStatus =
  (worksheet: Excel.Worksheet) =>
  ({ beneficiaires: { statutsSocial } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Statuts')
    for (const { label, count, proportion } of statutsSocial) {
      worksheet.addRow([label, count, `${proportion}%`])
    }
    worksheet.addRow([])
  }

const addStatistiquesCommuneResidenceBeneficiaires =
  (worksheet: Excel.Worksheet) =>
  ({ beneficiaires: { communes } }: MesStatistiquesPageData) => {
    addTitleRow(worksheet)('Commune de résidence des bénéficiaires', 'F4CCCCFF')
    for (const { label, count, proportion } of communes) {
      worksheet.addRow([label, count, `${proportion}%`])
    }
    worksheet.addRow([])
  }

export const buildStatistiquesWorksheet =
  (date: Date) =>
  ({
    user,
    filters,
    statistiques,
  }: {
    user: Pick<
      AuthenticatedMediateur,
      'firstName' | 'lastName' | 'role' | 'mediateur' | 'coordinateur'
    >
    filters: Partial<ActivitesFiltersLabels>
    statistiques: MesStatistiquesPageData
  }): Excel.Workbook => {
    const workbook = new Excel.Workbook()

    workbook.creator = 'La coop de la médiation numérique'
    workbook.lastModifiedBy = 'La coop de la médiation numérique'
    workbook.created = date
    workbook.modified = date
    workbook.lastPrinted = date

    const worksheet = workbook.addWorksheet('Statistiques')

    addStatistiquesExportInfo(worksheet)(user, date)
    addStatistiquesFilters(worksheet)(filters)
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

    return workbook
  }
