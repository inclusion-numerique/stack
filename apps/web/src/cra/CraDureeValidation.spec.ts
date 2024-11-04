import { CraDureeValidation } from '@app/web/cra/CraDureeValidation'

describe('CraDureeValidation Schema', () => {
  it('should validate valid default duration without personnalisee fields', () => {
    const data = {
      duree: '30',
    }

    expect(() => CraDureeValidation.parse(data)).not.toThrow()
  })

  it('should validate valid personnalisee duration with all required fields', () => {
    const data = {
      duree: 'personnaliser',
      dureePersonnalisee: '90',
      dureePersonnaliseeType: 'minutes',
    }

    expect(() => CraDureeValidation.parse(data)).not.toThrow()
  })

  it('should fail validation when duree is personnaliser but dureePersonnalisee is missing', () => {
    const data = {
      duree: 'personnaliser',
      dureePersonnaliseeType: 'minutes',
    }

    expect(() => CraDureeValidation.parse(data)).toThrow(
      'Veuillez renseigner une durée personnalisée',
    )
  })

  it('should fail validation when duree is personnaliser but dureePersonnaliseeType is missing', () => {
    const data = {
      duree: 'personnaliser',
      dureePersonnalisee: '90',
    }

    expect(() => CraDureeValidation.parse(data)).toThrow(
      'Veuillez renseigner une durée personnalisée',
    )
  })

  it('should fail validation when duree is not in default values or personnaliser', () => {
    const data = {
      duree: '70',
    }

    expect(() => CraDureeValidation.parse(data)).toThrow()
  })

  it('should fail validation when duree is missing', () => {
    const data = {
      dureePersonnalisee: '90',
      dureePersonnaliseeType: 'minutes',
    }

    expect(() => CraDureeValidation.parse(data)).toThrow(
      'Veuillez renseigner une durée',
    )
  })
})
