import { dureeAccompagnementPersonnaliseeValue } from '@app/web/cra/cra'
import type { CraDureeData } from '@app/web/cra/CraDureeValidation'

export const craDureeDataToMinutes = ({
  duree,
  dureePersonnaliseeHeures,
  dureePersonnaliseeMinutes,
}: CraDureeData): number => {
  if (duree !== 'personnaliser') {
    return Number.parseInt(duree, 10)
  }

  const hours =
    typeof dureePersonnaliseeHeures === 'number' &&
    !Number.isNaN(dureePersonnaliseeHeures)
      ? dureePersonnaliseeHeures
      : 0

  const minutes =
    typeof dureePersonnaliseeMinutes === 'number' &&
    !Number.isNaN(dureePersonnaliseeMinutes)
      ? dureePersonnaliseeMinutes
      : 0

  return hours * 60 + minutes
}

export const minutesToCraDureeData = (
  minutes: number | undefined | null,
): CraDureeData | null => {
  if (minutes === undefined || minutes === null) {
    return null
  }

  // eslint-disable-next-line no-param-reassign
  minutes = Math.abs(minutes)

  const minutesString = minutes.toString()

  if (minutesString === '0') {
    return {
      duree: dureeAccompagnementPersonnaliseeValue,
      dureePersonnaliseeHeures: undefined,
      dureePersonnaliseeMinutes: undefined,
    }
  }

  return {
    duree: minutesString,
    dureePersonnaliseeHeures: undefined,
    dureePersonnaliseeMinutes: undefined,
  }
}
