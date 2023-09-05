import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CollectivitySearchValidation } from '@app/web/server/rpc/data/CollectivitySearch'

const tsquerySpecialChars = /[!&()*:|]/g

const getSearchFromQueryString = (query: string) =>
  query.replaceAll(tsquerySpecialChars, ' ').trim().split(/\s+/).join(' & ')

export const dataRouter = router({
  collectivitySearch: protectedProcedure
    .input(CollectivitySearchValidation)
    .query(async ({ input: { commune, exclude, query, epci, limit } }) => {
      const search = getSearchFromQueryString(query)
      const communeResult = commune
        ? await prismaClient.commune.findMany({
            where: {
              code: {
                notIn: exclude,
              },
              OR: [
                {
                  nom: {
                    search,
                    mode: 'insensitive',
                  },
                },
                {
                  nom: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
                {
                  codesPostaux: {
                    some: {
                      codePostal: {
                        code: {
                          in: query.trim().split(/\s+/),
                        },
                      },
                    },
                  },
                },
              ],
            },
            orderBy: {
              _relevance: {
                fields: ['nom'],
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
              OR: [
                {
                  nom: {
                    search,
                    mode: 'insensitive',
                  },
                },
                {
                  nom: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
              ],
            },
            orderBy: {
              _relevance: {
                fields: ['nom'],
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
