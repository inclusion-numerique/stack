import * as Excel from 'exceljs'
import type { SessionUser } from '@app/web/auth/sessionUser'
import type { AuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { ActiviteForList } from '@app/web/cra/activitesQueries'
import { getUserRoleLabel } from '@app/web/utils/getUserRoleLabel'
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
  typeLieuAtelierLabels,
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

export type WorksheetUser = Pick<
  SessionUser,
  'firstName' | 'lastName' | 'role' | 'id'
> & {
  mediateur: Pick<
    AuthenticatedMediateur['mediateur'],
    'id' | 'conseillerNumerique'
  > | null
}

export type BuildActivitesWorksheetInput = {
  // This is the user that requested the worksheet, it might not be the same user as the one that owns the activites
  user: WorksheetUser & { coordinateur: { id: string } | null }
  // This is the user that owns the activites
  mediateur: WorksheetUser
  filters: ActivitesFiltersLabels
  activites: ActiviteForList[]
}

const intraCellLineBreak = '\n'

const maxLength = (values: (string | null | undefined)[]) =>
  Math.max(...values.filter(Boolean).map((value) => value?.length ?? 10)) || 10

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
}: BuildActivitesWorksheetInput): Excel.Workbook => {
  const now = new Date()
  const workbook = new Excel.Workbook()
  workbook.creator = 'La coop de la médiation numérique'
  workbook.lastModifiedBy = 'La coop de la médiation numérique'
  workbook.created = now
  workbook.modified = now
  workbook.lastPrinted = now

  const worksheet = workbook.addWorksheet('Activités')

  const informationsExport: [string, string | number][] = [
    ['Nom', user.firstName ?? '-'],
    ['Prénom', user.lastName ?? '-'],
    ['Rôle', getUserRoleLabel(user)],
    ['Activités', activites.length],
    ['Date d’export', now.toLocaleDateString()],
    ['Heure d’export', now.toLocaleTimeString()],
  ]

  const filtres: [string, string][] = [
    ['Début de période', filters.du ?? '-'],
    ['Fin de période', filters.au ?? '-'],
    ['Type de lieu', filters.typeLieu ?? '-'],
    ['Nom du lieu', filters.nomLieu ?? '-'],
    ['Type d’accompagnement', filters.type ?? '-'],
  ]

  if (filters.beneficiaire) {
    filtres.push(['Bénéficiaire', filters.beneficiaire])
  }

  // Only display mediateur if it is not the same as the user that requested the worksheet
  if (mediateur.id !== user.id) {
    filtres.push(['Médiateur', `${mediateur.firstName} ${mediateur.lastName}`])
  }

  const exportTitleRow = worksheet.addRow(['Informations export', ''])
  exportTitleRow.getCell(1).font = { bold: true }

  for (const info of informationsExport) worksheet.addRow(info)

  worksheet.addRow([''])

  const filtersTitleRow = worksheet.addRow(['Filtres'])
  filtersTitleRow.getCell(1).font = { bold: true }

  for (const filtre of filtres) worksheet.addRow(filtre)

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
    'Le bénéficiaire va-t-il poursuivre son parcours d’accompagnement ?',
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
        typeLieuAtelier,
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
        typeLieu
          ? typeLieuLabels[typeLieu]
          : typeLieuAtelier
            ? typeLieuAtelierLabels[typeLieuAtelier]
            : '',
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
        beneficiairesListCell(({ vaPoursuivreParcoursAccompagnement }) =>
          vaPoursuivreParcoursAccompagnement === null
            ? '-'
            : booleanToYesNoLabel(vaPoursuivreParcoursAccompagnement),
        ),
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

  // Adjust column width automatically based on content
  for (const column of worksheet.columns) {
    let columnMaxLength = 10

    if (!column.eachCell) continue

    column.eachCell({ includeEmpty: false }, (cell) => {
      const cellLength =
        cell.value && typeof cell.value !== 'object'
          ? maxLength(cell.value.toString().split('\n'))
          : 10

      if (cellLength > columnMaxLength) {
        columnMaxLength = cellLength
      }
    })
    column.width = columnMaxLength
  }

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

  return workbook
}
