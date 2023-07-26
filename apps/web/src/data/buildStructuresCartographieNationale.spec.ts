import { extractMetadataFromId } from '@app/web/data/buildDatabase/buildStructuresCartographieNationale'

describe('extractMetadataFromId', () => {
  it('should return the correct id when it is followed by hyphen', () => {
    const id =
      'mediation-conseiller-numerique-62ab017b8255a806e299c725-autre-chose'
    expect(extractMetadataFromId(id)).toEqual({
      conumPermanenceId: '62ab017b8255a806e299c725',
    })
  })

  it('should return the correct id when it is followed by "|"', () => {
    const id =
      'aidants-connect-12353|conseiller-numerique-62ab017b8255a806e299c725|'
    expect(extractMetadataFromId(id)).toEqual({
      conumPermanenceId: '62ab017b8255a806e299c725',
      aidantsConnectStructureId: '12353',
    })
  })

  it('should return the correct id when it is followed by text', () => {
    const id = 'conseiller-numerique-62ab017b8255a806e299c725numi'
    expect(extractMetadataFromId(id)).toEqual({
      conumPermanenceId: '62ab017b8255a806e299c725',
    })
  })

  it('should return undefined when the id is missing', () => {
    const id = 'conseiller-numerique-autre-chose'
    expect(extractMetadataFromId(id)).toEqual({})
  })

  it('should return undefined when the input does not match the expected format', () => {
    const id = 'conseillernumerique62ab017b8255a806e299c725-autre-chose'
    expect(extractMetadataFromId(id)).toEqual({})
  })

  it('should return undefined when the input is empty', () => {
    const id = ''
    expect(extractMetadataFromId(id)).toEqual({})
  })
})
