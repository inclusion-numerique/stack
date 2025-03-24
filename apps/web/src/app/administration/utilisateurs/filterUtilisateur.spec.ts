import { RoleSlug, StatutSlug } from '@app/web/user/list'
import {
  filterOnLieux,
  filterOnRoles,
  filterOnStatut,
} from './filterUtilisateur'

describe('filter utilisateur', () => {
  describe('on statut', () => {
    it('should not filter when statut filter is empty', () => {
      const statut: StatutSlug | undefined = undefined

      const filters = filterOnStatut({ statut })

      expect(filters).toEqual({})
    })

    it('should filter when statut filter is set to inscrit', () => {
      const statut: StatutSlug | undefined = 'inscrit'

      const filters = filterOnStatut({ statut })

      expect(filters).toEqual({
        inscriptionValidee: { not: null },
      })
    })

    it('should filter when statut filter is set to inscription', () => {
      const statut: StatutSlug | undefined = 'inscription'

      const filters = filterOnStatut({ statut })

      expect(filters).toEqual({
        inscriptionValidee: null,
      })
    })

    it('should filter when statut filter is set to deleted', () => {
      const statut: StatutSlug | undefined = 'deleted'

      const filters = filterOnStatut({ statut })

      expect(filters).toEqual({
        deleted: { not: null },
      })
    })
  })

  describe('on roles', () => {
    it('should not filter when roles filter is empty', () => {
      const roles: RoleSlug[] = []

      const filters = filterOnRoles({ roles })

      expect(filters).toEqual({})
    })

    it('should filter when roles filter is set to mediateur', () => {
      const roles: RoleSlug[] | undefined = ['mediateur']

      const filters = filterOnRoles({ roles })

      expect(filters).toEqual({
        role: { in: ['User'] },
        mediateur: { isNot: null },
      })
    })

    it('should filter when roles filter is set to conseiller-numerique', () => {
      const roles: RoleSlug[] | undefined = ['conseiller-numerique']

      const filters = filterOnRoles({ roles })

      expect(filters).toEqual({
        role: { in: ['User'] },
        mediateur: { conseillerNumerique: { isNot: null } },
      })
    })

    it('should filter when roles filter is set to coordinateur', () => {
      const roles: RoleSlug[] | undefined = ['coordinateur']

      const filters = filterOnRoles({ roles })

      expect(filters).toEqual({
        role: { in: ['User'] },
        coordinateur: { isNot: null },
      })
    })

    it('should filter when roles filter is set to administrateur', () => {
      const roles: RoleSlug[] | undefined = ['administrateur']

      const filters = filterOnRoles({ roles })

      expect(filters).toEqual({
        role: { in: ['Admin'] },
      })
    })

    it('should filter when roles filter is set to administrateur and mediateur', () => {
      const roles: RoleSlug[] | undefined = ['administrateur', 'mediateur']

      const filters = filterOnRoles({ roles })

      expect(filters).toEqual({
        role: { in: ['Admin', 'User'] },
        mediateur: {
          isNot: null,
        },
      })
    })
  })

  describe('on lieux', () => {
    it('should not filter when roles filter is empty', () => {
      const data = { lieux: [], departements: [], communes: [] }

      const filters = filterOnLieux(data)

      expect(filters).toEqual({})
    })

    it('should filter when lieux filter contains an id', () => {
      const data = { lieux: ['52f16963-fc6f-4684-a690-68b28f10da6a'] }

      const filters = filterOnLieux(data)

      expect(filters).toEqual({
        emplois: {
          some: {
            structure: {
              id: {
                in: ['52f16963-fc6f-4684-a690-68b28f10da6a'],
              },
            },
          },
        },
      })
    })

    it('should filter when departements filter contains a departement', () => {
      const data = { departements: ['75'] }

      const filters = filterOnLieux(data)

      expect(filters).toEqual({
        emplois: {
          some: {
            structure: {
              OR: [
                {
                  codeInsee: {
                    startsWith: '75',
                  },
                },
              ],
            },
          },
        },
      })
    })

    it('should filter when communes filter contains a commune', () => {
      const data = { communes: ['86137'] }

      const filters = filterOnLieux(data)

      expect(filters).toEqual({
        emplois: {
          some: {
            structure: {
              codeInsee: {
                in: ['86137'],
              },
            },
          },
        },
      })
    })

    it('should filter communes, departements and lieux, when all are filterd', () => {
      const data = {
        lieux: ['52f16963-fc6f-4684-a690-68b28f10da6a'],
        departements: ['75'],
        communes: ['86137'],
      }

      const filters = filterOnLieux(data)

      expect(filters).toEqual({
        emplois: {
          some: {
            structure: {
              OR: [
                {
                  codeInsee: {
                    startsWith: '75',
                  },
                },
              ],
              codeInsee: {
                in: ['86137'],
              },
              id: {
                in: ['52f16963-fc6f-4684-a690-68b28f10da6a'],
              },
            },
          },
        },
      })
    })
  })
})
