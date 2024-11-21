import {
  decodeSerializableState,
  EncodedState,
  encodeSerializableState,
} from './encodeSerializableState'

interface TestFormState {
  date: string
  mediateurId: string
  beneficiaire: {
    mediateurId: string
  }
}

const isUrlSafe = (encodedString: string): boolean => {
  try {
    return (
      decodeURIComponent(encodeURIComponent(encodedString)) === encodedString
    )
  } catch {
    return false
  }
}

const expectIsUrlSafe = (value: string) => {
  expect(isUrlSafe(value)).toBe(true)
}

describe('encodeSerializableState and decodeSerializableState', () => {
  const testFormState: TestFormState = {
    date: '2024-07-09',
    mediateurId: 'test-mediateur-id',
    beneficiaire: {
      mediateurId: 'test-mediateur-id',
    },
  }

  it('should encode and decode form state correctly', () => {
    const encodedState = encodeSerializableState(testFormState)

    expectIsUrlSafe(encodedState)

    const decodedState = decodeSerializableState(encodedState, {
      date: '',
      mediateurId: '',
      beneficiaire: {
        mediateurId: '',
      },
    })

    expect(decodedState).toEqual(testFormState)
  })

  it('should return an encoded string', () => {
    const encodedState = encodeSerializableState(testFormState)
    expectIsUrlSafe(encodedState)

    expect(typeof encodedState).toBe('string')
  })

  it('should throw an error when decoding an invalid string', () => {
    const invalidEncodedState = 'invalidString' as EncodedState<string>

    expect(decodeSerializableState(invalidEncodedState, 'ooof')).toEqual('ooof')
  })

  it('should work with Date objects', () => {
    const date = new Date('2024-07-09')
    const encodedState = encodeSerializableState(date)
    expectIsUrlSafe(encodedState)

    const decodedState = decodeSerializableState(
      encodedState,
      new Date('2024-07-09'),
    )
    expect(decodedState).toEqual(date)
  })

  it('should work with non latin characters', () => {
    const nonLatinString = '<stuff="éè">(Ç, Ş, Ğ, I, İ, Ö, Ü) </stuff>'

    const encodedState = encodeSerializableState(nonLatinString)

    expectIsUrlSafe(encodedState)

    const decodedState = decodeSerializableState(encodedState, null)

    expect(decodedState).toEqual(nonLatinString)
  })
})
