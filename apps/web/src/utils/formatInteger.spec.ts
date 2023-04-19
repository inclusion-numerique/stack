import { formatInteger } from '@lb/web/utils/formatInteger'

describe('formatInteger', () => {
  it('formats integer smaller than 1000', () => {
    expect(formatInteger(999)).toEqual('999')
  })
  it('formats integer smaller than 10 000', () => {
    expect(formatInteger(8500)).toEqual('8500')
  })
  it('formats integer larger than 10 000', () => {
    expect(formatInteger(50_000)).toEqual('50 000')
  })
  it('formats integer larger than 1 000 000', () => {
    expect(formatInteger(8_500_000)).toEqual('8 500 000')
  })
})
