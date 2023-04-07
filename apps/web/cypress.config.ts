import { defineConfig } from 'cypress'
import { cypressProjectId } from '../../packages/config/src/config'

export default defineConfig({
  projectId: cypressProjectId,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
