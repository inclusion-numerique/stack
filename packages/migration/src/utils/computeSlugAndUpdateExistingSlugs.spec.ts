import { computeSlugAndUpdateExistingSlugs } from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'
import * as createSlugModule from '@app/web/utils/createSlug'

describe('computeSlugAndUpdateExistingSlugs', () => {
  const createSlugSpy = jest.spyOn(createSlugModule, 'createSlug')

  beforeEach(() => {
    createSlugSpy.mockReset()
    createSlugSpy.mockReturnValue('test')
  })

  it('should return the slug if it is not already used', () => {
    const existingSlugs = new Set<string>('this')
    const result = computeSlugAndUpdateExistingSlugs(
      { title: 'Title', id: 1n, created: new Date() },
      existingSlugs,
    )
    expect(result).toEqual('test')
    expect(createSlugSpy).toHaveBeenCalledOnceWith('Title')
  })

  it('should return the slug with legacyId if it is already used', () => {
    const existingSlugs = new Set<string>(['this', 'test'])
    const result = computeSlugAndUpdateExistingSlugs(
      { title: 'Title', id: 1n, created: new Date() },
      existingSlugs,
    )
    expect(result).toEqual('test-1')
    expect(createSlugSpy).toHaveBeenCalledOnceWith('Title')
  })

  it('should return the slug with timestamp if it is already used', () => {
    const existingSlugs = new Set<string>(['this', 'test', 'test-1'])
    const created = new Date('2022-12-31T23:59:22.420Z')
    const result = computeSlugAndUpdateExistingSlugs(
      { title: 'Title', id: 1n, created },
      existingSlugs,
    )
    expect(result).toEqual('test-235922420')
    expect(createSlugSpy).toHaveBeenCalledOnceWith('Title')
  })
})
