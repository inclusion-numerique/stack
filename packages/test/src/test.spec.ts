import 'jest'

describe('@lb/test', () => {
  it('is configured correctly with addons', () => {
    expect('It works').toEqual('It works')
    // It is extended with jest-extended
    expect('It is extended').toBeString()
  })
})
