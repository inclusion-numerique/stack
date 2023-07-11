import { defineConfig } from 'cypress'
import 'tsconfig-paths/register'
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin'
import { cypressProjectId } from '../../packages/config/src/config'
import { tasks } from './cypress/support/tasks'

export default defineConfig({
  projectId: cypressProjectId,

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  viewportWidth: 1024,
  viewportHeight: 768,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', tasks)
      getCompareSnapshotsPlugin(on, config)
    },
    env: {
      MON_COMPTE_PRO_TEST_USER_EMAIL:
        process.env.MON_COMPTE_PRO_TEST_USER_EMAIL,
      MON_COMPTE_PRO_TEST_USER_PASSWORD:
        process.env.MON_COMPTE_PRO_TEST_USER_PASSWORD,
    },
    baseUrl:
      process.env.CYPRESS_BASE_URL ??
      `http://localhost:${process.env.PORT ?? 3000}`,
    chromeWebSecurity: false,
  },
})
