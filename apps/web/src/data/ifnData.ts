export const formatIfnScore = (score: number | null): string => {
  if (score === null) {
    return ''
  }
  const fixed = Number.parseFloat(score.toFixed(1))
  return `${Number.isInteger(fixed) ? fixed.toString() : fixed.toFixed(1)}/10`
}
