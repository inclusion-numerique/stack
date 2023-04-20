import * as dotenv from 'dotenv'
import { resolve } from 'node:path'
import { createNodeModulesTransformIgnorePattern } from './transformIgnore'

// import meta does not work in jest env
// eslint-disable-next-line unicorn/prefer-module
const dotenvFile = resolve(__dirname, '../../../.env')

export const testDotenvConfig = () => {
  dotenv.config({ path: dotenvFile })
}

/**
 * Swc jest is not compatible with spy and jest mock. For mocking add the modules in mockableFilePatterns.
 * This will at some point be addressed by @swc/jest and we will remove this compatibility layer.
 */
export const packageJestConfig = ({
  transformIgnorePackages = [],
  testPathIgnorePatterns = [],
  mockableFilePatterns = [],
  testMatch,
}: {
  transformIgnorePackages?: string[]
  testPathIgnorePatterns?: string[]
  mockableFilePatterns?: string[]
  testMatch?: string[]
}) => {
  testDotenvConfig()

  // Swc jest is not compatible with spy and jest mock. For mocking add the modules here.
  // See https://github.com/swc-project/swc/issues/5059
  // '^.+packages/foo/src/common/cache\\.ts$': 'ts-jest',
  const tsJestTransformPattern = mockableFilePatterns.join('|')

  const transform = tsJestTransformPattern
    ? {
        [tsJestTransformPattern]: 'ts-jest',
        '^.+\\.(t|j)sx?$': '@swc/jest',
      }
    : {
        '^.+\\.(t|j)sx?$': '@swc/jest',
      }

  return {
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    transform,
    transformIgnorePatterns: [
      createNodeModulesTransformIgnorePattern(transformIgnorePackages),
    ],
    setupFilesAfterEnv: ['<rootDir>/../../packages/test/src/jest.setup.ts'],
    testMatch: testMatch ?? [
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.integration.ts',
      '**/*.integration.tsx',
    ],
    moduleNameMapper: {
      '^@app/web/(.*)$': '<rootDir>/../../apps/web/src/$1',
      '^@app/cli/(.*)$': '<rootDir>/../../apps/cli/src/$1',
      '^@app/cdk/(.*)$': '<rootDir>/../../packages/cdk/src/$1',
      '^@app/config/(.*)$': '<rootDir>/../../packages/config/src/$1',
      '^@app/ui/(.*)$': '<rootDir>/../../packages/ui/src/$1',
      '^@app/emails/(.*)$': '<rootDir>/../../packages/emails/src/$1',
      '^@app/lint/(.*)$': '<rootDir>/../../packages/lint/src/$1',
      '^@app/storybook/(.*)$': '<rootDir>/../../packages/storybook/src/$1',
      '^@app/test/(.*)$': '<rootDir>/../../packages/test/src/$1',
    },
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      ...testPathIgnorePatterns,
    ],
    testEnvironment: 'node',
  }
}
