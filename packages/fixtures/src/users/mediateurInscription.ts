import { givenUser } from '../givenUser'

export const mediateurInscription = givenUser({
  id: '1c8a6a72-c912-4eff-a45f-1252fa09f1b9',
  firstName: 'Médiateur',
  lastName: 'Inscription',
  isFixture: true,
  role: 'User',
  mediateur: {
    connectOrCreate: {
      where: {
        id: '77ae444f-574c-4fcc-87cb-4f792725a496',
      },
      create: {
        id: '77ae444f-574c-4fcc-87cb-4f792725a496',
      },
    },
  },
})
