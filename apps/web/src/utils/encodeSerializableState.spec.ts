import {
  EncodedState,
  decodeSerializableState,
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

  it('should work with non-unicode characters', () => {
    const bizarreString = {
      text:
        'こんにちは世界🌍✨\n' + // Japonais + emoji
        'مرحبا بكم\n' + // Arabe (écriture de droite à gauche)
        '👻🤖💀🐉🧛‍♂️🧚‍♀️💫\n' + // Emojis variés
        '特殊文字と𠀋𠮷𡈽\n' + // Caractères CJK (Chinois, Japonais, Coréen)
        '‽¡¿\n' + // Punctuations bizarres
        '\u200B\u200D\u2060', // Caractères invisibles (zero-width space, joiner)
    }

    const encodedState = encodeSerializableState(bizarreString)
    const decodedState = decodeSerializableState(encodedState, { text: '' })

    expectIsUrlSafe(encodedState)

    expect(decodedState).toEqual(bizarreString)
  })

  it('should work with non latin characters', () => {
    const nonLatinString = '<stuff="éè">(Ç, Ş, Ğ, I, İ, Ö, Ü) </stuff>'

    const encodedState = encodeSerializableState(nonLatinString)

    expectIsUrlSafe(encodedState)

    const decodedState = decodeSerializableState(encodedState, null)

    expect(decodedState).toEqual(nonLatinString)
  })
})
