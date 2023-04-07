import { getValue, reset, updateValue } from './service'

describe('service', () => {
  beforeEach(() => reset())

  describe('get', () => {
    test('Should get stored value', async () => {
      const value = await getValue()
      expect(value).toBe('John Doe')
    })
  })

  describe('update', () => {
    test('should update value when new value is correct', async () => {
      const newValue = 'Jane Dane'
      await updateValue(newValue)

      const value = await getValue()
      expect(value).toBe(newValue)
    })

    test('should not update value when new value is not correct', async () => {
      await updateValue('')

      const value = await getValue()
      expect(value).toBe('John Doe')
    })
  })
})
