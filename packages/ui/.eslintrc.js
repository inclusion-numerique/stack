module.exports = {
  plugins: ['cypress'],
  rules: {
    // We use props transfer in generic ui component
    'react/jsx-props-no-spreading': 'off',
  },
  overrides: [
    {
      files: ['*.cy.@(js|jsx|ts|tsx)'],
      rules: {
        'jest/expect-expect': 'off',
      },
    },
  ],
}
