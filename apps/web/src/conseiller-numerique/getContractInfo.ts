import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import {
  addMonths,
  differenceInMonths,
  format,
  isBefore,
  isValid,
} from 'date-fns'

const formatDate = (date?: string | number | Date | null) =>
  date && isValid(date) ? format(date, 'dd/MM/yyyy') : null

export enum AlerteFinContrat {
  prochainement = 'prochainement',
  termine = 'termine',
}

const typeWithDuration = ({
  typeDeContrat,
  dateDebutDeContrat,
  dateFinDeContrat,
}: {
  // Some of those data are actually missing from v1 data and were causing a crash
  // that's why we add null and undefined in this type
  typeDeContrat?: string | null
  dateDebutDeContrat?: Date | null
  dateFinDeContrat?: Date | null
}): string =>
  !!dateDebutDeContrat &&
  isValid(dateDebutDeContrat) &&
  !!dateFinDeContrat &&
  isValid(dateFinDeContrat)
    ? `${typeDeContrat} - Durée ${differenceInMonths(dateFinDeContrat, dateDebutDeContrat)} mois`
    : (typeDeContrat ?? '')

const alerteFinDeContrat = (miseEnRelationActive: {
  dateFinDeContrat: Date | null
}) => {
  if (miseEnRelationActive.dateFinDeContrat == null) {
    return null
  }
  if (isBefore(miseEnRelationActive.dateFinDeContrat, new Date())) {
    return AlerteFinContrat.termine
  }
  if (
    isBefore(miseEnRelationActive.dateFinDeContrat, addMonths(new Date(), 3))
  ) {
    return AlerteFinContrat.prochainement
  }

  return null
}

export const getContractInfo = async (email: string) =>
  fetchConseillerNumeriqueV1Data({ email }).then((conseiller) => {
    const miseEnRelationActive = conseiller?.miseEnRelationActive
    if (!miseEnRelationActive) {
      return null
    }

    return {
      type: typeWithDuration(miseEnRelationActive).replaceAll('_', ' '),
      start: formatDate(miseEnRelationActive.dateDebutDeContrat),
      end: formatDate(miseEnRelationActive.dateFinDeContrat),
      finDeContrat: alerteFinDeContrat(miseEnRelationActive),
    }
  })
