import {
  containsPrefecture,
  qualifyPrefectureOrganization,
  removeAccents,
} from '@app/web/security/prefectureOrganization'
import { MonCompteProOrganization } from '@app/web/auth/monCompteProConnect'

describe('prefectureOrganization', () => {
  describe('containsPrefecture', () => {
    it('should remove accents from a string', () => {
      const result = removeAccents("Préfecture de l'Ain")
      expect(result).toBe("Prefecture de l'Ain")
    })

    it('should check if label contains "prefecture"', () => {
      const test1 = containsPrefecture("Préfecture de l'Ain")
      expect(test1).toBe(true)

      const test2 = containsPrefecture('Isère - PREFECTURE')
      expect(test2).toBe(true)

      const test3 = containsPrefecture('Mairie de Lyon')
      expect(test3).toBe(false)

      const test4 = containsPrefecture('Une préfecture')
      expect(test4).toBe(true)
    })
  })

  describe('qualifyPrefectureOrganization', () => {
    const now = new Date('2023-08-03T12:00:00')
    beforeAll(() => {
      jest.useFakeTimers({ now })
    })

    afterAll(() => {
      jest.useRealTimers()
    })

    const prefectureOrganization: MonCompteProOrganization = {
      id: '3',
      siret: '17380001200010',
      label: "préfecture de l'Isère",
      is_service_public: true,
      is_collectivite_territoriale: false,
      is_external: false,
    }

    const prefectureOrganizationWithoutPublicService: MonCompteProOrganization =
      {
        id: '3',
        siret: '17380001200010',
        label: "Préfecture de l'Isère",
        is_service_public: false,
        is_collectivite_territoriale: false,
        is_external: false,
      }

    const nonPrefectureSiret: MonCompteProOrganization = {
      id: '3',
      siret: '77967371400019',
      label: 'Pas une préfecture',
      is_service_public: true,
      is_collectivite_territoriale: false,
      is_external: false,
    }

    const nonPrefectureLabel: MonCompteProOrganization = {
      id: '3',
      siret: '77967371400019',
      label: 'CINEMA LE MELIES',
      is_service_public: true,
      is_collectivite_territoriale: false,
      is_external: false,
    }

    it('Detects a prefecture and gives info on its departement', async () => {
      const result = await qualifyPrefectureOrganization(prefectureOrganization)

      expect(result).toEqual({
        ...prefectureOrganization,
        prefectureCheckedAt: now,
        isDepartementPrefecture: '38',
      })
    })

    it('Checks MonComptePro public flag before authorizing', async () => {
      const result = await qualifyPrefectureOrganization(
        prefectureOrganizationWithoutPublicService,
      )

      expect(result).toEqual({
        ...prefectureOrganizationWithoutPublicService,
        prefectureCheckedAt: now,
        isDepartementPrefecture: undefined,
      })
    })

    it('Do not authorized organizations with label not matching siren', async () => {
      const result = await qualifyPrefectureOrganization(nonPrefectureSiret)

      expect(result).toEqual({
        ...nonPrefectureSiret,
        prefectureCheckedAt: now,
        isDepartementPrefecture: undefined,
      })
    })

    it('Do not authorized organizations with non prefecture label', async () => {
      const result = await qualifyPrefectureOrganization(nonPrefectureLabel)

      expect(result).toEqual({
        ...nonPrefectureLabel,
        prefectureCheckedAt: now,
        isDepartementPrefecture: undefined,
      })
    })
  })
})
