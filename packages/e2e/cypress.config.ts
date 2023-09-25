import { defineConfig } from 'cypress'
import 'tsconfig-paths/register'
import { cypressProjectId } from '@app/config/config'
import { tasks } from '@app/e2e/support/tasks'

export default defineConfig({
  projectId: cypressProjectId,

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  video: true,
  videoCompression: true,
  viewportWidth: 1024,
  viewportHeight: 768,
  e2e: {
    setupNodeEvents(on) {
      // implement node event listeners here
      on('task', tasks)
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
