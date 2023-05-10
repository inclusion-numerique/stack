import {
  LegacyUser,
  transformUser,
} from '@app/migration/modelMigrations/migrateUsers'
import { createMockPrisma } from '@app/migration/test/createPrismaMock'
import { mockReset } from 'jest-mock-extended'

jest.mock('uuid', () => ({ v4: () => '0000' }))

describe('migrateUser', () => {
  const mockTransaction = createMockPrisma()

  beforeEach(() => {
    mockReset(mockTransaction)
  })

  it('should migrate a user', () => {
    const legacyUser = {
      first_name: 'A',
      email: 'a.a@a.a',
      last_name: 'A',
      is_active: true,
      id: BigInt(8),
      is_admin: false,
      is_superuser: false,
      password: 'oui',
      created: new Date('2020-02-02'),
      modified: new Date('2020-02-02'),
      last_login: null,
      cnfs_id: null,
      cnfs_id_organization: null,
    } satisfies LegacyUser

    expect(
      transformUser({
        legacyUser,
        emailMap: new Map(),
      }),
    ).toEqual({
      email: 'a.a@a.a',
      firstName: 'A',
      id: '0000',
      lastName: 'A',
      legacyId: 8,
      name: 'A A',
      updated: legacyUser.modified,
      created: legacyUser.created,
      emailVerified: legacyUser.created,
    })
  })
})
