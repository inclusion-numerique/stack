import { prismaClient } from '@app/web/prismaClient'
import {
  LieuMediationNumerique,
  toSchemaLieuxDeMediationNumerique,
} from '@gouvfr-anct/lieux-de-mediation-numerique'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const GET = async () => {
  const lieuxDeMediationNumerique = await prismaClient.$queryRaw<
    LieuMediationNumerique[]
  >`
    SELECT structures.id,
      COALESCE(structures.siret, structures.rna, '00000000000000') AS pivot,
      structures.nom,
      jsonb_strip_nulls(
        jsonb_build_object(
          'voie', structures.adresse,
          'complement_adresse', NULLIF(structures.complement_adresse, ''),
          'code_postal', structures.code_postal,
          'code_insee', structures.code_insee,
          'commune', structures.commune
        )
      ) AS adresse,
      jsonb_strip_nulls(
        jsonb_build_object(
          'latitude', structures.latitude,
          'longitude', structures.longitude
        )
      ) AS localisation,
      NULLIF(structures.typologies, '{}') AS typologies,
      jsonb_strip_nulls(
        jsonb_build_object(
          'telephone', NULLIF(structures.telephone, ''),
          'courriels', NULLIF(structures.courriels, '{}'),
          'site_web', CASE WHEN NULLIF(structures.site_web, '') IS NOT NULL THEN ARRAY[structures.site_web] END
        )
      ) AS contact,
      NULLIF(structures.horaires, '') AS horaires,
      jsonb_strip_nulls(
        jsonb_build_object(
          'resume', structures.presentation_resume,
          'detail', structures.presentation_detail
        )
      ) AS presentation,
      'Coop numérique' AS source,
      structures.itinerance,
      NULLIF(structures.itinerance, '{}') AS itinerance, structures.modification as "date_maj",
      NULLIF(structures.services, '{}') AS services,
      NULLIF(structures.structure_parente, '{}') AS structure_parente,
      NULLIF(structures.publics_specifiquement_adresses, '{}') AS publics_specifiquement_adresses,
      NULLIF(structures.prise_en_charge_specifique, '{}') AS prise_en_charge_specifique,
      NULLIF(structures.frais_a_charge, '{}') AS frais_a_charge,
        CASE
          WHEN COUNT(conseillers_numeriques.id) > 0 THEN ARRAY['Conseillers numériques']
        END
       AS dispositif_programmes_nationaux,
      NULLIF(structures.formations_labels, '{}') AS formations_labels,
      NULLIF(structures.autres_formations_labels, '{}') AS autres_formations_labels,
      NULLIF(structures.modalites_acces, '{}') AS modalites_acces,
      NULLIF(structures.modalites_accompagnement, '{}') AS modalites_accompagnement,
      NULLIF(structures.fiche_acces_libre, '') AS fiche_acces_libre,
      NULLIF(structures.prise_rdv, '') AS prise_rdv
      FROM structures structures
        LEFT JOIN mediateurs_en_activite mediateurs_en_activite  ON structures.id = mediateurs_en_activite.structure_id
        LEFT JOIN conseillers_numeriques conseillers_numeriques ON mediateurs_en_activite.mediateur_id = conseillers_numeriques.mediateur_id
      WHERE structures.suppression IS NULL
        AND structures.visible_pour_cartographie_nationale IS true
      GROUP BY structures.id
  `

  return NextResponse.json(
    toSchemaLieuxDeMediationNumerique(lieuxDeMediationNumerique),
  )
}
