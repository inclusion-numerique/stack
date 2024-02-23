import { createTransport } from 'nodemailer'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

export const emailTransport = createTransport(ServerWebAppConfig.Email.server)
