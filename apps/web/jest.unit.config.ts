import { packageJestConfig } from '../../packages/test/src/packageJestConfig'

export default packageJestConfig({
  transformIgnorePackages: [],
  testPathIgnorePatterns: ['<rootDir>/.next/', '.api.spec.ts$'],
})
