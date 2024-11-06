import { dureeAsString } from '@app/web/utils/dureeAsString'

describe('dureeAsString', () => {
  // use jest cases each

  const cases = [
    { value: 15, expected: '15 min' },
    { value: 30.1, expected: '30 min' },
    { value: 45, expected: '45 min' },
    { value: 60, expected: '1 h' },
    { value: 90, expected: '1 h 30' },
    { value: 120, expected: '2 h' },
    { value: 145.8, expected: '2 h 26' },
    { value: 0, expected: '0 min' },
  ]

  test.each(cases)(
    'should format $value to $expected',
    ({ value, expected }) => {
      expect(dureeAsString(value)).toEqual(expected)
    },
  )
})
