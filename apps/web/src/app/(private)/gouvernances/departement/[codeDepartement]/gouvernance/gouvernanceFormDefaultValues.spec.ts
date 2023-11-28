import { GouvernanceForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { getGouvernanceFormDefaultValues } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormDefaultValues'

describe('getGouvernanceFormDefaultValues', () => {
  it('transforms gouvernance to default values', () => {
    const gouvernanceForForm: GouvernanceForForm = {
      besoinsEnIngenierieFinanciere: null,
      comites: [
        {
          commentaire: '🗺️',
          creation: new Date('2023-11-14T07:59:36.362Z'),
          frequence: 'Annuelle',
          id: 'f8afff99-f763-4e44-886e-d79f84c93b40',
          modification: new Date('2023-11-14T07:59:36.362Z'),
          type: 'Strategique',
          typeAutrePrecisions: null,
        },
      ],
      createur: {
        email:
          'test+10e60049-d996-4add-8526-e7b1150af338@inclusion-numerique.anct.gouv.fr',
        id: '10e60049-d996-4add-8526-e7b1150af338',
        name: 'Jean Biche',
      },
      creation: new Date('2023-11-14T07:59:36.345Z'),
      departement: {
        code: '69',
        codeRegion: '84',
        nom: 'Rhône',
      },
      derniereModificationPar: {
        email:
          'test+10e60049-d996-4add-8526-e7b1150af338@inclusion-numerique.anct.gouv.fr',
        id: '10e60049-d996-4add-8526-e7b1150af338',
        name: 'Jean Biche',
      },
      feuillesDeRoute: [
        {
          contratPreexistant: true,
          creation: new Date('2023-11-14T07:59:36.362Z'),
          id: '0c3ffe6d-ba4c-47e8-8352-b783895917d2',
          membres: [
            {
              membre: {
                coporteur: false,
                creation: new Date('2023-11-14T07:59:36.362Z'),
                departement: null,
                epci: {
                  code: '200066587',
                  nom: 'CC des Monts du Lyonnais',
                },
                id: 'fe452d98-f3c2-4478-9cee-6e9758cedc41',
                modification: new Date('2023-11-14T07:59:36.362Z'),
                nomStructure: null,
                region: null,
                siret: null,
                siretInformations: null,
                formulaireGouvernanceId: '00052d98-f3c2-4478-9cee-6e9758cedc41',
              },
              role: 'Porteur',
            },
          ],
          modification: new Date('2023-11-14T07:59:36.362Z'),
          nom: '1000 bornes',
          perimetreDepartement: null,
          perimetreEpcis: [
            {
              epci: {
                code: '200046977',
                nom: 'Métropole de Lyon',
              },
            },
            {
              epci: {
                code: '200066587',
                nom: 'CC des Monts du Lyonnais',
              },
            },
          ],
          perimetreRegion: null,
          typeContrat: 'Autre',
          typeContratAutreDescription: '🚗',
        },
      ],
      id: 'b99f14b0-4a65-42be-8f87-84918013ff67',
      membres: [
        {
          coporteur: true,
          creation: new Date('2023-11-14T07:59:36.362Z'),
          departement: null,
          epci: {
            code: '200046977',
            nom: 'Métropole de Lyon',
          },
          id: 'e1092b15-57e6-4559-b36f-508316429dd5',
          modification: new Date('2023-11-14T07:59:36.362Z'),
          nomStructure: null,
          region: null,
          siret: null,
          siretInformations: null,
          formulaireGouvernanceId: '00092b15-57e6-4559-b36f-508316429dd5',
        },
        {
          coporteur: false,
          creation: new Date('2023-11-14T07:59:36.362Z'),
          departement: null,
          epci: null,
          id: '45b35111-44c5-493b-8bbe-3c3122231c20',
          modification: new Date('2023-11-14T07:59:36.362Z'),
          nomStructure: 'Structure A',
          region: null,
          siret: '12345678901234',
          siretInformations: {
            creation: new Date('2023-11-09T16:14:43.686Z'),
            modification: new Date('2023-11-14T07:59:36.362Z'),
            nom: 'Ca recrute dur',
            siret: '12345678901234',
          },
          formulaireGouvernanceId: '00035111-44c5-493b-8bbe-3c3122231c20',
        },
        {
          coporteur: false,
          creation: new Date('2023-11-14T07:59:36.362Z'),
          departement: null,
          epci: {
            code: '200066587',
            nom: 'CC des Monts du Lyonnais',
          },
          id: 'fe452d98-f3c2-4478-9cee-6e9758cedc41',
          modification: new Date('2023-11-14T07:59:36.362Z'),
          nomStructure: null,
          region: null,
          siret: null,
          siretInformations: null,
          formulaireGouvernanceId: '00052d98-f3c2-4478-9cee-6e9758cedc41',
        },
      ],
      modification: new Date('2023-11-14T07:59:36.362Z'),
      noteDeContexte: 'Such context',
      organisationsRecruteusesCoordinateurs: [
        {
          id: 'cebcb370-6c60-4cbe-9e2f-a4bd8cd65d5d',
          siretInformations: {
            creation: new Date('2023-11-09T16:14:43.686Z'),
            modification: new Date('2023-11-14T07:59:36.362Z'),
            nom: 'Ca recrute dur',
            siret: '12345678901234',
          },
        },
        {
          id: 'e8c067e3-e338-4bd5-a707-131cc31c1962',
          siretInformations: {
            creation: new Date('2023-11-09T16:14:43.686Z'),
            modification: new Date('2023-11-14T07:59:36.362Z'),
            nom: 'Ca recrute dur',
            siret: '12345678901234',
          },
        },
      ],
      pasDeCoporteurs: false,
      sousPrefetReferentEmail: 'yo@lo.lo',
      sousPrefetReferentNom: 'De Yolo',
      sousPrefetReferentPrenom: 'Yolo',
      v1Perimetre: null,
      v1PorteurDepartement: null,
      v1PorteurEpci: null,
      v1PorteurRegion: null,
      v1PorteurSiretInformations: null,
      v2Enregistree: new Date(),
    }

    expect(getGouvernanceFormDefaultValues(gouvernanceForForm)).toEqual({
      comites: [
        {
          commentaire: '🗺️',
          frequence: 'Annuelle',
          id: 'f8afff99-f763-4e44-886e-d79f84c93b40',
          type: 'Strategique',
          typeAutrePrecisions: undefined,
        },
      ],
      feuillesDeRoute: [
        {
          contratPreexistant: 'oui',
          id: '0c3ffe6d-ba4c-47e8-8352-b783895917d2',
          nom: '1000 bornes',
          perimetreEpciCodes: ['200046977', '200066587'],
          perimetreScope: 'epci',
          porteur: {
            code: 'epci###200066587###00052d98-f3c2-4478-9cee-6e9758cedc41',
            coporteur: false,
            nom: 'CC des Monts du Lyonnais',
          },
          typeContrat: 'Autre',
          typeContratAutreDescription: '🚗',
        },
      ],
      gouvernanceId: 'b99f14b0-4a65-42be-8f87-84918013ff67',
      membres: [
        {
          code: 'epci###200046977###00092b15-57e6-4559-b36f-508316429dd5',
          coporteur: true,
          nom: 'Métropole de Lyon',
        },
        {
          code: 'structure###12345678901234###00035111-44c5-493b-8bbe-3c3122231c20',
          coporteur: false,
          nom: 'Ca recrute dur',
        },
        {
          code: 'epci###200066587###00052d98-f3c2-4478-9cee-6e9758cedc41',
          coporteur: false,
          nom: 'CC des Monts du Lyonnais',
        },
      ],
      noteDeContexte: 'Such context',
      pasDeCoporteurs: false,
      recruteursCoordinateurs: [
        {
          nom: 'Ca recrute dur',
          siret: '12345678901234',
        },
        {
          nom: 'Ca recrute dur',
          siret: '12345678901234',
        },
      ],
      sousPrefetReferentEmail: 'yo@lo.lo',
      sousPrefetReferentNom: 'De Yolo',
      sousPrefetReferentPrenom: 'Yolo',
    })
  })
})
