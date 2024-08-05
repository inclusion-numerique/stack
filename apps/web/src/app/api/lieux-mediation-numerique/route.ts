import { NextResponse } from 'next/server'
import {
  LieuMediationNumerique,
  toSchemaLieuxDeMediationNumerique,
} from '@gouvfr-anct/lieux-de-mediation-numerique'
import { prismaClient } from '@app/web/prismaClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// todo: il manque les champs suivants :
//  X structure_parente
//  X formations_labels
//  X autres_formations_labels
//  X prise_rdv

export const GET = async () => {
  const lieuxDeMediationNumerique = await prismaClient.$queryRaw<
    LieuMediationNumerique[]
  >`
      SELECT "id",
        COALESCE(siret, rna, '00000000000000') AS pivot,
        "nom",
        jsonb_strip_nulls(
            jsonb_build_object(
              'voie', adresse,
              'complement_adresse', NULLIF(complement_adresse, ''),
              'code_postal', code_postal,
              'code_insee', code_insee,
              'commune', commune
            )
        ) AS adresse,
        jsonb_strip_nulls(
            jsonb_build_object(
              'latitude', latitude,
              'longitude', longitude
            )
        ) AS localisation,
        NULLIF(typologies, '{}') AS typologies,
        jsonb_strip_nulls(
            jsonb_build_object(
             'telephone', NULLIF(telephone, ''),
             'courriels', NULLIF(courriels, '{}'),
             'site_web', CASE WHEN NULLIF(site_web, '') IS NOT NULL THEN ARRAY[site_web] END
            )
        ) AS contact,
        NULLIF(horaires, '') AS horaires,
        jsonb_strip_nulls(
            jsonb_build_object(
             'resume', presentation_resume,
             'detail', presentation_detail
            )
        ) AS presentation,
        'coop-mednum' AS source,
        "itinerance",
        NULLIF(itinerance, '{}') AS itinerance,
        "modification" as "date_maj",
        NULLIF(services, '{}') AS services,
        NULLIF(publics_specifiquement_adresses, '{}') AS publics_specifiquement_adresses,
        NULLIF(prise_en_charge_specifique, '{}') AS prise_en_charge_specifique,
        NULLIF(frais_a_charge, '{}') AS frais_a_charge,
        NULLIF(dispositif_programmes_nationaux, '{}') AS dispositif_programmes_nationaux,
        NULLIF(modalites_acces, '{}') AS modalites_acces,
        NULLIF(modalites_accompagnement, '{}') AS modalites_accompagnement,
        NULLIF(fiche_acces_libre, '') AS fiche_acces_libre
      FROM "structures"
      WHERE "suppression" IS NULL
        AND 
          "visible_pour_cartographie_nationale" IS true`

  return NextResponse.json(
    toSchemaLieuxDeMediationNumerique(lieuxDeMediationNumerique),
  )
}
