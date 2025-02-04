import { removeUndefinedValues } from '@app/web/utils/removeUndefinedValues'

describe('removeUndefinedValues', () => {
  it('Removes undefined values', () => {
    expect(
      removeUndefinedValues({
        a: '',
        b: 0,
        c: {},
        d: [],
        e: null,
        f: undefined,
        g: Number.NaN,
        h: [
          {
            i: undefined,
            j: null,
            k: 'ok',
          },
        ],
        i: {
          j: undefined,
          k: null,
          l: 'ok',
        },
      }),
    ).toEqual({
      a: '',
      b: 0,
      c: {},
      d: [],
      e: null,
      g: Number.NaN,
      h: [{ j: null, k: 'ok' }],
      i: { k: null, l: 'ok' },
    })
  })
})
