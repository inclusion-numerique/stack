import { prismaClient } from '@app/web/prismaClient'
import type { SelectOption } from '@app/ui/components/Form/utils/options'

export const getMediateurCommunesAndDepartementsOptions = async ({
  mediateurId,
}: {
  mediateurId: string
}) => {
  const communes = await prismaClient.$queryRaw<
    {
      code: string
      commune: string
      code_postal: string
    }[]
  >`WITH initial_selection AS (
      SELECT
          COALESCE(
                  structures.code_insee,
                  cras_individuels.lieu_accompagnement_domicile_code_insee,
                  cras_collectifs.lieu_accompagnement_autre_code_insee,
                  cras_demarches_administratives.lieu_accompagnement_domicile_code_insee
          ) as result_commune_code,
          COALESCE(
                  structures.commune,
                  cras_individuels.lieu_accompagnement_domicile_commune,
                  cras_collectifs.lieu_accompagnement_autre_commune,
                  cras_demarches_administratives.lieu_accompagnement_domicile_commune
          ) as result_commune,
          COALESCE(
                  structures.code_postal,
                  cras_individuels.lieu_accompagnement_domicile_code_postal,
                  cras_collectifs.lieu_accompagnement_autre_code_postal,
                  cras_demarches_administratives.lieu_accompagnement_domicile_code_postal
          ) as result_commune_code_postal
      FROM mediateurs
               LEFT JOIN cras_individuels ON mediateurs.id = cras_individuels.cree_par_mediateur_id
               LEFT JOIN cras_collectifs ON mediateurs.id = cras_collectifs.cree_par_mediateur_id
               LEFT JOIN cras_demarches_administratives ON mediateurs.id = cras_demarches_administratives.cree_par_mediateur_id
               LEFT JOIN structures ON
          cras_collectifs.lieu_activite_id = structures.id OR
          cras_demarches_administratives.lieu_activite_id = structures.id OR
          cras_individuels.lieu_activite_id = structures.id
      WHERE mediateurs.id = ${mediateurId}::UUID
  )
    SELECT
        result_commune_code as code,
        MIN(result_commune) as commune,
        MIN(result_commune_code_postal) as code_postal
    FROM initial_selection
    GROUP BY result_commune_code
    HAVING result_commune_code IS NOT NULL
    ORDER BY commune ASC;
  `

  const communesOptions = communes.map(
    ({ code, code_postal, commune }) =>
      ({
        value: code,
        label: `${commune} · ${code_postal}`,
      }) satisfies SelectOption,
  )

  // TODO use getDepartement(code) to have a unique Set of departements corresponding to those communes

  const departementsOptions: SelectOption[] = []

  return { communesOptions, departementsOptions }
}
