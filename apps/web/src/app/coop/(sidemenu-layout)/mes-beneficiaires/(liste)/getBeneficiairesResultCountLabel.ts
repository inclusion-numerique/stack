import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'

export const getBeneficiairesResultCountLabel = ({
  isFiltered,
  searchResult: { matchesCount },
}: {
  isFiltered: boolean
  searchResult: { matchesCount: number }
}) =>
  matchesCount === 0
    ? isFiltered
      ? 'Aucun bénéficiaire ne correspond à votre recherche'
      : 'Aucun bénéficiaire enregistré'
    : isFiltered
      ? `${matchesCount} bénéficiaire${sPluriel(matchesCount)} correspond${matchesCount === 1 ? '' : 'ent'} à votre recherche`
      : `${matchesCount} bénéficiaire${sPluriel(matchesCount)} enregistré${sPluriel(matchesCount)}`
