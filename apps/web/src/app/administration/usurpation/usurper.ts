'use server'

import z from 'zod'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getSessionToken, getSessionUser } from '@app/web/auth/getSessionUser'
import { prismaClient } from '@app/web/prismaClient'
import {
  serverAction400,
  serverAction403,
} from '@app/web/app/serverActionHelpers'
import { formDataToObject } from '@app/web/utils/formDataToObject'

const UsurperFormData = z.object({
  id: z.string().uuid(),
})

export const usurper = async (formData: FormData) => {
  const sessionToken = getSessionToken()
  const initialUser = await getSessionUser()

  if (!sessionToken || initialUser?.role !== 'Admin') {
    return serverAction403()
  }

  const parsed = UsurperFormData.safeParse(formDataToObject(formData))

  if (!parsed.success) {
    return serverAction400(parsed.error)
  }

  const user = await prismaClient.user.findUnique({
    where: {
      id: parsed.data.id,
      isFixture: true,
    },
  })

  if (!user) {
    return {
      status: 400,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Invalid user for usurpation',
      }),
    }
  }

  await prismaClient.session.update({
    where: {
      sessionToken,
    },
    data: {
      userId: user.id,
      usurperId: initialUser.id,
    },
  })
  revalidatePath('/')
  redirect('/coop')

  return user
}
