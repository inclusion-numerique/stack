import { telechargerContacts } from '@app/web/app/(private)/gouvernances/telechargerContacts'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const GET = () =>
  // TODO Factorize scope check with gouvernance pages
  // TODO get query params and get user from session
  telechargerContacts({
    codeDepartement: '69',
  })
