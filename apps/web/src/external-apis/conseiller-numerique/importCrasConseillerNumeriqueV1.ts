import { Prisma } from '@prisma/client'
import {
  getConseillerNumeriqueCras,
  type GetConseillerNumeriqueCrasOptions,
  NonEmptyConseillerNumeriqueCrasResult,
} from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'
import { prismaClient } from '@app/web/prismaClient' // no v1 cras before this date

// no v1 cras before this date
export const firstV1CrasMonth = new Date('2021-06-01')

export const craConseillerNumeriqueToPrismaModel = ({
  item: { id, conseillerId, cra, createdAt, structure },
  importedAt,
}: {
  item: NonEmptyConseillerNumeriqueCrasResult['cras'][number]
  importedAt: Date
}) =>
  ({
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
      // TODO format sous themes
      // cra.sousThemes?.equipementsInformatiques ?? [],
      [],
    sousThemesSante:
      // cra.sousThemes?.sante ?? [],
      [],
    sousThemesAccompagnerEnfant:
      // cra.sousThemes?.accompagnerEnfant ?? [],
      [],

    duree: cra.duree,

    accompagnementIndividuel: cra.accompagnement.individuel ?? 0,
    accompagnementAtelier: cra.accompagnement.atelier ?? 0,
    accompagnementRedirection: cra.accompagnement.redirection ?? 0,

    codePostal: cra.codePostal,
    nomCommune: cra.nomCommune,
    dateAccompagnement: cra.dateAccompagnement,
    codeCommune: cra.codeCommune,
    // TODO format organismes
    // organismes: cra.organismes,
    organismes: null,

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
  }) satisfies Prisma.CraConseillerNumeriqueV1CreateManyInput

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
