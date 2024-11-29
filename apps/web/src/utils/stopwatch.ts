export const createStopwatch = () => {
  const started = new Date()
  let lastCheck = started

  return {
    started,
    check: () => {
      const checked = new Date()
      const duration = checked.getTime() - lastCheck.getTime()
      lastCheck = checked
      return {
        duration,
        started,
        lastCheck,
        checked,
      }
    },
    stop: () => {
      const ended = new Date()
      const duration = ended.getTime() - started.getTime()

      return {
        duration,
        started,
        ended,
      }
    },
  }
}
