export const appUrl = (path: string) =>
  `${Cypress.config().baseUrl}${encodeURI(path)}`
