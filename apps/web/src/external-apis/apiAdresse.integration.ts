import {
  searchAdresse,
  searchAdresses,
} from '@app/web/external-apis/apiAdresse'

describe('apiAdresse', () => {
  describe('searchAdresses (list)', () => {
    it('should return results for valid adress', async () => {
      const results = await searchAdresses('21 rue des ardennes, Paris')
      expect(results).toEqual([
        {
          geometry: { coordinates: [2.386_03, 48.888_467], type: 'Point' },
          properties: expect.objectContaining({
            city: 'Paris',
            citycode: '75119',
            context: '75, Paris, Île-de-France',
            district: 'Paris 19e Arrondissement',
            housenumber: '21',
            id: '75119_0427_00021',
            importance: expect.toBeNumber() as number,
            label: '21 Rue des Ardennes 75019 Paris',
            name: '21 Rue des Ardennes',
            postcode: '75019',
            score: expect.toBeNumber() as number,
            street: 'Rue des Ardennes',
            type: 'housenumber',
            x: 654_978.73,
            y: 6_865_558.82,
          }) as Record<string, unknown>,
          type: 'Feature',
        },
      ])
    })

    it('should return empty result for inexistant adress', async () => {
      const results = await searchAdresses('[Non-Diffusible]')
      expect(results).toEqual([])
    })
  })

  describe('searchAdresse (single)', () => {
    it('should return a single result for a valid address', async () => {
      const result = await searchAdresse('21 rue des ardennes, Paris')
      expect(result).toEqual({
        geometry: { coordinates: [2.386_03, 48.888_467], type: 'Point' },
        properties: expect.objectContaining({
          city: 'Paris',
          citycode: '75119',
          context: '75, Paris, Île-de-France',
          district: 'Paris 19e Arrondissement',
          housenumber: '21',
          id: '75119_0427_00021',
          importance: expect.toBeNumber() as number,
          label: '21 Rue des Ardennes 75019 Paris',
          name: '21 Rue des Ardennes',
          postcode: '75019',
          score: expect.toBeNumber() as number,
          street: 'Rue des Ardennes',
          type: 'housenumber',
          x: 654_978.73,
          y: 6_865_558.82,
        }) as Record<string, unknown>,
        type: 'Feature',
      })
    })

    it('should return null for an inexistant address', async () => {
      const result = await searchAdresse('[Non-Diffusible]')
      expect(result).toBeNull()
    })
  })
})
