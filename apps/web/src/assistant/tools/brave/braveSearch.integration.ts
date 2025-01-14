import { executeBraveWebSearch } from '@app/web/assistant/tools/brave/braveSearch'

describe('braveSearch', () => {
  it('should return a list of results', async () => {
    const results = await executeBraveWebSearch({
      q: 'les bases du numérique d’intéret géneral',
    })

    expect(results).toHaveLength(4)
    expect(results.at(0)?.url).toStartWith('https://lesbases.anct.gouv.fr/')
  })
})
