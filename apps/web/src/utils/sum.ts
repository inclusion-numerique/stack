export const sum = <K extends keyof T, T>(items: T[], key: K): number => {
  let result = 0
  for (const item of items) {
    const value = item[key]
    if (typeof value === 'number') {
      result += value
    }
  }
  return result
}
