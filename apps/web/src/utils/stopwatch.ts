export const createStopwatch = () => {
  const start = Date.now()

  return {
    stop: () => {
      const end = Date.now()
      const duration = end - start

      return {
        duration,
        start,
        end,
      }
    },
  }
}
