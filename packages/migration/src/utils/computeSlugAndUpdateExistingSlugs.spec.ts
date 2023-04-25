import { computeSlugAndUpdateExistingSlugs } from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'
import * as createSlugModule from '@app/web/utils/createSlug'

describe('computeSlugAndUpdateExistingSlugs', () => {
  const createSlugSpy = jest.spyOn(createSlugModule, 'createSlug')

  beforeEach(() => {
    createSlugSpy.mockReset()
    createSlugSpy.mockReturnValue('test')
  })

  it('should return the slug if it is not already used', () => {
    const existingSlugs = new Map<string, number>([['this', 1]])
    const result = computeSlugAndUpdateExistingSlugs(
      { title: 'Title', id: 1n, created: new Date() },
      existingSlugs,
    )
    expect(result).toEqual('test')
    expect(createSlugSpy).toHaveBeenCalledOnceWith('Title')
  })

  it('should return the slug with legacyId if it is already used', () => {
    const existingSlugs = new Map<string, number | null>([
      ['this', 0],
      ['test', null],
    ])
    const result = computeSlugAndUpdateExistingSlugs(
      { title: 'Title', id: 1n, created: new Date() },
      existingSlugs,
    )
    expect(result).toEqual('test-1')
    expect(createSlugSpy).toHaveBeenCalledOnceWith('Title')
  })

  it('should return the slug with timestamp if it is already used', () => {
    const existingSlugs = new Map<string, number | null>([
      ['this', 0],
      ['test', null],
      ['test-1', 2],
    ])
    const created = new Date('2022-12-31T23:59:22.420Z')
    const result = computeSlugAndUpdateExistingSlugs(
      { title: 'Title', id: 1n, created },
      existingSlugs,
    )
    expect(result).toEqual('test-235922420')
    expect(createSlugSpy).toHaveBeenCalledOnceWith('Title')
  })

  it('should return the slug if it is used by the same item', () => {
    const existingSlugs = new Map<string, number | null>([
      ['this', 0],
      ['test', null],
      ['test-2', 2],
    ])
    const created = new Date('2022-12-31T23:59:22.420Z')
    const result = computeSlugAndUpdateExistingSlugs(
      { title: 'Title', id: 2n, created },
      existingSlugs,
    )
    expect(result).toEqual('test-2')
    expect(createSlugSpy).toHaveBeenCalledOnceWith('Title')
  })
})
