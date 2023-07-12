/* eslint @typescript-eslint/no-unsafe-assignment: 0 */

import { GraphQLClient } from 'graphql-request'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

import {
  GetDepartementQuery,
  GetDepartementQueryVariables,
} from '@app/web/graphql/generated'
import getDepartementData from '../graphql/getDepartementData.graphql'

const endpoint = 'https://fiches.incubateur.anct.gouv.fr/indicateurs/graphql'

/**
 * We query the GraphQL API for Données et Territoires Data
 *
 * To add or edit a new query :
 *   - add/edit a .graphql file in the graphql folder (src/graphql)
 *   - run `pnpm -F web graphql:codegen` to generate/update the types in src/graphql/generated
 *   - export the query from this file with generated typings (take one of the existing queries as an example)
 */

export const getDepartementDataQuery: TypedDocumentNode<
  GetDepartementQuery,
  GetDepartementQueryVariables
> = getDepartementData

let client: GraphQLClient

export const queryDonneesEtTerritoires = <
  Result,
  Variables extends Record<string, unknown> | undefined = undefined,
>(
  query: TypedDocumentNode<Result, Variables>,
  params: Variables,
): Promise<Result> => {
  if (!client) {
    client = new GraphQLClient(endpoint)
  }

  return client.request(query, params)
}
