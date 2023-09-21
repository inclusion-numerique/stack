import { arrayToMap } from '@app/web/utils/arrayToMap'

describe('arrayToMap', () => {
  it('should correctly transform an array to a Map', () => {
    const inputArray = [
      { id: '1', value: 10 },
      { id: '2', value: 20 },
      { id: '3', value: 30 },
    ]

    const key = 'id'
    const expectedMap = new Map([
      ['1', { id: '1', value: 10 }],
      ['2', { id: '2', value: 20 }],
      ['3', { id: '3', value: 30 }],
    ])

    expect(arrayToMap(inputArray, key)).toEqual(expectedMap)
  })
})
