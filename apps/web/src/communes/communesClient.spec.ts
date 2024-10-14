import { createCommunesClient } from '@app/web/communes/communesClient'

describe('findCommune', () => {
  describe('getCommunesClient', () => {
    test.each([
      [
        '39274',
        { codeInsee: '39274', nom: 'Lajoux', codePostal: '01410, 39310' },
      ],
      ['01082', { codeInsee: '01082', nom: 'Chanay', codePostal: '01420' }],
      ['99999', null], // non-existent commune
    ])(
      'findCommuneByInsee(%s) should return %o',
      async (inseeCode, expectedResult) => {
        const client = await createCommunesClient()
        const result = client.findCommuneByInsee(inseeCode)
        expect(result).toEqual(expectedResult)
      },
    )
  })
})
