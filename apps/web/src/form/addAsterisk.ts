export const addAsterisk = (value: string, add = true): string =>
  // eslint-disable-next-line no-irregular-whitespace
  add ? `${value} *` : value
