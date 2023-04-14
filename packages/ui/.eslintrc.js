module.exports = {
  rules: {
    // We use props transfer in generic ui component
    'react/jsx-props-no-spreading': 'off',
  },
  overrides: [
    {
      files: ['*.cy.@(js|jsx|ts|tsx)'],
      plugins: ['cypress'],
      rules: {
        'jest/expect-expect': 'off',
      },
    },
  ],
}
