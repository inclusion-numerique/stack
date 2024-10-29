import { givenUser } from '../givenUser'
import { mediateque, structureEmployeuse } from '../structures'

export const mediateurAvecActiviteUserId =
  'd10844c6-b6de-402a-a68d-f8328b1d1b0c'

export const mediateurAvecActiviteMediateurId =
  '303381cc-3da7-433d-a553-1a5f76465989'

export const mediateurAvecActivite = givenUser({
  id: mediateurAvecActiviteUserId,
  acceptationCgu: new Date(),
  firstName: 'Médiateur',
  lastName: 'Avec activités',
  isFixture: true,
  role: 'User',
  checkConseillerNumeriqueInscription: new Date(),
  inscriptionValidee: new Date(),
  lieuxActiviteRenseignes: new Date(),
  structureEmployeuseRenseignee: new Date(),
  mediateur: {
    connectOrCreate: {
      where: {
        id: mediateurAvecActiviteMediateurId,
      },
      create: {
        id: mediateurAvecActiviteMediateurId,
        enActivite: {
          connectOrCreate: {
            where: {
              id: '4bad4ee5-f446-4739-ae93-9974d81aa0c0',
            },
            create: {
              id: '4bad4ee5-f446-4739-ae93-9974d81aa0c0',
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
        id: '057b286d-ece5-41a7-b770-756cae8b9353',
      },
      create: {
        id: '057b286d-ece5-41a7-b770-756cae8b9353',
        structureId: structureEmployeuse.id,
      },
    },
  },
})
