import { givenUser } from '../givenUser'
import { structureEmployeuse } from '../structures'

export const coordinateurInscritCoordinateurId =
  'c2a5a5f3-56be-4632-9253-880fb3ff9ea4'

export const coordinateurInscrit = givenUser({
  id: '28bd02a6-7096-4453-9cc3-5eb4f6efc955',
  firstName: 'Coordinateur',
  lastName: 'Inscrit',
  isFixture: true,
  role: 'User',
  coordinateur: {
    connectOrCreate: {
      where: {
        id: coordinateurInscritCoordinateurId,
      },
      create: {
        id: coordinateurInscritCoordinateurId,
        conseillerNumeriqueId: 'coordinateur-inscrit',
      },
    },
  },
  emplois: {
    connectOrCreate: {
      where: {
        id: '29c6b7f2-9ef3-48f2-898e-ae471b5e0fa3',
      },
      create: {
        id: '29c6b7f2-9ef3-48f2-898e-ae471b5e0fa3',
        structureId: structureEmployeuse.id,
      },
    },
  },
  profilInscription: 'Coordinateur',
  acceptationCgu: new Date(),
  inscriptionValidee: new Date(),
  structureEmployeuseRenseignee: new Date(),
})
