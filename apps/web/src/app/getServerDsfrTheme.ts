import { dsfrThemeCookie } from '@app/web/app/dsfrThemeCookie'
import { cookies } from 'next/headers'

export const getServerDsfrTheme = async (): Promise<'light' | 'dark'> => {
  const cookieStore = await cookies()
  return (cookieStore.get(dsfrThemeCookie)?.value || 'light') as
    | 'light'
    | 'dark'
}
