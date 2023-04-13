// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // __dirname is fine for now
    'unicorn/prefer-module': 'off',
    // Common abbreviations are fine (e.g. react ref)
    'unicorn/prevent-abbreviations': 'off',
  },
  overrides: [
    {
      files: ['*.mdx', '*.stories.@(js|jsx|ts|tsx)'],
      rules: {
        '@typescript-eslint/await-thenable': 'off',
      },
    },
  ],
}
