/* eslint @typescript-eslint/no-unsafe-assignment: 0 */

import {
  mediateurAvecActivite,
  mediateurAvecActiviteMediateurId,
} from '@app/fixtures/users/mediateurAvecActivite'
import { resetFixtureUser } from '@app/fixtures/resetFixtureUser'
import { prismaClient } from '@app/web/prismaClient'
import { seedStructures } from '@app/fixtures/structures'
import {
  createOrUpdateActivite,
  type CreateOrUpdateActiviteInput,
} from '@app/web/cra/createOrUpdateActivite'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'
import {
  type ActiviteForList,
  activiteListSelect,
} from '@app/web/cra/activitesQueries'
import type { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import { craDureeDataToMinutes } from '@app/web/cra/minutesToCraDuree'
import { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'

const nullActivite: Omit<
  ActiviteForList,
  'id' | 'type' | 'mediateurId' | 'accompagnements' | 'date' | 'duree'
> = {
  autonomie: null,
  creation: expect.any(Date),
  degreDeFinalisation: null,
  lieuCodeInsee: null,
  lieuCodePostal: null,
  lieuCommune: null,
  materiel: [],
  modification: expect.any(Date),
  notes: null,
  orienteVersStructure: null,
  precisionsDemarche: null,
  structureDeRedirection: null,
  thematiques: [],
  thematiquesDemarche: [],
  typeLieu: 'ADistance',
  niveau: null,
  structure: null,
  titreAtelier: null,
}

describe('createOrUpdateActivite', () => {
  beforeAll(async () => {
    await seedStructures(prismaClient)
    await resetFixtureUser(mediateurAvecActivite, false)
  })

  it('should create activite individuelle for anonyme', async () => {
    const input: {
      type: 'Individuel'
      data: CraIndividuelData
    } = {
      type: 'Individuel',
      data: {
        mediateurId: mediateurAvecActiviteMediateurId,
        typeLieu: 'Domicile',
        thematiques: ['SecuriteNumerique'],
        date: '2024-08-01',
        materiel: [],
        lieuCommuneData: banDefaultValueToAdresseBanData({
          commune: 'Paris',
          codePostal: '75001',
          codeInsee: '75056',
        }),
        duree: {
          duree: 'personnaliser',
          dureePersonnaliseeMinutes: 90,
        },
        autonomie: 'EntierementAccompagne',
        beneficiaire: {
          mediateurId: mediateurAvecActiviteMediateurId,
        },
      },
    } satisfies CreateOrUpdateActiviteInput

    const result = await createOrUpdateActivite({
      userId: mediateurAvecActivite.id,
      input,
    })

    const activite = await prismaClient.activite.findUnique({
      where: {
        id: result.id,
      },
      select: activiteListSelect,
    })

    expect(activite).toEqual({
      ...nullActivite,
      id: result.id,
      type: 'Individuel',
      mediateurId: mediateurAvecActiviteMediateurId,
      accompagnements: [
        {
          beneficiaire: expect.objectContaining({
            id: expect.any(String),
            anonyme: true,
            attributionsAleatoires: false,
          }),
        },
      ],
      autonomie: input.data.autonomie,
      date: new Date(input.data.date),
      degreDeFinalisation: input.data.orienteVersStructure ?? null,
      duree: craDureeDataToMinutes(input.data.duree),
      lieuCodeInsee: input.data.lieuCommuneData?.codeInsee ?? null,
      lieuCodePostal: input.data.lieuCommuneData?.codePostal ?? null,
      lieuCommune: input.data.lieuCommuneData?.commune ?? null,
      materiel: input.data.materiel,
      notes: input.data.notes ?? null,
      orienteVersStructure: input.data.orienteVersStructure ?? null,
      structureDeRedirection: input.data.structureDeRedirection ?? null,
      thematiques: input.data.thematiques,
      thematiquesDemarche: [],
      typeLieu: input.data.typeLieu,
    })
  })

  it('should create and update activite individuelle for single anonyme', async () => {
    const input: {
      type: 'Individuel'
      data: CraIndividuelData
    } = {
      type: 'Individuel',
      data: {
        mediateurId: mediateurAvecActiviteMediateurId,
        typeLieu: 'Domicile',
        thematiques: ['SecuriteNumerique'],
        date: '2024-08-01',
        materiel: [],
        lieuCommuneData: banDefaultValueToAdresseBanData({
          commune: 'Paris',
          codePostal: '75001',
          codeInsee: '75056',
        }),
        duree: {
          duree: '90',
        },
        autonomie: 'EntierementAccompagne',
        beneficiaire: {
          mediateurId: mediateurAvecActiviteMediateurId,
        },
      },
    } satisfies CreateOrUpdateActiviteInput

    const resultToUpdate = await createOrUpdateActivite({
      userId: mediateurAvecActivite.id,
      input,
    })

    const result = await createOrUpdateActivite({
      userId: mediateurAvecActivite.id,
      input: {
        ...input,
        data: {
          ...input.data,
          id: resultToUpdate.id,
        },
      },
    })

    const beneficiaire = await prismaClient.beneficiaire.findMany({
      where: {
        anonyme: true,
        accompagnements: {
          every: {
            activiteId: result.id,
          },
        },
      },
    })

    expect(beneficiaire.length).toBe(1)
  })

  it('should create atelier collectif for anonyme', async () => {
    const input: {
      type: 'Collectif'
      data: CraCollectifData
    } = {
      type: 'Collectif',
      data: {
        mediateurId: mediateurAvecActiviteMediateurId,
        typeLieu: 'Autre',
        participants: [],
        participantsAnonymes: {
          ...participantsAnonymesDefault,
          total: 10,
          genreNonCommunique: 10,
          statutSocialScolarise: 2,
          statutSocialEnEmploi: 7,
          statutSocialNonCommunique: 1,
          trancheAgeMoinsDeDouze: 2,
          trancheAgeDixHuitVingtQuatre: 2,
          trancheAgeVingtCinqTrenteNeuf: 2,
          trancheAgeQuaranteCinquanteNeuf: 2,
          trancheAgeSoixanteSoixanteNeuf: 1,
          trancheAgeSoixanteDixPlus: 1,
        },
        titreAtelier: 'Titre atelier',
        thematiques: ['SecuriteNumerique'],
        date: '2024-08-01',
        materiel: [],
        duree: {
          duree: 'personnaliser',
          dureePersonnaliseeHeures: 1,
          dureePersonnaliseeMinutes: 30,
        },
        niveau: 'Avance',
      },
    } satisfies CreateOrUpdateActiviteInput

    const result = await createOrUpdateActivite({
      userId: mediateurAvecActivite.id,
      input,
    })

    const activite = await prismaClient.activite.findUnique({
      where: {
        id: result.id,
      },
      select: activiteListSelect,
    })

    expect(activite).toEqual({
      ...nullActivite,
      id: result.id,
      type: 'Collectif',
      mediateurId: mediateurAvecActiviteMediateurId,
      // expect an array of 10 participants object containing anonyme
      accompagnements: expect.arrayContaining(
        Array.from({ length: 10 }).fill({
          beneficiaire: expect.objectContaining({
            id: expect.any(String),
            anonyme: true,
            attributionsAleatoires: true,
          }),
        }),
      ),
      niveau: 'Avance',
      date: new Date(input.data.date),
      duree: craDureeDataToMinutes(input.data.duree),
      titreAtelier: input.data.titreAtelier,
      materiel: input.data.materiel,
      notes: input.data.notes ?? null,
      typeLieu: input.data.typeLieu,
      thematiques: input.data.thematiques,
      thematiquesDemarche: [],
    })
  })
})
