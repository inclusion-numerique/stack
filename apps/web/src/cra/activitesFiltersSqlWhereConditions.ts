import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { Sql } from '@prisma/client/runtime/library'
import { Prisma } from '@prisma/client'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'

export type ActivitesFiltersWhereConditions = {
  [key in keyof ActivitesFilters]: Sql | null
}

export const getActiviteFiltersSqlFragment = (
  conditions: ActivitesFiltersWhereConditions,
) => {
  const parts = Object.values(conditions).filter(isDefinedAndNotNull)

  if (parts.length === 0) return Prisma.raw('1=1')

  return Prisma.join(parts, 'AND')
}

/**
 * Conditions for a query on the 3 tables of the CRA models
 */

export const crasDateSelect = Prisma.raw(
  'COALESCE(cra_individuel.date, cra_collectif.date, cra_demarche_administrative.date)',
)

export const crasParticipantsCountSelect = Prisma.raw(
  '(SELECT COUNT(*) FROM participants_ateliers_collectifs participants WHERE participants.cra_collectif_id = cra_collectif.id) + (SELECT COALESCE(SUM(participants_anonymes.total), 0) FROM participants_anonymes_cras_collectifs participants_anonymes WHERE participants_anonymes.id = cra_collectif.participants_anonymes_id)',
)

export const crasTypeSelect = Prisma.raw(
  `CASE
                 WHEN cra_individuel.id IS NOT NULL THEN 'individuel'
                 WHEN cra_demarche_administrative.id IS NOT NULL THEN 'demarche'
                 ELSE 'collectif'
                 END`,
)

export const crasTypeOrderSelect = Prisma.raw(
  `CASE
                 WHEN cra_individuel.id IS NOT NULL THEN 1
                 WHEN cra_demarche_administrative.id IS NOT NULL THEN 2
                 ELSE 3
                 END`,
)

export const crasLieuLabelSelect =
  Prisma.raw(`COALESCE(structures.nom, cra_individuel.lieu_accompagnement_domicile_commune,
                      cra_collectif.lieu_accompagnement_autre_commune,
                      cra_demarche_administrative.lieu_accompagnement_domicile_commune, 'À distance')`)

export const crasStructureIdSelect = Prisma.raw(`COALESCE(
              cra_individuel.lieu_activite_id,
              cra_collectif.lieu_activite_id,
              cra_demarche_administrative.lieu_activite_id) `)

export const crasNotDeletedCondition = Prisma.raw(`(
          (cra_individuel.suppression IS NULL AND cra_individuel.id IS NOT NULL)
              OR (cra_collectif.suppression IS NULL AND cra_collectif.id IS NOT NULL)
              OR (cra_demarche_administrative.suppression IS NULL AND cra_demarche_administrative.id IS NOT NULL)
          )`)

export const crasCommuneCodeInseeSelect = Prisma.raw(`COALESCE(
                structures.code_insee, 
                cra_individuel.lieu_accompagnement_domicile_code_insee,
                cra_collectif.lieu_accompagnement_autre_code_insee,
                cra_demarche_administrative.lieu_accompagnement_domicile_code_insee)`)

export const getCrasFiltersWhereConditions = ({
  du,
  au,
  beneficiaire,
  commune,
  departement,
  lieu,
  type,
}: ActivitesFilters): ActivitesFiltersWhereConditions => ({
  du: du ? Prisma.raw(`${crasDateSelect.text} >= '${du}'::timestamp`) : null,
  au: au ? Prisma.raw(`${crasDateSelect.text} <= '${au}'::timestamp`) : null,
  type: type ? Prisma.raw(`${crasTypeSelect.text} = '${type}'`) : null,
  lieu: lieu
    ? Prisma.raw(`${crasStructureIdSelect.text} = '${lieu}'::UUID`)
    : null,
  commune: commune
    ? Prisma.raw(`${crasCommuneCodeInseeSelect.text} = '${commune}'`)
    : null,
  departement: departement
    ? Prisma.raw(`${crasCommuneCodeInseeSelect.text} LIKE '${departement}%'`)
    : null,
  beneficiaire: beneficiaire
    ? Prisma.raw(`
        AND (
          cra_individuel.beneficiaire_id = '${beneficiaire}'::UUID
          OR (
            EXISTS (
              SELECT 1
              FROM participants_ateliers_collectifs participants
              WHERE participants.beneficiaire_id = '${beneficiaire}'::UUID
                AND participants.cra_collectif_id = cra_collectif.id
            )
          )
          OR cra_demarche_administrative.beneficiaire_id = '${beneficiaire}'::UUID
        )
      `)
    : null,
})

