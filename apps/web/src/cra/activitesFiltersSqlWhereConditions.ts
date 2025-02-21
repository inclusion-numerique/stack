import { Sql } from '@prisma/client/runtime/library'
import { Prisma } from '@prisma/client'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'

export type ActivitesFiltersWhereConditions = {
  [key in keyof ActivitesFilters]: Sql | null
}

export const getActiviteFiltersSqlFragment = (
  conditions: ActivitesFiltersWhereConditions,
) => {
  const parts = Object.values(conditions).filter(onlyDefinedAndNotNull)

  if (parts.length === 0) return Prisma.raw('1=1')

  return Prisma.join(parts, ' AND ')
}

/**
 * Conditions for a query on the 3 tables of the CRA models
 */

export const activiteAccompagnementsCountSelect = Prisma.raw(
  '(SELECT COUNT(*) FROM accompagnements acc WHERE acc.activite_id = act.id)',
)

/**
 * Used to scope an activite query to a specific beneficiaire.
 * NOT USED FOR FILTERS but before, to reduce the set for a specific beneficiaire view.
 */
export const activitesBeneficiaireInnerJoin = (
  beneficiaireId: string | null | undefined,
) =>
  Prisma.raw(
    beneficiaireId
      ? `INNER JOIN accompagnements acc ON (acc.activite_id = act.id AND acc.beneficiaire_id = '${beneficiaireId}'::UUID) `
      : '',
  )

export const crasTypeOrderSelect = Prisma.raw(
  `CASE
                 WHEN type = 'individuel' THEN 1
                 WHEN type = 'demarche' THEN 2
                 ELSE 3
                 END`,
)

export const crasLieuLabelSelect = Prisma.raw(
  `COALESCE(str.nom, act.lieu_commune, 'À distance')`,
)

export const crasNotDeletedCondition = Prisma.raw(`(
          (cra_individuel.suppression IS NULL AND cra_individuel.id IS NOT NULL)
              OR (cra_collectif.suppression IS NULL AND cra_collectif.id IS NOT NULL)
              OR (cra_demarche_administrative.suppression IS NULL AND cra_demarche_administrative.id IS NOT NULL)
          )`)

export const activiteLieuCodeInseeSelect = Prisma.raw(`COALESCE(
                str.code_insee, 
                act.lieu_code_insee)`)

export const getActivitesFiltersWhereConditions = ({
  du,
  au,
  mediateur,
  beneficiaire,
  commune,
  departement,
  lieu,
  type,
  profil,
  conseiller_numerique,
}: ActivitesFilters): ActivitesFiltersWhereConditions => ({
  du: du ? Prisma.raw(`act.date >= '${du}'::timestamp`) : null,
  au: au ? Prisma.raw(`act.date <= '${au}'::timestamp`) : null,
  type: type ? Prisma.raw(`act.type = '${type}'`) : null,
  profil: profil
    ? Prisma.raw(`cn.id is ${profil === 'mediateur' ? '' : 'not'} null`)
    : null,
  lieu: lieu ? Prisma.raw(`act.structure_id = '${lieu}'::UUID`) : null,
  commune: commune
    ? Prisma.raw(`${activiteLieuCodeInseeSelect.text} = '${commune}'`)
    : null,
  departement: departement
    ? Prisma.raw(`${activiteLieuCodeInseeSelect.text} LIKE '${departement}%'`)
    : null,
  beneficiaire: beneficiaire
    ? Prisma.raw(`EXISTS (
            SELECT 1
            FROM accompagnements acc
            WHERE acc.beneficiaire_id = '${beneficiaire}'::UUID
              AND acc.activite_id = act.id
          ) `)
    : null,
  mediateur: mediateur
    ? Prisma.raw(`act.mediateur_id = '${mediateur}'::UUID`)
    : null,
  conseiller_numerique: conseiller_numerique
    ? conseiller_numerique === '1'
      ? Prisma.raw(`cn.id IS NOT NULL`)
      : Prisma.raw(`cn.id IS NULL`)
    : null,
})
