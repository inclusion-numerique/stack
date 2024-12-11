/**
 * This represent a custom Domain error if a user is trying to be authenticated
 * without having a valid session
 */
export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}
