import {
  LegacyResource,
  migrateResource,
} from '@app/migration/modelMigrations/migrateResource'
import { createMockPrisma } from '@app/migration/test/createPrismaMock'
import { mockReset } from 'jest-mock-extended'
import { createLegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'

jest.mock('uuid', () => ({ v4: () => '0000' }))

describe('migrateResource', () => {
  const mockTransaction = createMockPrisma()

  beforeEach(() => {
    mockReset(mockTransaction)
  })

  it('should migrate a resource', async () => {
    const legacyResource = {
      id: 1238n,
      title:
        'Diffuser simplement les informations utiles aux habitants de sa commune',
      description:
        "L'Annuaire des Collectivités est un service public numérique développé par l'Incubateur des Territoires ANCT permettant aux communes de disposer d'une interface web centralisant des informations fiables et utiles pour le citoyens : horaires d'ouverture de la mairie, liens vers les démarches administratives (acte de naissance, renouvellement de CNU), présentation des élus...",
      creator_id: 7494n,
      root_base_id: 443n,
      producer_state: 'me',
      is_linked_to_a_territory: false,
      access_requires_user_account: null,
      state: 'public',
      resource_created_on: '02/2023',
      label_details: null,
      label_state: '',
      is_grid_view_enabled: false,
      has_global_license: true,
      license_text_id: null,
      profile_image_id: 740n,
      can_evaluate: true,
      created: new Date('2022-06-30'),
      modified: new Date('2022-06-30'),
      main_contentblock: [],
      main_basesection_resources: [],
      main_contentsection: [],
    } satisfies LegacyResource

    mockTransaction.resource.upsert.mockResolvedValueOnce({
      legacyId: 129,
      id: '0000',
    } as never)

    const result = await migrateResource({
      transaction: mockTransaction,
      legacyResource,
      slug: 'test-slug',
      userIdFromLegacyId: createLegacyToNewIdHelper([
        { legacyId: Number(legacyResource.creator_id), id: '0000' },
      ]),
      baseIdFromLegacyId: createLegacyToNewIdHelper([
        { legacyId: Number(legacyResource.root_base_id), id: 'aaaa' },
      ]),
    })

    expect(mockTransaction.resource.upsert).toHaveBeenCalledOnceWith({
      where: {
        legacyId: 129,
      },
      update: {
        description:
          "proposition de jeu type memory pour l'animation d'atelier de manière dé-connecté",
        ownerId: '0000',
        slug: 'test-slug',
        title: legacyResource.title,
        created: legacyResource.created,
        updated: legacyResource.modified,
      },
      create: {
        description:
          "proposition de jeu type memory pour l'animation d'atelier de manière dé-connecté",
        id: '0000',
        legacyId: 129,
        ownerId: '0000',
        slug: 'test-slug',
        title: legacyResource.title,
        created: legacyResource.created,
        updated: legacyResource.modified,
      },
      select: {
        id: true,
        legacyId: true,
        ownerId: true,
      },
    })

    expect(result).toEqual({
      legacyId: 129,
      id: '0000',
    })
  })
})
