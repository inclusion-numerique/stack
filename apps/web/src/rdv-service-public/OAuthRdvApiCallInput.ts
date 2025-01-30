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

export const OauthRdvApiCreateRdvPlanInputValidation = z.object({
  endpoint: z.literal('/rdv_plans'), // la route que tu vas appeler
  data: z.object({
    // 'user' est requis par le contrôleur
    user: z.object({
      id: z.number().optional(), // si on veut passer un user existant
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      email: z.string().email().optional(),
      address: z.string().optional(),
      phone_number: z.string().optional(),
      birth_date: z.string().optional(),
    }),
    // paramètre optionnel utilisé par le contrôleur
    return_url: z.string().url().optional(),
  }),
})
export type OauthRdvApiCreateRdvPlanInput = z.infer<
  typeof OauthRdvApiCreateRdvPlanInputValidation
>

export const OauthRdvApiCreateRdvPlanMutationInputValidation = z.object({
  beneficiaireId: z.string().uuid(),
  returnUrl: z.string().url(),
})

export type OauthRdvApiCreateRdvPlanMutationInput = z.infer<
  typeof OauthRdvApiCreateRdvPlanMutationInputValidation
>

// format de la réponse retournée (simplifié, car la blueprint n’est pas visible)
export type OauthRdvApiCreateRdvPlanResponse = {
  rdv_plan: {
    id: number
    created_at: string
    updated_at: string
    user_id: number // le bénéficiaire côté rendez-vous
    url: string // consultation du RDV
    rdv: {
      id: number
      status: string
    } | null
  }
}
