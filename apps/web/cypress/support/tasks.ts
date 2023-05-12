import {
  createSession,
  createUser,
  deleteSession,
  deleteUser,
} from '../e2e/authentication/user.tasks'
import { deleteAllData } from '../e2e/deleteAllData'

/**
 * Export of custom tasks that can be run with cy.execute() type safe custom command
 */
export const tasks = {
  createUser,
  deleteUser,
  createSession,
  deleteSession,
  deleteAllData,
}

export type Tasks = typeof tasks
