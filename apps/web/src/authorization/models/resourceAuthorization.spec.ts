import { Grantee } from '@app/web/authorization/grantee'
import { testSessionUser } from '@app/web/test/testSessionUser'
import {
  getResourcePermissions,
  getResourceRoles,
  ResourceAuthorizationTarget,
  ResourceRoles,
} from '@app/web/authorization/models/resourceAuthorization'
import { SessionUser } from '@app/web/auth/sessionUser'

describe('Authorization - Ressources', () => {
  const resource = {
    baseId: null,
    createdById: 'creator',
    isPublic: false,
    published: null,
    deleted: null,
  } satisfies ResourceAuthorizationTarget

  const basePublique = {
    id: 'basePublique',
    isPublic: true,
    collections: [],
    slug: 'base-publique',
    savedCollections: [],
    title: 'Base publique',
  } satisfies SessionUser['bases'][number]['base']

  const basePrivee = {
    id: 'basePrivee',
    isPublic: false,
    collections: [],
    slug: 'base-privee',
    savedCollections: [],
    title: 'Base privée',
  } satisfies SessionUser['bases'][number]['base']

  const user = { ...testSessionUser } satisfies Grantee

  describe('Roles - Ressources', () => {
    it('Anonyme, aucun role', () => {
      expect(getResourceRoles(resource, null)).toEqual([])
    })

    it('Utilisateur connecté, aucun rôle', () => {
      expect(getResourceRoles(resource, user)).toEqual([])
    })

    it('Role createur', () => {
      expect(getResourceRoles(resource, { ...user, id: 'creator' })).toEqual([
        ResourceRoles.ResourceCreator,
      ])
    })

    it('Role contributeur', () => {
      expect(
        getResourceRoles(resource, { ...user, id: 'contributor' }),
      ).toEqual([ResourceRoles.ResourceContributor])
    })

    it('Membre de la base de la ressource, je suis contributeur', () => {
      expect(
        getResourceRoles(
          { ...resource, baseId: basePrivee.id },
          { ...user, bases: [{ base: basePrivee, isAdmin: false }] },
        ),
      ).toEqual([ResourceRoles.ResourceContributor])
    })

    it('Membre admin de la base de la ressource, je suis contributeur', () => {
      expect(
        getResourceRoles(
          { ...resource, baseId: basePrivee.id },
          { ...user, bases: [{ base: basePrivee, isAdmin: true }] },
        ),
      ).toEqual([ResourceRoles.ResourceContributor])
    })

    it('Membre d’une autre base que celle de la ressource, aucun role', () => {
      expect(
        getResourceRoles(
          { ...resource, baseId: basePrivee.id },
          { ...user, bases: [{ base: basePublique, isAdmin: false }] },
        ),
      ).toEqual([])
    })

    // Si je suis membre de la base qui contient la ressource => [ResourceRoles.ResourceContributor]
    // Si je suis admin de la base qui contient la ressource => [ResourceRoles.ResourceContributor]
  })

  describe('Permissions - Ressources', () => {
    // Si je suis admin => je peux tout faire
    // Si je suis créateur => je peux ...
    // Si je suis contributeur => je peux .....

    it("Si la ressource est supprimée, je n'ai pas de permissions", () => {
      expect(
        getResourcePermissions(
          { ...resource, deleted: new Date() },
          { ...user, role: 'Admin' },
          [ResourceRoles.ResourceContributor, ResourceRoles.ResourceCreator],
        ),
      ).toEqual([])
    })

    it('Si je suis contributeur, je peux editer la ressource', () => {
      expect(
        getResourcePermissions(resource, { ...user, id: 'contributor' }, [
          ResourceRoles.ResourceContributor,
        ]),
      ).toEqual([
        'WriteResource',
        'ReadResourceContent',
        'DeleteResource',
        'AddResourceContributor',
        'RemoveResourceContributor',
      ])
    })

    // Si je suis membre de la base qui a a accès à la ressource => je peux ....
    // Tester si [ResourceRoles.ResourceCreator, ResourceRoles.ResourceContributor] => [ResourcePermissions.ReadGeneralResourceInformation, ResourcePermissions.WriteResource, ResourcePermissions.DeleteResource, ResourcePermissions.ReadResourceContent, ResourceContributorPermissions.AddResourceContributor, ResourceContributorPermissions.RemoveResourceContributor]
  })

  describe('Admin and support', () => {
    it('Admin has all permissions', () => {
      expect(
        getResourcePermissions(resource, { ...user, role: 'Admin' }),
      ).toEqual(resourcePermissions)
    })

    it('Admin has no permissions for deleted resources', () => {
      expect(
        getResourcePermissions(
          { ...resource, deleted: new Date() },
          { ...user, role: 'Admin' },
        ),
      ).toEqual([])
    })

    it('Support has all permissions', () => {
      expect(
        getResourcePermissions(resource, { ...user, role: 'Support' }),
      ).toEqual(resourcePermissions)
    })

    it('Support has no permissions for deleted resources', () => {
      expect(
        getResourcePermissions(
          { ...resource, deleted: new Date() },
          { ...user, role: 'Support' },
        ),
      ).toEqual([])
    })
  })

  describe('Anonymous', () => {
    it('Anonymous cannot view draft resources', () => {
      expect(getResourcePermissions(resource, null)).toEqual([])
    })

    it('Anonymous can view public resources', () => {
      expect(
        getResourcePermissions({ ...resource, isPublic: true }, null),
      ).toEqual([])
    })

    it('Anonymous cannot view deleted resources', () => {
      expect(
        getResourcePermissions(
          { ...resource, isPublic: true, deleted: new Date() },
          null,
        ),
      ).toEqual([])
    })
  })
})
