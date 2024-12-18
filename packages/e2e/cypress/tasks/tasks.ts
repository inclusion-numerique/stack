import {
  createSession,
  createUser,
  deleteSession,
  deleteUser,
} from '@app/e2e/tasks/handlers/user.tasks'
import { deleteAllData } from '@app/e2e/tasks/handlers/deleteAllData'
import { resetFixtures } from '@app/e2e/tasks/handlers/resetFixtures'
import { createInvitation } from '@app/e2e/tasks/handlers/createInvitation'

/**
 * Export of custom tasks that can be run with cy.execute() type safe custom command
 */
export const tasks = {
  createUser,
  deleteUser,
  createSession,
  deleteSession,
  deleteAllData,
  resetFixtures,
  createInvitation,
}

export type Tasks = typeof tasks

export type TaskName = keyof Tasks

export type TaskInput<Name extends TaskName> = Parameters<Tasks[Name]>[0]
