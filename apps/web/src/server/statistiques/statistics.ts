export const sum = (a: number, b: number) => a + b

export const proportionOf = (value: number, total: number) =>
  total === 0 ? 0 : Math.round((value * 100) / total)
