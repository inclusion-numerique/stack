import { dsfrThemeCookie } from '@app/web/app/dsfrThemeCookie'
import { cookies } from 'next/headers'

export const getServerDsfrTheme = (): 'light' | 'dark' => {
  const cookieStore = cookies()
  return (cookieStore.get(dsfrThemeCookie)?.value || 'light') as
    | 'light'
    | 'dark'
}
