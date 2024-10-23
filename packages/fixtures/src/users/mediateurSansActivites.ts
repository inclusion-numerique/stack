import { givenUser } from '../givenUser'
import { mediateque, structureEmployeuse } from '../structures'

export const mediateurSansActivitesUserId =
  'd3378267-18cf-4b5f-ae1e-9f63c7093ac2'

export const mediateurSansActivitesMediateurId =
  'c513c349-46dc-461a-a3dc-a81d53c459b6'

export const mediateurSansActivites = givenUser({
  id: mediateurSansActivitesUserId,
  acceptationCgu: new Date(),
  firstName: 'Médiateur',
  lastName: 'Sans activités',
  isFixture: true,
  role: 'User',
  checkConseillerNumeriqueInscription: new Date(),
  inscriptionValidee: new Date(),
  lieuxActiviteRenseignes: new Date(),
  structureEmployeuseRenseignee: new Date(),
  mediateur: {
    connectOrCreate: {
      where: {
        id: mediateurSansActivitesMediateurId,
      },
      create: {
        id: mediateurSansActivitesMediateurId,
        enActivite: {
          connectOrCreate: {
            where: {
              id: '10a8ef22-2b40-41cb-a093-ae82686f24b1',
            },
            create: {
              id: '10a8ef22-2b40-41cb-a093-ae82686f24b1',
              structureId: mediateque.id,
            },
          },
        },
      },
    },
  },
  emplois: {
    connectOrCreate: {
      where: {
        id: 'b32c0dea-0ca7-4a52-917a-77663ecc65f9',
      },
      create: {
        id: 'b32c0dea-0ca7-4a52-917a-77663ecc65f9',
        structureId: structureEmployeuse.id,
      },
    },
  },
})
