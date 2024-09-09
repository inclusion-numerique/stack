import * as Excel from 'exceljs'
import type { SessionUser } from '@app/web/auth/sessionUser'
import type { AuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { ActiviteForList } from '@app/web/cra/activitesQueries'
import { getUserRoleLabel } from '@app/web/utils/getUserRoleLabel'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import {
  autonomieStars,
  autonomieValues,
  degreDeFinalisationDemarcheHints,
  degreDeFinalisationDemarcheLabels,
  dureeAccompagnementLabelFromIntegerValue,
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

  const informationsExport: [string, string][] = [
    ['Nom', user.firstName ?? '-'],
    ['Prénom', user.lastName ?? '-'],
    ['Rôle', getUserRoleLabel(user)],
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
    'Durée',
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

  worksheet.addTable({
    name: 'Activités',
    ref: `A${separatorRowBeforeTable.number}`,
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
        dateAsDay(date),
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
        dureeAccompagnementLabelFromIntegerValue(duree),
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
        beneficiairesListCell(({ genre }) =>
          genre ? genreLabels[genre] : '-',
        ),
        beneficiairesListCell(({ trancheAge }) =>
          trancheAge ? trancheAgeLabels[trancheAge] : '-',
        ),
        beneficiairesListCell(({ statutSocial }) =>
          statutSocial ? statutSocialLabels[statutSocial] : '-',
        ),
        notes || '',
      ]
    }),
  })

  return workbook
}
