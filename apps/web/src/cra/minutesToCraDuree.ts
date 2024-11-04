import {
  DefaultDureeAccompagnementParDefaut,
  dureeAccompagnementParDefautLabels,
  dureeAccompagnementPersonnaliseeValue,
} from '@app/web/cra/cra'
import type { CraDureeData } from '@app/web/cra/CraDureeValidation'

export const craDureeDataToMinutes = ({
  duree,
  dureePersonnalisee,
  dureePersonnaliseeType,
}: CraDureeData): number => {
  if (duree !== 'personnaliser') {
    return Number.parseInt(duree, 10)
  }

  if (dureePersonnaliseeType === 'heures') {
    return Number.parseInt(dureePersonnalisee ?? '0', 10) * 60
  }

  return Number.parseInt(dureePersonnalisee ?? '0', 10)
}

export const minutesToCraDureeData = (
  minutes: number | undefined | null,
): CraDureeData | null => {
  if (minutes === undefined || minutes === null) {
    return null
  }

  const isNegative = minutes < 0
  // eslint-disable-next-line no-param-reassign
  minutes = Math.abs(minutes)

  const minutesString = minutes.toString()

  if (
    !isNegative &&
    minutesString in dureeAccompagnementParDefautLabels &&
    minutesString !== dureeAccompagnementPersonnaliseeValue
  ) {
    return {
      duree: minutesString as DefaultDureeAccompagnementParDefaut,
      dureePersonnalisee: undefined,
      dureePersonnaliseeType: undefined,
    }
  }

  if (minutesString === '0') {
    return {
      duree: dureeAccompagnementPersonnaliseeValue,
      dureePersonnalisee: '0',
      dureePersonnaliseeType: 'minutes' as const,
    }
  }

  const hours = Math.floor(minutes / 60)
  const minutesLeft = minutes % 60

  if (minutesLeft === 0) {
    return {
      duree: dureeAccompagnementPersonnaliseeValue,
      dureePersonnalisee: `${isNegative ? '-' : ''}${hours.toString()}`,
      dureePersonnaliseeType: 'heures' as const,
    }
  }

  return {
    duree: dureeAccompagnementPersonnaliseeValue,
    dureePersonnalisee: `${isNegative ? '-' : ''}${(hours * 60 + minutesLeft).toString()}`,
    dureePersonnaliseeType: 'minutes' as const,
  }
}
