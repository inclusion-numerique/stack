import { createSession, createUser, deleteSession, deleteUser } from '@app/e2e/tasks/handlers/user.tasks'
import { deleteAllData } from '@app/e2e/tasks/handlers/deleteAllData'
import { resetFixtures } from '@app/e2e/tasks/handlers/resetFixtures'

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
}

export type Tasks = typeof tasks

export type TaskName = keyof Tasks

export type TaskInput<Name extends TaskName> = Parameters<Tasks[Name]>[0]
