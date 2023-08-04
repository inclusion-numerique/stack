import {
  createSession,
  createUser,
  deleteSession,
  deleteUser,
  updateUser,
} from '../e2e/authentication/user.tasks'
import { deleteAllData } from '../e2e/deleteAllData'

/**
 * Export of custom tasks that can be run with cy.execute() type safe custom command
 */
export const tasks = {
  createUser,
  updateUser,
  deleteUser,
  createSession,
  deleteSession,
  deleteAllData,
}

export type Tasks = typeof tasks
