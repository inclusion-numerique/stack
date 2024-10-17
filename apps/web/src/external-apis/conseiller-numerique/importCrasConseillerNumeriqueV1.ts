import {
  getConseillerNumeriqueCras,
  type GetConseillerNumeriqueCrasOptions,
  NonEmptyConseillerNumeriqueCrasResult,
} from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'
import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient' // no v1 cras before this date

// no v1 cras before this date
export const firstV1CrasMonth = new Date('2021-06-01')

/**
 *
 * model CraConseillerNumeriqueV1 {
 *   id String @id // ID externe chez conseiller-numerique
 *
 *   importedAt DateTime @map("imported_at") // our field
 *
 *   conseillerNumeriqueId String @map("conseiller_numerique_id")
 *   conseillerNumerique   ConseillerNumerique @relation(fields: [conseillerNumeriqueId], references: [id])
 *
 *   canal String
 *   activite String
 *   nbParticipans Int @map("nb_participants") @default(0)
 *   nbParticipantsRecurrents Int @map("nb_participants_recurrents") @default(0)
 *
 *   ageMoins12Ans Int @map("age_moins_12_ans") @default(0)
 *   ageDe12a18Ans Int @map("age_de_12_a_18_ans") @default(0)
 *   ageDe18a35Ans Int @map("age_de_18_a_35_ans") @default(0)
 *   ageDe35a60Ans Int @map("age_de_35_a_60_ans") @default(0)
 *   agePlus60Ans  Int @map("age_plus_60_ans") @default(0)
 *
 *   statutEtudiant Int @map("statut_etudiant") @default(0)
 *   statutSansEmploi Int @map("statut_sans_emploi") @default(0)
 *   statutEnEmploi Int @map("statut_en_emploi") @default(0)
 *   statutRetraite Int @map("statut_retraite") @default(0)
 *   statutHeterogene Int @map("statut_heterogene") @default(0)
 *
 *   themes String[] @default([])
 *   // In mongodb stored as e.g.
 *   // "sousThemes": [
 *   //   {
 *   //     "equipement informatique": [
 *   //     "ordinateur",
 *   //     "telephone"
 *   //   ]
 *   // },
 *   sousThemesEquipementsInformatiques String[] @default([]) @map("sous_themes_equipements_informatiques")
 *   sousThemesSante String[] @default([]) @map("sous_themes_sante")
 *   sousThemesAccompagnerEnfant String[] @default([]) @map("sous_themes_accompagner_enfant")
 *
 *   duree String
 *
 *   accompagnementIndividuel Int @map("accompagnement_individuel") @default(0)
 *   accompagnementAtelier Int @map("accompagnement_atelier") @default(0)
 *   accompagnementRedirection Int @map("accompagnement_redirection") @default(0)
 *
 *   codePostal String? @map("code_postal")
 *   nomCommune String? @map("nom_commune")
 *   dateAccompagnement DateTime @map("date_accompagnement")
 *   codeCommune String? @map("code_commune")
 *   organismes String? @map("organismes")
 *
 *   createdAt DateTime @map("created_at") // v1 field
 *
 *   structureId String? @map("structure_id")
 *   structureIdPg Int? @map("structure_id_pg")
 *   structureType String? @map("structure_type")
 *   structureStatut String? @map("structure_statut")
 *   structureNom String? @map("structure_nom")
 *   structureSiret String? @map("structure_siret")
 *   structureCodePostal String? @map("structure_code_postal")
 *   structureNomCommune String? @map("structure_nom_commune")
 *   structureCodeCommune String? @map("structure_code_commune")
 *   structureCodeDepartement String? @map("structure_code_departement")
 *   structureCodeRegion String? @map("structure_code_region")
 *
 *   @@map("cras_conseiller_numerique_v1")
 * }
 */

export const craConseillerNumeriqueToPrismaModel = ({
  item: { id, conseillerId, cra, createdAt, structure },
  importedAt,
}: {
  item: NonEmptyConseillerNumeriqueCrasResult['cras'][number]
  importedAt: Date
}): Prisma.CraConseillerNumeriqueV1CreateManyInput => ({
  importedAt,
  id,
  createdAt,
  v1ConseillerNumeriqueId: conseillerId,
  canal: cra.canal ?? '',
  activite: cra.activite ?? '',
  nbParticipants: cra.nbParticipants ?? 0,
  nbParticipantsRecurrents: cra.nbParticipantsRecurrents ?? 0,

  ageMoins12Ans: cra.age.moins12ans ?? 0,
  ageDe12a18Ans: cra.age.de12a18ans ?? 0,
  ageDe18a35Ans: cra.age.de18a35ans ?? 0,
  ageDe35a60Ans: cra.age.de35a60ans ?? 0,
  agePlus60Ans: cra.age.plus60ans ?? 0,

  statutEtudiant: cra.statut.etudiant ?? 0,
  statutSansEmploi: cra.statut.sansEmploi ?? 0,
  statutEnEmploi: cra.statut.enEmploi ?? 0,
  statutRetraite: cra.statut.retraite ?? 0,
  statutHeterogene: cra.statut.heterogene ?? 0,

  themes: cra.themes,
  sousThemesEquipementsInformatiques:
    cra.sousThemes?.equipementsInformatiques ?? [],
  sousThemesSante: cra.sousThemes?.sante ?? [],
  sousThemesAccompagnerEnfant: cra.sousThemes?.accompagnerEnfant ?? [],

  duree: cra.duree,

  accompagnementIndividuel: cra.accompagnement.individuel ?? 0,
  accompagnementAtelier: cra.accompagnement.atelier ?? 0,
  accompagnementRedirection: cra.accompagnement.redirection ?? 0,

  codePostal: cra.codePostal,
  nomCommune: cra.nomCommune,
  dateAccompagnement: cra.dateAccompagnement,
  codeCommune: cra.codeCommune,
  organismes: cra.organismes,

  structureId: structure?.id,
  structureIdPg: structure?.idPG,
  structureType: structure?.type,
  structureStatut: structure?.statut,
  structureNom: structure?.nom,
  structureSiret: structure?.siret,
  structureCodePostal: structure?.codePostal,
  structureNomCommune: structure?.nomCommune,
  structureCodeCommune: structure?.codeCommune,
  structureCodeDepartement: structure?.codeDepartement,
  structureCodeRegion: structure?.codeRegion,
})

export const importCrasConseillerNumeriqueV1 = async (
  getConseillerNumeriqueCrasOptions: GetConseillerNumeriqueCrasOptions,
) => {
  const importedAt = new Date()

  const crasList = await getConseillerNumeriqueCras(
    getConseillerNumeriqueCrasOptions,
  )

  if (crasList.empty) {
    return {
      cras: [],
      empty: true,
    }
  }
  const { cras, empty } = crasList

  const created = await prismaClient.craConseillerNumeriqueV1.createMany({
    data: cras.map((item) =>
      craConseillerNumeriqueToPrismaModel({ item, importedAt }),
    ),
    skipDuplicates: true,
  })

  return {
    cras,
    created: created.count,
    empty,
  }
}
