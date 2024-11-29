import { endOfMonth, startOfMonth } from 'date-fns'
import { prismaClient } from '@app/web/prismaClient'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import {
  CrasConseillerNumeriqueV1FilterOptions,
  getCrasV1MinMaxDateAccompagnement,
  whereV1QueryInput,
} from '@app/web/app/coop/(full-width-layout)/archives-v1/crasConseillerNumeriqueV1Queries'

export type CrasV1StatRow = {
  month: string
  total: number
  accompagnements: number
  personnes_accompagnees: number
  individuels: number
  ponctuels: number
  collectifs: number
  participants_ateliers: number
  suivi_individuel: number
  suivi_atelier: number
  suivi_redirection: number
  canal_domicile: number
  canal_rattachement: number
  canal_distance: number
  canal_autre: number
  temps_total: number
  temps_individuel: number
  temps_ponctuel: number
  temps_collectif: number
  duree_0_30: number
  duree_30_60: number
  duree_60_120: number
  duree_120_plus: number
  age_moins_12_ans: number
  age_de_12_a_18_ans: number
  age_de_18_a_35_ans: number
  age_de_35_a_60_ans: number
  age_plus_60_ans: number
  statut_etudiant: number
  statut_sans_emploi: number
  statut_en_emploi: number
  statut_retraite: number
  statut_heterogene: number
  theme_accompagner_enfant: number
  theme_budget: number
  theme_contenus_numeriques: number
  theme_courriel: number
  theme_demarche_en_ligne: number
  theme_diagnostic: number
  theme_echanger: number
  theme_equipement_informatique: number
  theme_fraude_et_harcelement: number
  theme_internet: number
  theme_sante: number
  theme_scolaire: number
  theme_securite: number
  theme_smartphone: number
  theme_tpe_pme: number
  theme_traitement_texte: number
  theme_trouver_emploi: number
  theme_vocabulaire: number
  theme_autre: number
}

export type CrasV1StatKey = Exclude<keyof CrasV1StatRow, 'month'>

const totalKeys = [
  'theme',
  'statut',
  'age',
  'duree',
  'temps',
  'canal',
  'suivi',
] as const
type TotalKey = (typeof totalKeys)[number]
const rowTotal = (row: CrasV1StatRow, sumKey: TotalKey): number => {
  let total = 0
  for (const [key, value] of Object.entries(row)) {
    if (key === 'temps_total') continue
    if (key.startsWith(sumKey) && typeof value === 'number') {
      total += value
    }
  }
  return total
}
const percentage = (numerator: number, denominator: number): number =>
  denominator === 0 ? 0 : numerator / denominator

export const postProcessV1CraStatRow = (row: CrasV1StatRow) => {
  const partialTotals = {
    theme: rowTotal(row, 'theme'),
    statut: rowTotal(row, 'statut'),
    age: rowTotal(row, 'age'),
    duree: rowTotal(row, 'duree'),
    temps: rowTotal(row, 'temps'),
    canal: rowTotal(row, 'canal'),
    suivi: rowTotal(row, 'suivi'),
  } satisfies { [key in TotalKey]: number }

  const percentages = Object.fromEntries(
    Object.entries(row)
      .map(([key, value]) => {
        if (key === 'temps_total') return null
        for (const totalKey of totalKeys) {
          if (key.startsWith(totalKey) && typeof value === 'number') {
            const total = partialTotals[totalKey]
            return [key, percentage(value, total)]
          }
        }
        return null
      })
      .filter(onlyDefinedAndNotNull),
  ) as Pick<
    CrasV1StatRow,
    | 'theme_autre'
    | 'theme_equipement_informatique'
    | 'theme_demarche_en_ligne'
    | 'theme_smartphone'
    | 'theme_courriel'
    | 'theme_internet'
    | 'theme_vocabulaire'
    | 'theme_echanger'
    | 'theme_contenus_numeriques'
    | 'theme_traitement_texte'
    | 'theme_accompagner_enfant'
    | 'theme_trouver_emploi'
    | 'theme_tpe_pme'
    | 'theme_sante'
    | 'theme_diagnostic'
    | 'theme_fraude_et_harcelement'
    | 'theme_securite'
    | 'theme_budget'
    | 'theme_scolaire'
    | 'statut_etudiant'
    | 'statut_sans_emploi'
    | 'statut_en_emploi'
    | 'statut_retraite'
    | 'statut_heterogene'
    | 'age_moins_12_ans'
    | 'age_de_12_a_18_ans'
    | 'age_de_18_a_35_ans'
    | 'age_de_35_a_60_ans'
    | 'age_plus_60_ans'
    | 'duree_0_30'
    | 'duree_30_60'
    | 'duree_60_120'
    | 'duree_120_plus'
    | 'canal_domicile'
    | 'canal_rattachement'
    | 'canal_distance'
    | 'canal_autre'
    | 'temps_total'
    | 'temps_individuel'
    | 'temps_ponctuel'
    | 'temps_collectif'
    | 'individuels'
    | 'ponctuels'
    | 'collectifs'
    | 'participants_ateliers'
    | 'suivi_individuel'
    | 'suivi_atelier'
    | 'suivi_redirection'
  >

  return {
    ...row,
    percentages,
  }
}

