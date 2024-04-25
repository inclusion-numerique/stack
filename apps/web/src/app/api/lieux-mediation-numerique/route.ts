import { fromSchemaDataInclusion } from '@gouvfr-anct/lieux-de-mediation-numerique'
import { prismaClient } from '@app/web/prismaClient'

// Define a type for the expected structure fields
interface Structure {
  id: string
  dateMaj: Date
  nom: string
  codePostal: string
  adresse: string
  commune: string
  rna?: string
  siret?: string
  codeInsee?: string
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const GET = async () => {
  // Executing a raw SQL query to allow for column comparison in where
  const structures = await prismaClient.$queryRaw<Structure[]>`
      SELECT "id",
             "date_maj"    as "dateMaj",
             "nom",
             "code_postal" as "codePostal",
             "adresse",
             "commune",
             "rna",
             "siret",
             "code_insee"  as "codeInsee"
      FROM "structures"
      WHERE "suppression" IS NULL
        AND (
          /* Was modified after the last import */  
          ("modification_import" IS NOT NULL 
               AND "modification" > "modification_import"
            )
              /* Was created in coop */
              OR "id_data_inclusion" IS NULL
          )
  `

  // Mapping the data to the required format
  const lieux = structures.map((structure) => {
    const {
      id,
      nom,
      rna,
      adresse,
      commune,
      siret,
      dateMaj,
      codeInsee,
      codePostal,
    } = structure
    const source = 'coop-numerique'
    // Simulating the logic for determining if a conseiller numérique is in activity
    const hasConseillerNumeriqueEnActivite = false // Placeholder for actual check

    return fromSchemaDataInclusion(
      [
        {
          id,
          nom: 'Médiation numérique',
          structure_id: id,
          source,
        },
      ],
      {
        id,
        source,
        code_postal: codePostal,
        date_maj: dateMaj.toISOString(),
        nom,
        rna,
        siret,
        adresse,
        commune,
        code_insee: codeInsee,
        thematiques: [
          'numerique--utiliser-le-numerique-au-quotidien',
          'numerique--approfondir-ma-culture-numerique',
        ],
        labels_nationaux: hasConseillerNumeriqueEnActivite
          ? ['conseiller-numerique']
          : [],
      },
    )
  })

  return new Response(JSON.stringify(lieux))
}
