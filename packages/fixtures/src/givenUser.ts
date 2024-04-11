import { CreateUserInput } from '@app/e2e/e2e/authentication/user.tasks'
import { v4 } from 'uuid'
import { createSlug } from '@app/web/utils/createSlug'

export const givenUser = <
  T extends Partial<
    CreateUserInput & {
      id: string
      email: string
      firstName: string
      lastName: string
      name: string
    }
  >,
>(
  data?: T,
): CreateUserInput => {
  const id = v4()
  const firstName = data?.firstName ?? 'Jean'
  const lastName = data?.lastName ?? 'Biche'
  const name = `${firstName} ${lastName}`
  const slug = createSlug(name)

  return {
    id,
    email: `${slug}@coop-mediation-numerique.anct.gouv.fr`,
    firstName: 'yo',
    lastName,
    name,
    role: 'User',
    emailVerified: new Date('2024-04-11'),
    ...data,
  } satisfies {
    id: string
    email: string
    firstName: string
    lastName: string
    name: string
  } & CreateUserInput
}
