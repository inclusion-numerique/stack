import { Sorting } from '@app/web/server/search/searchQueryParams'

const toThematicsQuery = (thematics: string[] = []) =>
  thematics.map((thematic: string) => `thematiques=${thematic}`)

const toPageQueryIfAny = (page?: number) => (page ? [`page=${page}`] : [])

const toSortQueryIfAny = (sort?: Sorting) => (sort ? [`tri=${sort}`] : [])

export const createThematicLink =
  (href: string, thematics: string[]) => (page?: number, sort?: Sorting) =>
    `${href}?${[...toThematicsQuery(thematics), ...toPageQueryIfAny(page), ...toSortQueryIfAny(sort)].join('&')}`
