export const runPromisesSequentially = async <T>(
  promises: Iterable<T | PromiseLike<T>>,
): Promise<Awaited<T>[]> => {
  const result: Awaited<T>[] = []

  for (const promise of promises) {
    // eslint-disable-next-line no-await-in-loop
    result.push(await promise)
  }

  return result
}
