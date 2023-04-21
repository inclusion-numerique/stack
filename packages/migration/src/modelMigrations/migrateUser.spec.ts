import { migrateUser } from '@lb/migration/modelMigrations/migrateUser'

jest.mock('uuid', () => ({ v4: () => '0000' }))

describe('migrateUser', () => {
  const transactionMock = {
    user: {
      upsert: jest.fn(),
    },
  }

  beforeEach(() => {
    transactionMock.user.upsert.mockReset()
  })

  it('should migrate a user', async () => {
    await migrateUser({
      transaction: transactionMock,
      legacyUser: {
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
      },
    })

    expect(transactionMock.user.upsert).toHaveBeenCalledOnceWith({
      where: {
        legacyId: 8,
      },
      update: {
        email: 'a.a@a.a',
        firstName: 'A',
        lastName: 'A',
        name: 'A A',
      },
      create: {
        email: 'a.a@a.a',
        firstName: 'A',
        id: '0000',
        lastName: 'A',
        legacyId: 8,
        name: 'A A',
      },
      select: {
        id: true,
      },
    })
  })
})
