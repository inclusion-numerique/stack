import {
  addMonths,
  differenceInMonths,
  format,
  isBefore,
  isValid,
} from 'date-fns'
import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'

const formatDate = (date?: string | number | Date | null) =>
  date && isValid(date) ? format(date, 'dd/MM/yyyy') : null

const typeWithDuration = ({
  typeDeContrat,
  dateDebutDeContrat,
  dateFinDeContrat,
}: {
  typeDeContrat: string
  dateDebutDeContrat: Date | null
  dateFinDeContrat?: Date | null
}): string =>
  !!dateDebutDeContrat &&
  isValid(dateDebutDeContrat) &&
  !!dateFinDeContrat &&
  isValid(dateFinDeContrat)
    ? `${typeDeContrat} - Durée ${differenceInMonths(dateFinDeContrat, dateDebutDeContrat)} mois`
    : typeDeContrat

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
      finDeContrat:
        miseEnRelationActive.dateFinDeContrat &&
        isBefore(
          miseEnRelationActive.dateFinDeContrat,
          addMonths(new Date(), 3),
        ),
    }
  })
