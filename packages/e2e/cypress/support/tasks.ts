import {
  createBase,
  createCollection,
  createSession,
  createUser,
  deleteSession,
  deleteUser,
  inviteUserToBase,
  inviteUserToResource,
} from '@app/e2e/e2e/authentication/user.tasks'
import { deleteAllData } from '@app/e2e/e2e/deleteAllData'
import { sendResourceCommands } from '@app/e2e/e2e/resources.tasks'
import { getResourceReports } from '@app/e2e/support/resourceReports/resourceReports.tasks'

/**
 * Export of custom tasks that can be run with cy.execute() type safe custom command
 */
export const tasks = {
  createUser,
  createCollection,
  createBase,
  sendResourceCommands,
  deleteUser,
  createSession,
  deleteSession,
  deleteAllData,
  inviteUserToBase,
  inviteUserToResource,
  getResourceReports,
}

export type Tasks = typeof tasks
