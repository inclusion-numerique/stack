import {
  getConseillerNumeriqueCras,
  GetConseillerNumeriqueCrasResult,
} from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'
import { closeMongoClient } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'

describe('getConseillerNumeriqueCras', () => {
  afterAll(() => closeMongoClient())

  it('should return empty dataset for a out of bound filter', async () => {
    const { cras, structures, expectedStructures, empty, firstDate, lastDate } =
      await getConseillerNumeriqueCras({
        conseillerNumeriqueId: '60462162871498b500000000',
        createdAtUntil: new Date('2015-07-22'),
      })

    expect(empty).toBe(true)
    expect(cras).toBeUndefined()
    expect(structures).toBeUndefined()
    expect(expectedStructures).toBeUndefined()
    expect(firstDate).toBeUndefined()
    expect(lastDate).toBeUndefined()
  })

  it('should return a list of cras with right type', async () => {
    const result = await getConseillerNumeriqueCras({
      conseillerNumeriqueId: '60462162871498b5cec232e1',
      createdAtSince: new Date('2021-07-22'),
      createdAtUntil: new Date('2021-07-23'),
    })

    const expectedResponse: GetConseillerNumeriqueCrasResult = {
      cras: [
        {
          id: '60f927b49410e707612a3ac5',
          conseillerId: '60462162871498b5cec232e1',
          cra: {
            accompagnement: { atelier: 0, individuel: 1, redirection: 0 },
            activite: 'ponctuel',
            age: {
              de12a18ans: 0,
              de18a35ans: 0,
              de35a60ans: 0,
              moins12ans: 0,
              plus60ans: 1,
            },
            canal: 'distance',
            codeCommune: '54328',
            codePostal: '54710',
            dateAccompagnement: new Date('2021-07-22T08:09:24.192Z'),
            duree: '0-30',
            nbParticipants: 1,
            nomCommune: 'LUDRES',
            organismes: null,
            statut: {
              enEmploi: 0,
              etudiant: 0,
              heterogene: 0,
              retraite: 1,
              sansEmploi: 0,
            },
            themes: ['demarche en ligne'],
          },
          createdAt: new Date('2021-07-22T08:09:24.192Z'),
          structure: {
            id: '60461fd7871498b5cec2078c',
            codeCommune: '54328',
            codeDepartement: '54',
            codePostal: '54710',
            codeRegion: '44',
            idPG: 1562,
            nom: 'VILLE DE LUDRES',
            nomCommune: 'Ludres',
            siret: '21540328800016',
            statut: 'VALIDATION_COSELEC',
            type: 'COMMUNE',
          },
        },
        {
          id: '60f927dc9410e707612a3ac6',
          conseillerId: '60462162871498b5cec232e1',
          cra: {
            accompagnement: { atelier: 0, individuel: 1, redirection: 0 },
            activite: 'ponctuel',
            age: {
              de12a18ans: 0,
              de18a35ans: 0,
              de35a60ans: 0,
              moins12ans: 0,
              plus60ans: 1,
            },
            canal: 'distance',
            codeCommune: '54197',
            codePostal: '54710',
            dateAccompagnement: new Date('2021-07-22T08:10:04.174Z'),
            duree: '0-30',
            nbParticipants: 1,
            nomCommune: 'FLEVILLE DEVANT NANCY',
            organismes: null,
            statut: {
              enEmploi: 0,
              etudiant: 0,
              heterogene: 0,
              retraite: 1,
              sansEmploi: 0,
            },
            themes: ['autre'],
          },
          createdAt: new Date('2021-07-22T08:10:04.174Z'),
          structure: {
            id: '60461fd7871498b5cec2078c',
            codeCommune: '54328',
            codeDepartement: '54',
            codePostal: '54710',
            codeRegion: '44',
            idPG: 1562,
            nom: 'VILLE DE LUDRES',
            nomCommune: 'Ludres',
            siret: '21540328800016',
            statut: 'VALIDATION_COSELEC',
            type: 'COMMUNE',
          },
        },
        {
          id: '60f94fa09410e707612a3ada',
          conseillerId: '60462162871498b5cec232e1',
          cra: {
            accompagnement: { atelier: 0, individuel: 1, redirection: 0 },
            activite: 'individuel',
            age: {
              de12a18ans: 0,
              de18a35ans: 0,
              de35a60ans: 0,
              moins12ans: 0,
              plus60ans: 1,
            },
            canal: 'rattachement',
            codeCommune: '54197',
            codePostal: '54710',
            dateAccompagnement: new Date('2021-07-22T10:59:44.684Z'),
            duree: '30-60',
            nbParticipants: 1,
            nomCommune: 'FLEVILLE DEVANT NANCY',
            organismes: null,
            statut: {
              enEmploi: 0,
              etudiant: 0,
              heterogene: 0,
              retraite: 1,
              sansEmploi: 0,
            },
            themes: ['smartphone'],
          },
          createdAt: new Date('2021-07-22T10:59:44.684Z'),
          structure: {
            id: '60461fd7871498b5cec2078c',
            codeCommune: '54328',
            codeDepartement: '54',
            codePostal: '54710',
            codeRegion: '44',
            idPG: 1562,
            nom: 'VILLE DE LUDRES',
            nomCommune: 'Ludres',
            siret: '21540328800016',
            statut: 'VALIDATION_COSELEC',
            type: 'COMMUNE',
          },
        },
        {
          id: '60f97b9e9410e707612a3aef',
          conseillerId: '60462162871498b5cec232e1',
          cra: {
            accompagnement: { atelier: 0, individuel: 1, redirection: 0 },
            activite: 'individuel',
            age: {
              de12a18ans: 0,
              de18a35ans: 0,
              de35a60ans: 0,
              moins12ans: 0,
              plus60ans: 1,
            },
            canal: 'rattachement',
            codeCommune: '54197',
            codePostal: '54710',
            dateAccompagnement: new Date('2021-07-22T14:07:26.239Z'),
            duree: '30-60',
            nbParticipants: 1,
            nomCommune: 'FLEVILLE DEVANT NANCY',
            organismes: null,
            statut: {
              enEmploi: 0,
              etudiant: 0,
              heterogene: 0,
              retraite: 1,
              sansEmploi: 0,
            },
            themes: ['smartphone'],
          },
          createdAt: new Date('2021-07-22T14:07:26.239Z'),
          structure: {
            id: '60461fd7871498b5cec2078c',
            codeCommune: '54328',
            codeDepartement: '54',
            codePostal: '54710',
            codeRegion: '44',
            idPG: 1562,
            nom: 'VILLE DE LUDRES',
            nomCommune: 'Ludres',
            siret: '21540328800016',
            statut: 'VALIDATION_COSELEC',
            type: 'COMMUNE',
          },
        },
      ],
      empty: false,
      expectedStructures: 1,
      firstDate: new Date('2021-07-22T08:09:24.192Z'),
      lastDate: new Date('2021-07-22T14:07:26.239Z'),
      structures: [
        {
          id: '60461fd7871498b5cec2078c',
          codeCommune: '54328',
          codeDepartement: '54',
          codePostal: '54710',
          codeRegion: '44',
          idPG: 1562,
          nom: 'VILLE DE LUDRES',
          nomCommune: 'Ludres',
          siret: '21540328800016',
          statut: 'VALIDATION_COSELEC',
          type: 'COMMUNE',
        },
      ],
    }

    expect(result).toEqual(expectedResponse)
  })
})
