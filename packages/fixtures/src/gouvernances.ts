import { AppPrisma } from '@app/web/prisma'
import { users } from '@app/fixtures/users'

const gouvernanceConnect = (id: string) => ({
  connect: {
    id,
  },
})

export const gouvernances = () => {
  const createur = { connect: { id: users[0].id } }
  const rhone = {
    connect: {
      code: '69',
    },
  }
  const gironde = {
    connect: {
      code: '33',
    },
  }

  const metropoleDeLyon = {
    connect: {
      code: '200046977',
    },
  }

  const rhonePorteurEpciId = '8eea8b99-7f4d-4826-9751-bc81aa2687f2'
  const rhonePorteurEpci = {
    id: rhonePorteurEpciId,
    createur,
    derniereModificationPar: createur,
    departement: rhone,
    perimetre: 'departement',
    porteurEpci: metropoleDeLyon,
    noteDeContexte: 'Un contexte avec plein de précisions utiles',
  } satisfies AppPrisma.GouvernanceCreateInput

  return [rhonePorteurEpci]
}
