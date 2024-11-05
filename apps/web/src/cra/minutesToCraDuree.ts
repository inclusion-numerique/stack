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
    return (dureePersonnalisee || 0) * 60
  }

  return dureePersonnalisee || 0
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

  if (
    minutesString in dureeAccompagnementParDefautLabels &&
    minutesString !== dureeAccompagnementPersonnaliseeValue
  ) {
    return {
      duree: minutesString as DefaultDureeAccompagnementParDefaut,
      dureePersonnalisee: undefined,
      dureePersonnaliseeType: 'minutes',
    }
  }

  if (minutesString === '0') {
    return {
      duree: dureeAccompagnementPersonnaliseeValue,
      dureePersonnalisee: 0,
      dureePersonnaliseeType: 'minutes',
    }
  }

  const hours = Math.floor(minutes / 60)
  const minutesLeft = minutes % 60

  if (minutesLeft === 0) {
    return {
      duree: dureeAccompagnementPersonnaliseeValue,
      dureePersonnalisee: hours,
      dureePersonnaliseeType: 'heures' as const,
    }
  }

  return {
    duree: dureeAccompagnementPersonnaliseeValue,
    dureePersonnalisee: hours * 60 + minutesLeft,
    dureePersonnaliseeType: 'minutes' as const,
  }
}
