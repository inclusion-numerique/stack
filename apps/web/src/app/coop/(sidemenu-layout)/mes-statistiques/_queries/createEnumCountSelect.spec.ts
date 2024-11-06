import {
  createEnumArrayCountSelect,
  createEnumCountSelect,
  createIntArrayCountSelect,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/createEnumCountSelect'
import { Genre } from '@prisma/client'

describe('createEnumCountSelect', () => {
  it('should return a sum select with the enum values and default value handling', () => {
    expect(
      createEnumCountSelect({
        enumObj: Genre,
        column: 'table.genre',
        as: 'truc',
        defaultEnumValue: Genre.NonCommunique,
      }).sql,
    )
      .toEqual(`COALESCE(SUM((table.genre = 'masculin')::int), 0)::int AS truc_masculin_count,
COALESCE(SUM((table.genre = 'feminin')::int), 0)::int AS truc_feminin_count,
COALESCE(SUM((table.genre = 'non_communique' OR table.genre IS NULL)::int), 0)::int AS truc_non_communique_count`)
  })

  it('should return a sum select without a default value', () => {
    expect(
      createEnumCountSelect({
        enumObj: Genre,
        column: 'table.genre',
        as: 'truc',
      }).sql,
    )
      .toEqual(`COALESCE(SUM((table.genre = 'masculin')::int), 0)::int AS truc_masculin_count,
COALESCE(SUM((table.genre = 'feminin')::int), 0)::int AS truc_feminin_count,
COALESCE(SUM((table.genre = 'non_communique')::int), 0)::int AS truc_non_communique_count`)
  })
})

describe('createEnumArrayCountSelect', () => {
  it('should return a sum select for enum array values', () => {
    expect(
      createEnumArrayCountSelect({
        enumObj: Genre,
        column: 'table.genre_array',
        as: 'truc',
      }).sql,
    )
      .toEqual(`COALESCE(SUM(('masculin' = ANY(table.genre_array))::int), 0)::int AS truc_masculin_count,
COALESCE(SUM(('feminin' = ANY(table.genre_array))::int), 0)::int AS truc_feminin_count,
COALESCE(SUM(('non_communique' = ANY(table.genre_array))::int), 0)::int AS truc_non_communique_count`)
  })
})

describe('createIntArrayCountSelect', () => {
  it('should return a sum select for integer array values', () => {
    expect(
      createIntArrayCountSelect({
        column: 'table.int_column',
        as: 'truc',
        values: [1, 2, 3],
      }).sql,
    )
      .toEqual(`COALESCE(SUM((table.int_column = 1)::int), 0)::int AS truc_1_count,
COALESCE(SUM((table.int_column = 2)::int), 0)::int AS truc_2_count,
COALESCE(SUM((table.int_column = 3)::int), 0)::int AS truc_3_count`)
  })
})
