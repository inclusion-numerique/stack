import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'

export const getActivitesResultCountLabel = ({
  isFiltered,
  searchResult: { matchesCount },
}: {
  isFiltered: boolean
  searchResult: { matchesCount: number }
}) =>
  matchesCount === 0
    ? isFiltered
      ? 'Aucune activité ne correspond à votre recherche'
      : 'Aucune activité enregistrée'
    : isFiltered
      ? `${matchesCount} activité${sPluriel(matchesCount)} correspond${matchesCount === 1 ? '' : 'ent'} à votre recherche`
      : `${matchesCount} activité${sPluriel(matchesCount)} enregistrée${sPluriel(matchesCount)}`
