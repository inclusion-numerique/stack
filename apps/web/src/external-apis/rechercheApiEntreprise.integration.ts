import { rechercheApiEntreprise } from '@app/web/external-apis/rechercheApiEntreprise'

describe('rechercheApiEntreprise', () => {
  it('should return a result for a "non diffusible" siret', async () => {
    const results = await rechercheApiEntreprise({
      q: '93429789600011',
    })

    expect(results.total_results).toEqual(1)
    expect(results.results[0]).toEqual(
      expect.objectContaining({
        activite_principale: '62.02A',
        date_creation: '2024-11-04',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        siege: expect.objectContaining({
          siret: '93429789600011',
        }),
      }),
    )
  })
})
