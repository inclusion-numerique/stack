import { extractMetadataFromId } from '@app/web/data/buildDatabase/buildStructuresCartographieNationale'

describe('extractMetadataFromId', () => {
  it('should extract conumPermanenceId and aidantsConnectStructureId correctly', () => {
    const id =
      'Conseiller-Numerique_62da8fb0f98ccf06dc2174ee|Département-du-Maine-et-Loire_LMN075|Aidants-Connect_0fff0d9e-37aa-4071-a983-f137384bc549'
    const result = extractMetadataFromId(id)
    expect(result).toEqual({
      conumPermanenceId: '62da8fb0f98ccf06dc2174ee',
      aidantsConnectStructureId: '0fff0d9e-37aa-4071-a983-f137384bc549',
    })
  })

  it('should return undefined for both ids if they are not present', () => {
    const id = 'some-random-string'
    const result = extractMetadataFromId(id)
    expect(result).toEqual({
      conumPermanenceId: undefined,
      aidantsConnectStructureId: undefined,
    })
  })

  it('should return undefined for aidantsConnectStructureId if it is not present', () => {
    const id = 'Conseiller-Numerique_abcdef123456'
    const result = extractMetadataFromId(id)
    expect(result).toEqual({
      conumPermanenceId: 'abcdef123456',
      aidantsConnectStructureId: undefined,
    })
  })

  it('should return undefined for conumPermanenceId if it is not present', () => {
    const id = 'Aidants-Connect_12345'
    const result = extractMetadataFromId(id)
    expect(result).toEqual({
      conumPermanenceId: undefined,
      aidantsConnectStructureId: '12345',
    })
  })
})