/**
 * Conditions on a query on only the cras_demarches_administratives table
 */

export const craDemarcheAdministrativeCommuneCodeInseeSelect = Prisma.raw(
  `COALESCE(
      structures.code_insee, 
      cra_demarche_administrative.lieu_accompagnement_domicile_code_insee
    )`,
)

export const getCrasDemarchesAdministrativesFiltersWhereConditions = ({
  du,
  au,
  type,
  lieu,
  commune,
  departement,
  beneficiaire,
}: ActivitesFilters): ActivitesFiltersWhereConditions => ({
  du: du
    ? Prisma.raw(`cra_demarche_administrative.date >= '${du}'::timestamp`)
    : null,
  au: au
    ? Prisma.raw(`cra_demarche_administrative.date <= '${au}'::timestamp`)
    : null,
  type: type && type !== 'demarche' ? Prisma.raw(`1 = 0`) : null,
  lieu: lieu
    ? Prisma.raw(
        `cra_demarche_administrative.lieu_activite_id = '${lieu}'::UUID`,
      )
    : null,
  commune: commune
    ? Prisma.raw(
        `${craDemarcheAdministrativeCommuneCodeInseeSelect.text} = '${commune}'`,
      )
    : null,
  departement: departement
    ? Prisma.raw(
        `${craDemarcheAdministrativeCommuneCodeInseeSelect.text} LIKE '${departement}%'`,
      )
    : null,
  beneficiaire: beneficiaire
    ? Prisma.raw(
        `cra_demarche_administrative.beneficiaire_id = '${beneficiaire}'::UUID`,
      )
    : null,
})

/**
 * Conditions on a query on only the cras_individuel table
 */

export const craIndividuelCommuneCodeInseeSelect = Prisma.raw(
  `COALESCE(
      structures.code_insee, 
      cra_individuel.lieu_accompagnement_domicile_code_insee
    )`,
)

export const getCrasIndividuelFiltersWhereConditions = ({
  du,
  au,
  type,
  lieu,
  commune,
  departement,
  beneficiaire,
}: ActivitesFilters): ActivitesFiltersWhereConditions => ({
  du: du ? Prisma.raw(`cra_individuel.date >= '${du}'::timestamp`) : null,
  au: au ? Prisma.raw(`cra_individuel.date <= '${au}'::timestamp`) : null,
  type: type && type !== 'individuel' ? Prisma.raw(`1 = 0`) : null,
  lieu: lieu
    ? Prisma.raw(`cra_individuel.lieu_activite_id = '${lieu}'::UUID`)
    : null,
  commune: commune
    ? Prisma.raw(`${craIndividuelCommuneCodeInseeSelect.text} = '${commune}'`)
    : null,
  departement: departement
    ? Prisma.raw(
        `${craIndividuelCommuneCodeInseeSelect.text} LIKE '${departement}%'`,
      )
    : null,
  beneficiaire: beneficiaire
    ? Prisma.raw(`cra_individuel.beneficiaire_id = '${beneficiaire}'::UUID`)
    : null,
})

/**
 * Conditions on a query on only the cras_collectifs table
 */

export const craCollectifCommuneCodeInseeSelect = Prisma.raw(
  `COALESCE(
      structures.code_insee, 
      cra_collectif.lieu_accompagnement_autre_code_insee
    )`,
)

export const getCrasCollectifsFiltersWhereConditions = ({
  du,
  au,
  type,
  lieu,
  commune,
  departement,
  beneficiaire,
}: ActivitesFilters): ActivitesFiltersWhereConditions => ({
  du: du ? Prisma.raw(`cra_collectif.date >= '${du}'::timestamp`) : null,
  au: au ? Prisma.raw(`cra_collectif.date <= '${au}'::timestamp`) : null,
  type: type && type !== 'collectif' ? Prisma.raw(`1 = 0`) : null,
  lieu: lieu
    ? Prisma.raw(`cra_collectif.lieu_activite_id = '${lieu}'::UUID`)
    : null,
  commune: commune
    ? Prisma.raw(`${craCollectifCommuneCodeInseeSelect.text} = '${commune}'`)
    : null,
  departement: departement
    ? Prisma.raw(
        `${craCollectifCommuneCodeInseeSelect.text} LIKE '${departement}%'`,
      )
    : null,
  beneficiaire: beneficiaire
    ? Prisma.raw(`
        EXISTS (
          SELECT 1
          FROM participants_ateliers_collectifs participants
          WHERE participants.beneficiaire_id = '${beneficiaire}'::UUID
            AND participants.cra_collectif_id = cra_collectif.id
        )
      `)
    : null,
})
