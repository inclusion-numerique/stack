import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { ClientApiValidation } from '@app/web/app/administration/clients-api/ClientApiValidation'
import { enforceIsAdmin } from '@app/web/server/rpc/enforceIsAdmin'
import { createApiClient } from '@app/web/api-client/apiClient'
import { invalidError } from '@app/web/server/rpc/trpcErrors'
import { hashSecret } from '@app/web/security/hashSecret'

export const apiClientRouter = router({
  create: protectedProcedure
    .input(ClientApiValidation)
    .mutation(
      async ({
        input: { validUntil, name, scopes, validFrom },
        ctx: { user },
      }) => {
        enforceIsAdmin(user)

        const client = await createApiClient({
          validFrom: new Date(validFrom),
          scopes,
          name,
          validUntil: validUntil ? new Date(validUntil) : undefined,
        })

        return client
      },
    ),
  update: protectedProcedure
    .input(
      ClientApiValidation.extend({
        id: z
          .string({
            required_error: 'Veuillez renseigner un id',
          })
          .uuid(),
      }),
    )
    .mutation(async ({ input, ctx: { user } }) => {
      enforceIsAdmin(user)

      const client = await prismaClient.apiClient.update({
        where: { id: input.id },
        data: {
          name: input.name,
          validFrom: new Date(input.validFrom),
          validUntil: input.validUntil ? new Date(input.validUntil) : null,
          scopes: input.scopes,
        },
      })

      return client
    }),
  generateUniqueClientSecret: protectedProcedure
    .input(z.object({ clientId: z.string().uuid() }))
    .mutation(async ({ input: { clientId }, ctx: { user } }) => {
      enforceIsAdmin(user)

      const client = await prismaClient.apiClient.findUnique({
        where: { id: clientId },
      })

      if (!client) {
        throw invalidError('Client not found')
      }

      const secret = hashSecret(client.secret)

      return { secret }
    }),
})
