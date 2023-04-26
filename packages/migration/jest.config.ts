import { packageJestConfig } from '../../packages/test/src/packageJestConfig'

export default packageJestConfig({
  mockableFilePatterns: ['utils/createSlug.ts$'],
})
