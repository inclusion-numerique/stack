import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { UserSignupValidation } from '@app/web/server/rpc/user/userSignup'

export const ServerUserSignupValidation = UserSignupValidation.extend({
  email: z
    .string({ required_error: 'Veuillez renseigner votre email' })
    .trim()
    .toLowerCase()
    .email('Merci de renseigner un email valide')
    .refine(async (email) => {
      const existing = await prismaClient.user.findUnique({
        where: { email },
        select: { id: true },
      })
      return !existing
    }, 'Un compte existe déjà avec cet email'),
})
