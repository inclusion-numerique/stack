import * as createSlugModule from '@app/web/utils/createSlug'
import { computeSlugAndUpdateExistingSlugs } from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'

describe('computeSlugAndUpdateExistingSlugs', () => {
  const createSlugSpy = jest.spyOn(createSlugModule, 'createSlug')

  beforeEach(() => {
    createSlugSpy.mockReset()
    createSlugSpy.mockReturnValue('test')
  })

  it('should return the slug if it is not already used', () => {
    const existingSlugs = new Map<string, number>([['this', 1]])
    const result = computeSlugAndUpdateExistingSlugs(
      { title: 'Title', id: 1n },
      existingSlugs,
    )
    expect(result).toEqual('test')
    expect(createSlugSpy).toHaveBeenCalledExactlyOnceWith('Title')
  })

  it('should return the slug with legacyId if it is already used', () => {
    const existingSlugs = new Map<string, number | null>([
      ['this', 0],
      ['test', null],
    ])
    const result = computeSlugAndUpdateExistingSlugs(
      { title: 'Title', id: 1n },
      existingSlugs,
    )
    expect(result).toEqual('test-1')
    expect(createSlugSpy).toHaveBeenCalledExactlyOnceWith('Title')
  })

  it('should return the slug with timestamp if it is already used', () => {
    const existingSlugs = new Map<string, number | null>([
      ['this', 0],
      ['test', null],
      ['test-1', 2],
      ['test-2', null],
      ['test-3', 5],
      ['test-5', null],
    ])
    const result = computeSlugAndUpdateExistingSlugs(
      { title: 'Title', id: 1n },
      existingSlugs,
    )
    expect(result).toEqual('test-4')
    expect(createSlugSpy).toHaveBeenCalledExactlyOnceWith('Title')
  })

  it('should return the slug if it is used by the same item', () => {
    const existingSlugs = new Map<string, number | null>([
      ['this', 0],
      ['test', null],
      ['test-1', null],
      ['test-2', 2],
    ])
    const result = computeSlugAndUpdateExistingSlugs(
      { title: 'Title', id: 2n },
      existingSlugs,
    )
    expect(result).toEqual('test-2')
    expect(createSlugSpy).toHaveBeenCalledExactlyOnceWith('Title')
  })
})
