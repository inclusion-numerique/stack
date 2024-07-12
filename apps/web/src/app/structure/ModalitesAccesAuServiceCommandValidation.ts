import z from 'zod'

export const ModalitesAccesAuServiceCommandValidation = z.object({
  modalitesAcces: z
    .object({
      surPlace: z.boolean().nullish(),
      parTelephone: z.boolean().nullish(),
      numeroTelephone: z.string().nullish(),
      parMail: z.boolean().nullish(),
      adresseMail: z
        .string()
        .email('Veuillez renseigner une adresse email valide')
        .nullish(),
    })
    .nullish(),
  fraisACharge: z.array(z.string()).nullish(),
})

export type ModalitesAccesAuServiceData = z.infer<
  typeof ModalitesAccesAuServiceCommandValidation
>
