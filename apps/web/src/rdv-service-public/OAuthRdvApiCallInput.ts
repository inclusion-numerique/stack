import { z } from 'zod'

export const OauthRdvApiListAppsInputValidation = z.object({
  endpoint: z.literal('/authorized_applications'),
  data: z.undefined(),
})

export const OAuthRdvApiCallInputValidation = z.discriminatedUnion('endpoint', [
  OauthRdvApiListAppsInputValidation,
])

export type OAuthRdvApiCallInput = z.infer<
  typeof OAuthRdvApiCallInputValidation
>
