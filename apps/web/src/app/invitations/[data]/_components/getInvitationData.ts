import { prismaClient } from '@app/web/prismaClient'
import { Invitation } from '@app/web/equipe/InvitationValidation'

export const getInvitationData = (invitation: Invitation) =>
  prismaClient.invitationEquipe.findFirst({
    where: {
      ...invitation,
      acceptee: null,
      refusee: null,
    },
    select: {
      coordinateur: {
        select: {
          user: {
            select: {
              name: true,
              email: true,
              phone: true,
            },
          },
          _count: {
            select: {
              mediateursCoordonnes: {
                where: {
                  suppression: null,
                },
              },
            },
          },
        },
      },
    },
  })
