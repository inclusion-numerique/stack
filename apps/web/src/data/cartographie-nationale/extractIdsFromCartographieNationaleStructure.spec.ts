import { extractIdsFromCartographieNationaleStructure } from '@app/web/data/cartographie-nationale/extractIdsFromCartographieNationaleStructure'

describe('extractIdsFromCartographieNationaleStructure', () => {
  test('should extract conseillerNumeriquePermanenceIds and coopIds', () => {
    const id =
      'Conseiller-Numerique_62ab017b8255a806e299c725__Coop_aaabb333-cccdd-4343__Coop_bb112233-4455'
    const result = extractIdsFromCartographieNationaleStructure({ id })

    expect(result).toEqual({
      coopId: ['aaabb333-cccdd-4343', 'bb112233-4455'],
      coopIds: ['aaabb333-cccdd-4343', 'bb112233-4455'],
      conseillerNumeriquePermanenceIds: ['62ab017b8255a806e299c725'],
    })
  })

  test('should return empty arrays for missing ids', () => {
    const id = 'Some_Other_Id_String'
    const result = extractIdsFromCartographieNationaleStructure({ id })

    expect(result).toEqual({
      coopId: [],
      coopIds: [],
      conseillerNumeriquePermanenceIds: [],
    })
  })

  test('should extract multiple coopIds', () => {
    const id =
      'Coop_aaabb333-cccdd-4343__Coop_bb112233-4455__Coop_cc556677-8899'
    const result = extractIdsFromCartographieNationaleStructure({ id })

    expect(result).toEqual({
      coopId: ['aaabb333-cccdd-4343', 'bb112233-4455', 'cc556677-8899'],
      coopIds: ['aaabb333-cccdd-4343', 'bb112233-4455', 'cc556677-8899'],
      conseillerNumeriquePermanenceIds: [],
    })
  })

  test('should extract only valid coopIds', () => {
    const id = 'Coop_invalid__Coop_bb112233-4455__SomeOtherId_123'
    const result = extractIdsFromCartographieNationaleStructure({ id })

    expect(result).toEqual({
      coopId: ['bb112233-4455'],
      coopIds: ['bb112233-4455'],
      conseillerNumeriquePermanenceIds: [],
    })
  })

  test('should handle both valid permanence and coop ids', () => {
    const id =
      'Conseiller-Numerique_abcdef123__Coop_aaabb333-cccdd-4343__Coop_bb112233-4455'
    const result = extractIdsFromCartographieNationaleStructure({ id })

    expect(result).toEqual({
      coopId: ['aaabb333-cccdd-4343', 'bb112233-4455'],
      coopIds: ['aaabb333-cccdd-4343', 'bb112233-4455'],
      conseillerNumeriquePermanenceIds: ['abcdef123'],
    })
  })
})
