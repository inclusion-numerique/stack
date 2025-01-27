import { givenUser } from '../givenUser'
import { centreSocial, mediateque, structureEmployeuse } from '../structures'

export const coordinateurHorsDispositifInscritAvecToutCoordinateurId =
  'aa792475-7201-473a-af4a-7d3236539bfd'

export const coordinateurHorsDispositifInscritAvecToutMediateurId =
  '63c5708d-fb96-48d4-a356-250c150c06de'

export const coordinateurHorsDispositifInscritAvecTout = givenUser({
  id: 'f878b0e1-f31e-4a15-bbca-e8be80b0d19e',
  firstName: 'Coordinateur hors dispositif',
  lastName: 'Inscrit avec tout',
  isFixture: true,
  role: 'User',
  coordinateur: {
    connectOrCreate: {
      where: {
        id: coordinateurHorsDispositifInscritAvecToutCoordinateurId,
      },
      create: {
        id: coordinateurHorsDispositifInscritAvecToutCoordinateurId,
      },
    },
  },
  mediateur: {
    connectOrCreate: {
      where: {
        id: coordinateurHorsDispositifInscritAvecToutMediateurId,
      },
      create: {
        id: coordinateurHorsDispositifInscritAvecToutMediateurId,
        enActivite: {
          connectOrCreate: [
            {
              where: {
                id: '088db964-eb01-4738-bd4c-511fbe2eda65',
              },
              create: {
                id: '088db964-eb01-4738-bd4c-511fbe2eda65',
                structureId: mediateque.id,
              },
            },
            {
              where: {
                id: '80a86dd3-b358-4abb-9757-eb23b0fb32e4',
              },
              create: {
                id: '80a86dd3-b358-4abb-9757-eb23b0fb32e4',
                structureId: centreSocial.id,
              },
            },
          ],
        },
      },
    },
  },
  emplois: {
    connectOrCreate: {
      where: {
        id: 'aeb106f5-72b2-4a1b-8cb4-844c1fd85f95',
      },
      create: {
        id: 'aeb106f5-72b2-4a1b-8cb4-844c1fd85f95',
        structureId: structureEmployeuse.id,
      },
    },
  },
  profilInscription: 'Coordinateur',
  acceptationCgu: new Date(),
  inscriptionValidee: new Date(),
  structureEmployeuseRenseignee: new Date(),
})
