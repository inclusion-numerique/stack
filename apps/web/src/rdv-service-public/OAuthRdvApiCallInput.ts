import { z } from 'zod'

/**
 * Pour la documentation des API RDV, voir https://rdv.anct.gouv.fr/api-docs/index.html
 */

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

export type OauthRdvApiGetUserResponse = {
  user: {
    id: number
    address: string
    address_details: string | null
    affiliation_number: string
    birth_date: string
    birth_name: string | null
    caisse_affiliation: string
    case_number: string | null
    created_at: string
    email: string
    family_situation: string
    first_name: string
    invitation_accepted_at: string | null
    invitation_created_at: string | null
    last_name: string
    logement: string
    notes: string
    notify_by_email: boolean
    notify_by_sms: boolean
    number_of_children: number
    phone_number: string
    phone_number_formatted: string
    responsible: string | null
    responsible_id: number | null
    user_profiles: Array<{
      organisation: {
        id: number
        email: string | null
        name: string
        phone_number: string | null
        verticale: string
      }
    }>
  }
}

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
    dossier_url: z.string().url().optional(),
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
