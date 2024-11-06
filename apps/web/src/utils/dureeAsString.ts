/**
 * The format is e.g "30 min" or "1 h 30"
 */
export const dureeAsString = (duree: number): string => {
  const hours = Math.floor(duree / 60)
  const minutes = Math.round(duree % 60)

  if (hours === 0) {
    return `${minutes} min`
  }

  if (minutes === 0) {
    return `${hours} h`
  }

  return `${hours} h ${minutes}`
}
