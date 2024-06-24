const toThematicsQuery = (thematics: string[] = []) =>
  thematics.map((thematic: string) => `thematiques=${thematic}`)

const toPageQueryIfAny = (page?: number) => (page ? [`page=${page}`] : [])

export const createThematicLink =
  (href: string, thematics: string[]) => (page?: number) =>
    `${href}?${[...toThematicsQuery(thematics), ...toPageQueryIfAny(page)].join('&')}`
