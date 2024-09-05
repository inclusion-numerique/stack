import { createEnumCountSelect } from '@app/web/app/coop/mes-statistiques/_queries/createEnumCountSelect'
import { Genre } from '@prisma/client'

describe('createEnumCountSelect', () => {
  it('should return a sum select with the enum values', () => {
    expect(
      createEnumCountSelect({
        enumObj: Genre,
        column: 'table.genre',
        as: 'truc',
        defaultEnumValue: Genre.NonCommunique,
      }).sql,
    ).toEqual(`SUM((table.genre = 'masculin')::int)::int AS truc_masculin_count,
SUM((table.genre = 'feminin')::int)::int AS truc_feminin_count,
SUM((table.genre = 'non_communique' OR table.genre IS NULL)::int)::int AS truc_non_communique_count`)
  })
})
