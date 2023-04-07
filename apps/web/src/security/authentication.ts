export const secureSessionCookie = '__Secure-next-auth.session-token'
export const sessionCookie = 'next-auth.session-token'

export const sessionTokenFromCookies = (
  cookies: Partial<{ [key: string]: string }>,
): string | null =>
  cookies[secureSessionCookie] ?? cookies[sessionCookie] ?? null
