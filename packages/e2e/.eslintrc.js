module.exports = {
  parserOptions: {
    // eslint-disable-next-line no-path-concat, unicorn/prefer-module
    project: `${__dirname}/../../tsconfig.eslint.cy.json`,
    plugins: ['cypress'],
    extends: ['plugin:cypress/recommended'],
    rules: {
      'jest/expect-expect': 'off',
      // Cypress syntax uses then() for chainable elements
      'promise/catch-or-return': 'off',
      'promise/always-return': 'off',
      // We need to pass undefined to some custom commands
      'unicorn/no-useless-undefined': 'off',
    },
  },
}
