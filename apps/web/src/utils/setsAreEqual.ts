export const setsAreEqual = <T>(a: Set<T>, b: Set<T>) =>
  a.size === b.size && [...a].every((x) => b.has(x))