const sumStats = (rows: CrasV1StatRow[]) => {
  const totals = {
    month: 'total',
    total: 0,
    accompagnements: 0,
    personnes_accompagnees: 0,
    individuels: 0,
    ponctuels: 0,
    collectifs: 0,
    participants_ateliers: 0,
    suivi_individuel: 0,
    suivi_atelier: 0,
    suivi_redirection: 0,
    canal_domicile: 0,
    canal_rattachement: 0,
    canal_distance: 0,
    canal_autre: 0,
    temps_total: 0,
    temps_individuel: 0,
    temps_ponctuel: 0,
    temps_collectif: 0,
    duree_0_30: 0,
    duree_30_60: 0,
    duree_60_120: 0,
    duree_120_plus: 0,
    age_moins_12_ans: 0,
    age_de_12_a_18_ans: 0,
    age_de_18_a_35_ans: 0,
    age_de_35_a_60_ans: 0,
    age_plus_60_ans: 0,
    statut_etudiant: 0,
    statut_sans_emploi: 0,
    statut_en_emploi: 0,
    statut_retraite: 0,
    statut_heterogene: 0,
    theme_accompagner_enfant: 0,
    theme_budget: 0,
    theme_contenus_numeriques: 0,
    theme_courriel: 0,
    theme_demarche_en_ligne: 0,
    theme_diagnostic: 0,
    theme_echanger: 0,
    theme_equipement_informatique: 0,
    theme_fraude_et_harcelement: 0,
    theme_internet: 0,
    theme_sante: 0,
    theme_scolaire: 0,
    theme_securite: 0,
    theme_smartphone: 0,
    theme_tpe_pme: 0,
    theme_traitement_texte: 0,
    theme_trouver_emploi: 0,
    theme_vocabulaire: 0,
    theme_autre: 0,
  } satisfies CrasV1StatRow

  for (const row of rows) {
    for (const [key, value] of Object.entries(row)) {
      const typedKey = key as keyof CrasV1StatRow

      if (
        typedKey === 'month' ||
        !(typedKey in totals) ||
        typeof value !== 'number'
      )
        continue

      totals[typedKey] += value
    }
  }

  return postProcessV1CraStatRow(totals)
}

