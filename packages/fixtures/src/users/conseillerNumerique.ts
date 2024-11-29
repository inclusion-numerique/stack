import { givenUser } from '../givenUser'
import { centreSocial, mediateque, structureEmployeuse } from '../structures'

export const conseillerNumeriqueMediateurId =
  '1ae07d95-316c-489f-893a-d17052c883b7'

export const conseillerNumeriqueConseillerNumeriqueId =
  '6217b9ff9ee981b6489c10fc'

export const conseillerNumerique = givenUser({
  id: 'b66d2370-4245-4492-a630-02749a98237d',
  firstName: 'Conseiller Num',
  lastName: 'Inscrit',
  isFixture: true,
  role: 'User',
  profilInscription: 'ConseillerNumerique',
  acceptationCgu: new Date(),
  structureEmployeuseRenseignee: new Date(),
  lieuxActiviteRenseignes: new Date(),
  inscriptionValidee: new Date(),
  mediateur: {
    connectOrCreate: {
      where: {
        id: conseillerNumeriqueMediateurId,
      },
      create: {
        id: conseillerNumeriqueMediateurId,
        conseillerNumerique: {
          connectOrCreate: {
            where: {
              id: conseillerNumeriqueConseillerNumeriqueId,
            },
            create: {
              id: conseillerNumeriqueConseillerNumeriqueId,
            },
          },
        },
        enActivite: {
          connectOrCreate: [
            {
              where: {
                id: '86643b16-de10-421e-b056-d820994572d1',
              },
              create: {
                id: '86643b16-de10-421e-b056-d820994572d1',
                structureId: mediateque.id,
              },
            },
            {
              where: {
                id: 'ef672b71-807b-41a6-9aca-3fac76478616',
              },
              create: {
                id: 'ef672b71-807b-41a6-9aca-3fac76478616',
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
        id: '4ee97bab-74eb-4776-b222-0ac40ed0f445',
      },
      create: {
        id: '4ee97bab-74eb-4776-b222-0ac40ed0f445',
        structureId: structureEmployeuse.id,
      },
    },
  },
})
