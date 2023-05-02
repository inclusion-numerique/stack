import {
  createSession,
  createUser,
  deleteUser,
} from '../e2e/authentication/user.tasks'

/**
 * Export of custom tasks that can be run with cy.execute() type safe custom command
 */
export const tasks = {
  createUser,
  deleteUser,
  createSession,
}

export type Tasks = typeof tasks
