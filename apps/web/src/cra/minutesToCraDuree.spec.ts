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
        dureePersonnalisee: undefined,
        dureePersonnaliseeType: undefined,
      }

      expect(craDureeDataToMinutes(data)).toBe(30)
    })

    it('should convert personnalisee duree in minutes to total minutes', () => {
      const data: CraDureeData = {
        duree: 'personnaliser',
        dureePersonnalisee: '90',
        dureePersonnaliseeType: 'minutes',
      }

      expect(craDureeDataToMinutes(data)).toBe(90)
    })

    it('should convert personnalisee duree in heures to total minutes', () => {
      const data: CraDureeData = {
        duree: 'personnaliser',
        dureePersonnalisee: '2',
        dureePersonnaliseeType: 'heures',
      }

      expect(craDureeDataToMinutes(data)).toBe(120)
    })

    it('should handle personnalisee duree with missing dureePersonnalisee gracefully', () => {
      const data: CraDureeData = {
        duree: 'personnaliser',
        dureePersonnalisee: undefined,
        dureePersonnaliseeType: 'minutes',
      }

      expect(craDureeDataToMinutes(data)).toBe(0)
    })

    it('should handle personnalisee duree with missing dureePersonnaliseeType gracefully', () => {
      const data: CraDureeData = {
        duree: 'personnaliser',
        dureePersonnalisee: '45',
        dureePersonnaliseeType: undefined,
      }

      // Since dureePersonnaliseeType is undefined, default to minutes
      expect(craDureeDataToMinutes(data)).toBe(45)
    })

    it('should handle non-numeric duree gracefully', () => {
      const data: CraDureeData = {
        duree: 'personnaliser',
        dureePersonnalisee: 'abc',
        dureePersonnaliseeType: 'minutes',
      }

      // parseInt('abc', 10) returns NaN, but Number.parseInt('abc', 10) returns NaN, which coerces to NaN
      expect(craDureeDataToMinutes(data)).toBeNaN()
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
        dureePersonnalisee: undefined,
        dureePersonnaliseeType: undefined,
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })

    it('should convert minutes not in default values to personnalisee duree in minutes', () => {
      const minutes = 100

      const expected = {
        duree: 'personnaliser',
        dureePersonnalisee: '100',
        dureePersonnaliseeType: 'minutes',
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })

    it('should convert minutes not in default values to personnalisee duree in heures and minutes', () => {
      const minutes = 125 // 2 hours and 5 minutes

      const expected = {
        duree: 'personnaliser',
        dureePersonnalisee: '125',
        dureePersonnaliseeType: 'minutes',
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })

    it('should handle exact hour conversions', () => {
      const minutes = 180 // 3 hours

      const expected = {
        duree: 'personnaliser',
        dureePersonnalisee: '3',
        dureePersonnaliseeType: 'heures',
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })

    it('should handle zero minutes', () => {
      const minutes = 0

      const expected = {
        duree: 'personnaliser',
        dureePersonnalisee: '0',
        dureePersonnaliseeType: 'minutes',
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })

    it('should handle negative minutes', () => {
      const minutes = -30

      const expected = {
        duree: 'personnaliser',
        dureePersonnalisee: '-30',
        dureePersonnaliseeType: 'minutes',
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })

    it('should convert minutes to personnalisee duree in heures when applicable', () => {
      const minutes = 65 // 1 hour and 5 minutes

      const expected = {
        duree: 'personnaliser',
        dureePersonnalisee: '65',
        dureePersonnaliseeType: 'minutes',
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })

    it('should handle minutes that are exactly in default values even if personnaliser', () => {
      const minutes = 30

      const expected = {
        duree: '30',
        dureePersonnalisee: undefined,
        dureePersonnaliseeType: undefined,
      }

      expect(minutesToCraDureeData(minutes)).toEqual(expected)
    })
  })
})
