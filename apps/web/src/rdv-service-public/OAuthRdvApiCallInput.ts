import { z } from 'zod'

export const OauthRdvApiMeInputValidation = z.object({
  endpoint: z.literal('/agents/me'),
  data: z.undefined(),
})
export type OauthRdvApiMeInput = z.infer<typeof OauthRdvApiMeInputValidation>
export type OauthRdvApiMeResponse = {
  agent: {
    id: number
    email: string
    first_name: string
    last_name: string
    inclusion_connect_open_id_sub: string | null
  }
}

export const OAuthRdvApiCallInputValidation = z.discriminatedUnion('endpoint', [
  OauthRdvApiMeInputValidation,
])

export type OAuthRdvApiCallInput = z.infer<
  typeof OAuthRdvApiCallInputValidation
>
