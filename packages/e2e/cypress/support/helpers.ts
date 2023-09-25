import { v4 } from 'uuid'
import { CreateUserInput } from '../e2e/authentication/user.tasks'

export const appUrl = (path: string) =>
  `${Cypress.config().baseUrl}${encodeURI(path)}`

export const createTestUser = (data?: Partial<CreateUserInput>) =>
  ({
    id: v4(),
    email: `test-${v4()}@example.com`,
    firstName: 'Jean',
    lastName: 'Biche',
    name: 'Jean Biche',
    emailVerified: new Date('2023-04-01'),
    ...data,
  } as CreateUserInput & {
    id: string
    email: string
    firstName: string
    lastName: string
    name: string
  })
export const dataTablesToKeep = [
  'regions',
  'departements',
  'epcis',
  'communes',
  'code_postaux',
  'code_postal',
  'structures_cartographie_nationale',
  'structures_aidants_connect',
  'conseiller_numerique',
  'coordinateur_conseiller_numerique',
  'permanences_conseiller_numerique',
  'conseillers_numeriques_en_permanence',
  'ifn_epci',
  'ifn_commune',
  'cra_conseiller_numerique_par_departement',
]
