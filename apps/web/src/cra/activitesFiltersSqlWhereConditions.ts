import { Sql } from '@prisma/client/runtime/library'
import { Prisma } from '@prisma/client'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'

export type ActivitesFiltersWhereConditions = {
  [key in keyof ActivitesFilters]: Sql | null
}

export const getActiviteFiltersSqlFragment = (
  conditions: ActivitesFiltersWhereConditions,
) => {
  const parts = Object.values(conditions).filter(isDefinedAndNotNull)

  if (parts.length === 0) return Prisma.raw('1=1')

  return Prisma.join(parts, ' AND ')
}

/**
 * Conditions for a query on the 3 tables of the CRA models
 */

export const activiteAccompagnementsCountSelect = Prisma.raw(
  '(SELECT COUNT(*) FROM accompagnements WHERE accompagnements.activite_id = activites.id)',
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
      ? `INNER JOIN accompagnements ON (accompagnements.activite_id = activites.id AND accompagnements.beneficiaire_id = '${beneficiaireId}'::UUID) `
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
  `COALESCE(structures.nom, activites.lieu_commune, 'À distance')`,
)

export const crasNotDeletedCondition = Prisma.raw(`(
          (cra_individuel.suppression IS NULL AND cra_individuel.id IS NOT NULL)
              OR (cra_collectif.suppression IS NULL AND cra_collectif.id IS NOT NULL)
              OR (cra_demarche_administrative.suppression IS NULL AND cra_demarche_administrative.id IS NOT NULL)
          )`)

export const activiteLieuCodeInseeSelect = Prisma.raw(`COALESCE(
                structures.code_insee, 
                activites.lieu_code_insee)`)

export const getCrasFiltersWhereConditions = ({
  du,
  au,
  beneficiaire,
  commune,
  departement,
  lieu,
  type,
}: ActivitesFilters): ActivitesFiltersWhereConditions => ({
  du: du ? Prisma.raw(`activites.date >= '${du}'::timestamp`) : null,
  au: au ? Prisma.raw(`activites.date <= '${au}'::timestamp`) : null,
  type: type ? Prisma.raw(`activites.type = '${type}'`) : null,
  lieu: lieu ? Prisma.raw(`activites.structure_id = '${lieu}'::UUID`) : null,
  commune: commune
    ? Prisma.raw(`${activiteLieuCodeInseeSelect.text} = '${commune}'`)
    : null,
  departement: departement
    ? Prisma.raw(`${activiteLieuCodeInseeSelect.text} LIKE '${departement}%'`)
    : null,
  beneficiaire: beneficiaire
    ? Prisma.raw(`EXISTS (
              SELECT 1
              FROM accompagnements
              WHERE accompagnements.beneficiaire_id = '${beneficiaire}'::UUID
                AND accompagnements.activite_id = activites.id
            ) `)
    : null,
})
