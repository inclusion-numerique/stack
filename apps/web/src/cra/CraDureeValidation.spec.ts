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
      dureePersonnaliseeHeures: 2,
      dureePersonnaliseeMinutes: 0,
    }

    expect(() => CraDureeValidation.parse(data)).not.toThrow()
  })

  // test case ok for only one of the two personnalisee fields

  it('should validate valid personnalisee duration with heures field only', () => {
    const data = {
      duree: 'personnaliser',
      dureePersonnaliseeHeures: 8,
    }

    expect(() => CraDureeValidation.parse(data)).not.toThrow()
  })

  it('should validate valid personnalisee duration with minutes field only', () => {
    const data = {
      duree: 'personnaliser',
      dureePersonnaliseeMinutes: 48,
    }

    expect(() => CraDureeValidation.parse(data)).not.toThrow()
  })

  it('should fail for too many hours', () => {
    const data = {
      duree: 'personnaliser',
      dureePersonnaliseeHeures: 25,
    }

    expect(() => CraDureeValidation.parse(data)).toThrow()
  })

  it('should fail for too many minutes', () => {
    const data = {
      duree: 'personnaliser',
      dureePersonnaliseeMinutes: 60,
    }

    expect(() => CraDureeValidation.parse(data)).toThrow()
  })

  it('should fail validation when duree is personnaliser but dureePersonnalisee is missing', () => {
    const data = {
      duree: 'personnaliser',
      dureePersonnaliseeHeures: null,
      dureePersonnaliseeMinutes: null,
    }

    expect(() => CraDureeValidation.parse(data)).toThrow(
      'Veuillez renseigner une durée personnalisée',
    )
  })

  it('should fail validation when duree is missing', () => {
    const data = {
      dureePersonnaliseeHeures: 90,
      dureePersonnaliseeMinutes: 60,
    }

    expect(() => CraDureeValidation.parse(data)).toThrow(
      'Veuillez renseigner une durée',
    )
  })
})
