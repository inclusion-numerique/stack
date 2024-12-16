import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { prismaClient } from '@app/web/prismaClient'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'

export const generateMetadata = async (): Promise<Metadata> => {
  const user = await getAuthenticatedSessionUser()
  const chatSession = await prismaClient.assistantChatSession.create({
    data: {
      createdById: user?.id,
      context: '',
    },
  })

  redirect(`/administration/chat/${chatSession.id}`)
}

export default () => null
