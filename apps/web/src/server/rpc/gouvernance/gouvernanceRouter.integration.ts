import { gouvernanceRouter } from '@app/web/server/rpc/gouvernance/gouvernanceRouter'
import {
  CreateGouvernanceData,
  GouvernanceData,
} from '@app/web/gouvernance/Gouvernance'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { createTestContext } from '../../../../test/createTestContext'
import { expectDate, expectUuid } from '../../../../test/expectHelpers'

describe('gouvernanceRouter', () => {
  // Helper function to easily test procedures

  const givenUserId = v4()
  const givenUserEmail = `test+${givenUserId}@inclusion-numerique.anct.gouv.fr`
  const givenUser = {
    ...testSessionUser,
    id: givenUserId,
    email: givenUserEmail,
  }

  beforeAll(() =>
    prismaClient.user.upsert({
      where: { id: givenUser.id },
      update: { ...givenUser, formulaireGouvernance: undefined },
      create: { ...givenUser, formulaireGouvernance: undefined },
    }),
  )

  afterAll(() => prismaClient.user.delete({ where: { id: givenUser.id } }))

  describe('createGouvernance', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const executeCreateGouvernanceProcedure = (input: CreateGouvernanceData) =>
      gouvernanceRouter
        .createCaller(createTestContext({ user: givenUser }))
        .createGouvernance(input)

    it('creates gouvernance', async () => {
      const result = await executeCreateGouvernanceProcedure({
        departementCode: '69',
      })

      expect(result).toEqual({
        departementCode: '69',
        id: expectUuid,
      })
    })
  })

  describe('gouvernance', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const executeGouvernanceProcedure = (input: GouvernanceData) =>
      gouvernanceRouter
        .createCaller(createTestContext({ user: givenUser }))
        .updateGouvernanceV2(input)

    const gouvernancesToDelete: string[] = []

    afterAll(() =>
      prismaClient.gouvernance.deleteMany({
        where: { id: { in: gouvernancesToDelete } },
      }),
    )

    it('should return expected result', async () => {
      const gouvernanceId = v4()
      gouvernancesToDelete.push(gouvernanceId)

      await prismaClient.gouvernance.create({
        data: {
          id: gouvernanceId,
          departementCode: '69',
          noteDeContexte: '',
          createurId: givenUser.id,
          derniereModificationParId: givenUser.id,
        },
      })

      const input: GouvernanceData = {
        gouvernanceId,
        sousPrefetReferentPrenom: 'Yolo',
        sousPrefetReferentNom: 'De Yolo',
        sousPrefetReferentEmail: 'yo@lo.lo',
        membres: [
          {
            nom: 'Métropole de Lyon',
            code: 'epci###200046977###8eea8b99-7f4d-4826-9751-bc81aa2687f2',
            coporteur: true,
          },
          {
            nom: 'Structure A',
            code: 'structure###12345678901234###8eea8b99-7f4d-4826-9751-bc81aa2687f2',
            coporteur: false,
          },
          {
            nom: 'Monts du Lyonnais',
            code: 'epci###200066587###b2431899-62ce-47ac-9e12-01c25527079b',
            coporteur: false,
          },
        ],
        pasDeCoporteurs: false,
        noteDeContexte: 'Such context',
        comites: [
          {
            type: 'Strategique',
            commentaire: '🗺️',
            frequence: 'Annuelle',
          },
        ],
        feuillesDeRoute: [
          {
            nom: '1000 bornes',
            contratPreexistant: 'oui',
            typeContrat: 'Autre',
            typeContratAutreDescription: '🚗',
            perimetreScope: 'epci',
            perimetreEpciCodes: ['200046977', '200066587'],
            porteur: {
              nom: 'Monts du Lyonnais',
              code: 'epci###200066587###b2431899-62ce-47ac-9e12-01c25527079b',
              coporteur: false,
            },
          },
        ],
        recruteursCoordinateurs: [
          { nom: 'Ca recrute dur', siret: '12345678901234' },
        ],
      }

      const result = await executeGouvernanceProcedure(input)

      // date: expectDate

      expect(result).toEqual({
        comites: [
          {
            commentaire: '🗺️',
            creation: expectDate,
            frequence: 'Annuelle',
            id: expectUuid,
            modification: expectDate,
            type: 'Strategique',
            typeAutrePrecisions: null,
          },
        ],
        createur: {
          email: givenUserEmail,
          id: givenUserId,
          name: 'Jean Biche',
        },
        creation: expectDate,
        departement: {
          code: '69',
          codeRegion: '84',
          nom: 'Rhône',
        },
        derniereModificationPar: {
          email: givenUserEmail,
          id: givenUserId,
          name: 'Jean Biche',
        },
        feuillesDeRoute: [
          {
            contratPreexistant: true,
            creation: expectDate,
            id: expectUuid,
            membres: [
              {
                membre: {
                  coporteur: false,
                  creation: expectDate,
                  departement: null,
                  epci: {
                    code: '200066587',
                    nom: 'CC des Monts du Lyonnais',
                  },
                  id: expectUuid,
                  modification: expectDate,
                  nomStructure: null,
                  region: null,
                  siret: null,
                  siretInformations: null,
                },
                role: 'Porteur',
              },
            ],
            modification: expectDate,
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
        id: expectUuid,
        membres: [
          {
            coporteur: true,
            creation: expectDate,
            departement: null,
            epci: {
              code: '200046977',
              nom: 'Métropole de Lyon',
            },
            id: expectUuid,
            modification: expectDate,
            nomStructure: null,
            region: null,
            siret: null,
            siretInformations: null,
          },
          {
            coporteur: false,
            creation: expectDate,
            departement: null,
            epci: null,
            id: expectUuid,
            modification: expectDate,
            nomStructure: 'Structure A',
            region: null,
            siret: '12345678901234',
            siretInformations: {
              creation: expectDate,
              modification: expectDate,
              nom: 'Ca recrute dur',
              siret: '12345678901234',
            },
          },
          {
            coporteur: false,
            creation: expectDate,
            departement: null,
            epci: {
              code: '200066587',
              nom: 'CC des Monts du Lyonnais',
            },
            id: expectUuid,
            modification: expectDate,
            nomStructure: null,
            region: null,
            siret: null,
            siretInformations: null,
          },
        ],
        modification: expectDate,
        noteDeContexte: 'Such context',
        organisationsRecruteusesCoordinateurs: [
          {
            id: expectUuid,
            siretInformations: {
              creation: expectDate,
              modification: expectDate,
              nom: 'Ca recrute dur',
              siret: '12345678901234',
            },
          },
          {
            id: expectUuid,
            siretInformations: {
              creation: expectDate,
              modification: expectDate,
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
        v2Enregistree: expectDate,
      })
    })
  })
})
