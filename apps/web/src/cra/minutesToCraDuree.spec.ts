import {
  craDureeDataToMinutes,
  minutesToCraDureeData,
} from '@app/web/cra/minutesToCraDuree'
import type { CraDureeData } from '@app/web/cra/CraDureeValidation'

describe('minutesToCraDuree', () => {
  describe('craDureeDataToMinutes Function', () => {
    it('should convert default duree to minutes', () => {
      const data: CraDureeData = {
        duree: '30',
        dureePersonnaliseeHeures: 4,
      }

      expect(craDureeDataToMinutes(data)).toBe(30)
    })

    it('should convert personnalisee duree in heures to total minutes', () => {
      const data: CraDureeData = {
        duree: 'personnaliser',
        dureePersonnaliseeHeures: 3,
      }

      expect(craDureeDataToMinutes(data)).toBe(180)
    })

    it('should convert personnalisee duree in minutes to total minutes', () => {
      const data: CraDureeData = {
        duree: 'personnaliser',
        dureePersonnaliseeMinutes: 59,
      }

      expect(craDureeDataToMinutes(data)).toBe(59)
    })

    it('should convert personnalisee duree in heures  and minutes to total minutes', () => {
      const data: CraDureeData = {
        duree: 'personnaliser',
        dureePersonnaliseeHeures: 1,
        dureePersonnaliseeMinutes: 15,
      }

      expect(craDureeDataToMinutes(data)).toBe(75)
    })

    it('should handle personnalisee duree with missing dureePersonnalisee gracefully', () => {
      const data: CraDureeData = {
        duree: 'personnaliser',
      }

      expect(craDureeDataToMinutes(data)).toBe(0)
    })

    it('should handle non-numeric duree gracefully', () => {
      const data: CraDureeData = {
        duree: 'personnaliser',
        dureePersonnaliseeHeures: Number.NaN,
      }

      expect(craDureeDataToMinutes(data)).toEqual(0)
    })
  })

  describe('minutesToCraDureeData Function', () => {
    it('should return null when minutes is undefined', () => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      expect(minutesToCraDureeData(undefined)).toBeNull()
    })

    it('should return null when minutes is null', () => {
      expect(minutesToCraDureeData(null)).toBeNull()
    })

    it('should convert default minutes to duree data', () => {
      const minutes = 30

      const expected = {
        duree: '30',
        dureePersonnaliseeHeures: undefined,
        dureePersonnaliseeMinutes: undefined,
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })

    it('should convert minutes not in default values to durée in minutes', () => {
      const minutes = 100

      const expected = {
        duree: '100',
        dureePersonnaliseeHeures: undefined,
        dureePersonnaliseeMinutes: undefined,
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })

    it('should handle exact hour conversions', () => {
      const minutes = 180 // 3 hours

      const expected = {
        duree: '180',
        dureePersonnaliseeHeures: undefined,
        dureePersonnaliseeMinutes: undefined,
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })

    it('should handle zero minutes', () => {
      const minutes = 0

      const expected = {
        duree: 'personnaliser',
        dureePersonnaliseeHeures: undefined,
        dureePersonnaliseeMinutes: undefined,
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })

    it('should handle minutes that are exactly in default values even if personnaliser', () => {
      const minutes = 30

      const expected = {
        duree: '30',
        dureePersonnaliseeHeures: undefined,
        dureePersonnaliseeMinutes: undefined,
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })
  })
})