export const getRawStatistiquesCrasV1 = async (
  input: CrasConseillerNumeriqueV1FilterOptions,
) => {
  if (
    !input.codeCommune &&
    (!input.conseillerNumeriqueIds || input.conseillerNumeriqueIds.length === 0)
  ) {
    return null
  }

  const dates = await getCrasV1MinMaxDateAccompagnement(input)
  if (!dates) {
    // No CRAs found
    return null
  }

  const firstMonth = startOfMonth(dates.min)
  const lastMonth = endOfMonth(dates.max)

  // month as iso string e.g. 2024-03
  const monthlyStats = await prismaClient.$queryRaw<CrasV1StatRow[]>`
      WITH cras AS (SELECT *
                    FROM cras_conseiller_numerique_v1
                    WHERE ${whereV1QueryInput(input)}),
           generated_months AS (SELECT generate_series(
                                               ${firstMonth}::DATE,
                                               ${lastMonth}::DATE,
                                               '1 month'::INTERVAL
                                       ) AS generated_month),
           months AS (SELECT generated_month AS month
                      FROM generated_months
                      WHERE generated_month < ${lastMonth}::DATE)
      SELECT TO_CHAR(months.month, 'YYYY-MM')                                                       as month,
             COUNT(cras.*)::INT                                                                     as total,
             SUM(cras.nb_participants)::INT                                                         as accompagnements,
             (SUM(cras.nb_participants) - SUM(cras.nb_participants_recurrents))::INT                as personnes_accompagnees,
          /* activite: 'individuel' | 'ponctuel' | 'collectif'  */
             COUNT(CASE WHEN cras.activite = 'individuel' THEN 1 END)::INT                          as individuels,
             COUNT(CASE WHEN cras.activite = 'ponctuel' THEN 1 END)::INT                            as ponctuels,
             COUNT(CASE WHEN cras.activite = 'collectif' THEN 1 END)::INT                           as collectifs,
          /* participants ateliers */
             SUM(CASE
                     WHEN cras.activite = 'collectif' THEN cras.nb_participants
                     ELSE 0 END)::INT                                                               as participants_ateliers,
          /* Suivis */
             SUM(cras.accompagnement_individuel)::INT                                               as suivi_individuel,
             SUM(cras.accompagnement_atelier)::INT                                                  as suivi_atelier,
             SUM(cras.accompagnement_redirection)::INT                                              as suivi_redirection,
          /*  canal: 'rattachement' | 'distance' | 'domicile' | 'autre lieu'  */
             COUNT(CASE WHEN cras.canal = 'domicile' THEN 1 END)::INT                               as canal_domicile,
             COUNT(CASE WHEN cras.canal = 'rattachement' THEN 1 END)::INT                           as canal_rattachement,
             COUNT(CASE WHEN cras.canal = 'distance' THEN 1 END)::INT                               as canal_distance,
             COUNT(CASE WHEN cras.canal = 'autre lieu' THEN 1 END)::INT                             as canal_autre,
          /* Temps par type "activite" */
             SUM(cras.duree_minutes)::INT / 60                                                      as temps_total,
             SUM(CASE WHEN cras.activite = 'individuel' THEN cras.duree_minutes ELSE 0 END)::INT /
             60                                                                                     as temps_individuel,
             SUM(CASE WHEN cras.activite = 'ponctuel' THEN cras.duree_minutes ELSE 0 END)::INT / 60 as temps_ponctuel,
             SUM(CASE WHEN cras.activite = 'collectif' THEN cras.duree_minutes ELSE 0 END)::INT /
             60                                                                                     as temps_collectif,
          /* Count par tranche de duree_minutes */
             COUNT(CASE WHEN cras.duree_minutes < 30 THEN 1 END)::INT                               as duree_0_30,
             COUNT(CASE
                       WHEN (cras.duree_minutes >= 30 AND cras.duree_minutes < 60)
                           THEN 1 END)::INT                                                         as duree_30_60,
             COUNT(CASE
                       WHEN (cras.duree_minutes >= 60 AND cras.duree_minutes < 120)
                           THEN 1 END)::INT                                                         as duree_60_120,
             COUNT(CASE WHEN cras.duree_minutes >= 120 THEN 1 END)::INT                             as duree_120_plus,
          /* tranche ages */
             SUM(cras.age_moins_12_ans)::INT                                                        as age_moins_12_ans,
             SUM(cras.age_de_12_a_18_ans)::INT                                                      as age_de_12_a_18_ans,
             SUM(cras.age_de_18_a_35_ans)::INT                                                      as age_de_18_a_35_ans,
             SUM(cras.age_de_35_a_60_ans)::INT                                                      as age_de_35_a_60_ans,
             SUM(cras.age_plus_60_ans)::INT                                                         as age_plus_60_ans,
          /* statuts socials */
             SUM(cras.statut_etudiant)::INT                                                         as statut_etudiant,
             SUM(cras.statut_sans_emploi)::INT                                                      as statut_sans_emploi,
             SUM(cras.statut_en_emploi)::INT                                                        as statut_en_emploi,
             SUM(cras.statut_retraite)::INT                                                         as statut_retraite,
             SUM(cras.statut_heterogene)::INT                                                       as statut_heterogene,
          /* sum nb_participants per theme */
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['autre'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_autre,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['equipement informatique'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_equipement_informatique,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['demarche en ligne'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_demarche_en_ligne,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['smartphone'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_smartphone,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['courriel'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_courriel,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['internet'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_internet,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['vocabulaire'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_vocabulaire,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['echanger'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_echanger,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['contenus numeriques'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_contenus_numeriques,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['traitement texte'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_traitement_texte,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['accompagner enfant'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_accompagner_enfant,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['trouver emploi'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_trouver_emploi,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['tpe/pme'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_tpe_pme,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['sante'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_sante,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['diagnostic'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_diagnostic,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['fraude et harcelement'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_fraude_et_harcelement,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['securite'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_securite,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['budget'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_budget,
             SUM(CASE
                     WHEN cras.themes @> ARRAY ['scolaire'] THEN 1
                     ELSE 0 END)::INT                                                               as theme_scolaire

      FROM months
               LEFT JOIN cras
                         ON DATE_TRUNC('month', cras.date_accompagnement) = months.month
      GROUP BY months.month
      ORDER BY months.month DESC`

  return {
    firstMonth,
    lastMonth,
    monthlyStats: monthlyStats.map(postProcessV1CraStatRow),
    totalStats: sumStats(monthlyStats),
  }
}

export type StatistiquesV1 = Exclude<
  Awaited<ReturnType<typeof getRawStatistiquesCrasV1>>,
  null
>

export type MonthlyStatistiquesV1 = StatistiquesV1['monthlyStats'][number]
