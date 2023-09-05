import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CollectivitySearchValidation } from '@app/web/server/rpc/data/CollectivitySearch'
import { transformStringToSearchableString } from '@app/web/search/transformStringToSearchableString'

const tsquerySpecialChars = /[!&()*:|]/g

const getSearchQueryWords = (query: string) =>
  query
    .replaceAll(tsquerySpecialChars, ' ')
    .trim()
    .split(/\s+/)
    .map(transformStringToSearchableString)

const getSearchFromQueryString = (query: string) =>
  getSearchQueryWords(query).map(transformStringToSearchableString).join(' & ')

export const dataRouter = router({
  collectivitySearch: protectedProcedure
    .input(CollectivitySearchValidation)
    .query(async ({ input: { commune, exclude, query, epci, limit } }) => {
      const search = getSearchFromQueryString(query)
      const searchableCondition = getSearchQueryWords(query).map(
        (contains) => ({ searchable: { contains } }),
      )

      const communeResult = commune
        ? await prismaClient.commune.findMany({
            where: {
              code: {
                notIn: exclude,
              },
              AND: searchableCondition,
            },
            orderBy: {
              _relevance: {
                fields: ['searchable'],
                search,
                sort: 'desc',
              },
            },
            take: limit,
            select: {
              code: true,
              nom: true,
              codesPostaux: {
                select: {
                  codePostal: {
                    select: {
                      code: true,
                    },
                  },
                },
              },
            },
          })
        : []

      const epciResult = epci
        ? await prismaClient.epci.findMany({
            where: {
              code: {
                notIn: exclude,
              },
              AND: searchableCondition,
            },
            orderBy: {
              _relevance: {
                fields: ['searchable'],
                search,
                sort: 'desc',
              },
            },
            take: limit,
            select: {
              code: true,
              nom: true,
            },
          })
        : []

      return [
        ...epciResult.map((epciItem) => ({ type: 'epci', ...epciItem })),
        ...communeResult.map((communeItem) => ({
          type: 'commune',
          code: communeItem.code,
          nom: `${communeItem.nom} (${communeItem.codesPostaux
            .map(({ codePostal: { code } }) => code)
            .join(', ')})`,
        })),
      ]
    }),
})
