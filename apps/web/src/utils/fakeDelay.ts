export const fakeDelay = () =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise<void>((resolve) => setTimeout(() => resolve(), 3000))
