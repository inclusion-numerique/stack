import { craConseillerNumeriqueToPrismaModel } from '@app/web/external-apis/conseiller-numerique/crasConseillerNumeriqueToPrismaModel'
import { ConseillerNumeriqueCraWithStructure } from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'

describe('craConseillerNumeriqueToPrismaModel', () => {
  it('converts mongo cra to prisma model', () => {
    const givenCra = {
      id: '64946ce97d775e05b617e743',
      createdAt: new Date(),
      updatedAt: new Date(),
      conseillerId: '619bbf20838083d33922e27d',
      cra: {
        themes: ['equipement informatique', 'vocabulaire', 'demarche en ligne'],
        sousThemes: [
          {
            'equipement informatique': ['ordinateur', 'telephone'],
          },
          {
            annotation: ['aide compte retraite'],
          },
          {
            'accompagner enfant': ['travailleur social'],
          },
          {
            sante: ['mon espace santé'],
          },
          { 'traitement texte': ['fourniture'] },
        ] as Record<string, string[]>[],
        organismes: [
          { 'PAN ANTS': 1 },
          {
            'Assistante sociale': 1,
          },
          { Gendarmerie: 5 },
        ] as { [index: string]: number }[],
        dateAccompagnement: new Date(),
        nbParticipants: 15,
        nbParticipantsRecurrents: 5,
        age: {
          moins12ans: 0,
          de12a18ans: 0,
          de18a35ans: 2,
          de35a60ans: 0,
          plus60ans: 0,
        },
        statut: {
          etudiant: 0,
          sansEmploi: 2,
          enEmploi: 0,
          retraite: 0,
          heterogene: 0,
        },
        accompagnement: { atelier: 0, individuel: 0, redirection: 2 },
        canal: 'rattachement',
        activite: 'collectif',
        codePostal: '97351',
        nomCommune: 'MATOURY',
        codeCommune: '97307',
        duree: '30-60',
      },
      structure: {
        id: '61966a86838083d339cf4dd2',
        idPG: 5659,
        codeCommune: '97307',
        codeDepartement: '973',
        codePostal: '97351',
        codeRegion: '03',
        nom: 'LA POSTE',
        nomCommune: 'Matoury',
        siret: '35600000052315',
        statut: 'VALIDATION_COSELEC',
        type: 'PRIVATE',
      },
    } satisfies ConseillerNumeriqueCraWithStructure

    const importedAt = new Date()

    const result = craConseillerNumeriqueToPrismaModel({
      item: givenCra,
      importedAt,
    })

    expect(result).toEqual({
      id: givenCra.id,
      importedAt,
      v1ConseillerNumeriqueId: givenCra.conseillerId,
      canal: givenCra.cra.canal,
      activite: givenCra.cra.activite,
      nbParticipants: givenCra.cra.nbParticipants,
      nbParticipantsRecurrents: givenCra.cra.nbParticipantsRecurrents,

      ageMoins12Ans: givenCra.cra.age.moins12ans,
      ageDe12a18Ans: givenCra.cra.age.de12a18ans,
      ageDe18a35Ans: givenCra.cra.age.de18a35ans,
      ageDe35a60Ans: givenCra.cra.age.de35a60ans,
      agePlus60Ans: givenCra.cra.age.plus60ans,

      statutEtudiant: givenCra.cra.statut.etudiant,
      statutSansEmploi: givenCra.cra.statut.sansEmploi,
      statutEnEmploi: givenCra.cra.statut.enEmploi,
      statutRetraite: givenCra.cra.statut.retraite,
      statutHeterogene: givenCra.cra.statut.heterogene,

      themes: givenCra.cra.themes,
      sousThemesEquipementInformatique: ['ordinateur', 'telephone'],
      sousThemesSante: ['mon espace santé'],
      sousThemesAccompagner: ['travailleur social'],
      sousThemesTraitementTexte: ['fourniture'],

      duree: '30-60',
      dureeMinutes: 45,

      accompagnementIndividuel: givenCra.cra.accompagnement.individuel,
      accompagnementAtelier: givenCra.cra.accompagnement.atelier,
      accompagnementRedirection: givenCra.cra.accompagnement.redirection,

      codePostal: givenCra.cra.codePostal,
      nomCommune: givenCra.cra.nomCommune,
      dateAccompagnement: givenCra.cra.dateAccompagnement,
      codeCommune: givenCra.cra.codeCommune,
      organismes: {
        'PAN ANTS': 1,
        'Assistante sociale': 1,
        Gendarmerie: 5,
      },
      annotation: 'aide compte retraite',

      createdAt: givenCra.createdAt,
      updatedAt: givenCra.updatedAt,

      structureId: givenCra.structure.id,
      structureIdPg: givenCra.structure.idPG,
      structureType: givenCra.structure.type,
      structureStatut: givenCra.structure.statut,
      structureNom: givenCra.structure.nom,
      structureSiret: givenCra.structure.siret,
      structureCodePostal: givenCra.structure.codePostal,
      structureNomCommune: givenCra.structure.nomCommune,
      structureCodeCommune: givenCra.structure.codeCommune,
      structureCodeDepartement: givenCra.structure.codeDepartement,
      structureCodeRegion: givenCra.structure.codeRegion,
    })
  })
})
