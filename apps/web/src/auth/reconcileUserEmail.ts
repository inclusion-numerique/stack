/**
 * For handling external systems that changed or invalidate user emails,
 * we need a way to reconcile the user email with the one in the system.
 * For this we keep a mapping of new email -> old email in the database.
 * And do not re-create the user in the system if the old email is found.
 * Instead, we update the user email in the system.
 */
import { prismaClient } from '@app/web/prismaClient'

export const getUserEmailReconciliation = async (email: string) => {
  const emailReconcilation =
    await prismaClient.userEmailReconciliation.findUnique({
      where: { expectedNewEmail: email.toLowerCase() },
    })

  if (!emailReconcilation) {
    return null
  }
  const existingUser = await prismaClient.user.findUnique({
    where: { email: emailReconcilation.oldEmail },
  })
  if (!existingUser) {
    return null
  }

  return {
    emailReconcilation,
    existingUser,
  }
}
