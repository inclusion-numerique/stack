/* eslint @typescript-eslint/no-unsafe-assignment: 0 */

import {
  mediateurAvecActiviteMediateurId,
  mediateurAvecActivite,
} from '@app/fixtures/users/mediateurAvecActivite'
import { resetFixtureUser } from '@app/fixtures/resetFixtureUser'
import { prismaClient } from '@app/web/prismaClient'
import { seedStructures } from '@app/fixtures/structures'
import {
  createOrUpdateActivite,
  CreateOrUpdateActiviteInput,
} from '@app/web/cra/createOrUpdateActivite'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'
import {
  ActiviteForList,
  activiteListSelect,
} from '@app/web/cra/activitesQueries'
import { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'

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
  typeLieu: null,
  typeLieuAtelier: null,
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
        lieuAccompagnementDomicileCommune: banDefaultValueToAdresseBanData({
          commune: 'Paris',
          codePostal: '75001',
          codeInsee: '75056',
        }),
        duree: '90',
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
      duree: Number.parseInt(input.data.duree, 10),
      lieuCodeInsee:
        input.data.lieuAccompagnementDomicileCommune?.codeInsee ?? null,
      lieuCodePostal:
        input.data.lieuAccompagnementDomicileCommune?.codePostal ?? null,
      lieuCommune:
        input.data.lieuAccompagnementDomicileCommune?.commune ?? null,
      materiel: input.data.materiel,
      notes: input.data.notes ?? null,
      orienteVersStructure: input.data.orienteVersStructure ?? null,
      structureDeRedirection: input.data.structureDeRedirection ?? null,
      thematiques: input.data.thematiques,
      thematiquesDemarche: [],
      typeLieu: input.data.typeLieu,
    })
  })
})
