import { changeObjectKeysCaseRecursive } from '@app/web/utils/changeObjectKeysCaseRecursive'

describe('changeObjectKeysCaseRecursive', () => {
  it('should change object keys case to snake case recursively', () => {
    const input = {
      missing: null,
      other: undefined,
      number: 0,
      string: '',
      fooBar: 'fooBar',
      array: ['foo', 'bar'],
      arrayObject: [{ bizzBuzz: 'booBoo' }, { booBoo: 'booboo' }],
      subObject: {
        fooBar: 'fooBar',
        arrayObject: [{ bizzBuzz: 'booBoo' }, { booBoo: 'booboo' }],
      },
    }

    expect(changeObjectKeysCaseRecursive(input, 'snake')).toEqual({
      missing: null,
      other: undefined,
      number: 0,
      string: '',
      foo_bar: 'fooBar',
      array: ['foo', 'bar'],
      array_object: [{ bizz_buzz: 'booBoo' }, { boo_boo: 'booboo' }],
      sub_object: {
        foo_bar: 'fooBar',
        array_object: [{ bizz_buzz: 'booBoo' }, { boo_boo: 'booboo' }],
      },
    })
  })
})
