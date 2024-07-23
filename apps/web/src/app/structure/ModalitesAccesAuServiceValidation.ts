import z from 'zod'

export const ModalitesAccesAuServiceShape = {
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
    .nullish()
    .superRefine((data, refinementContext) => {
      if (data?.parMail && !data.adresseMail) {
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: "L'adresse email est obligatoire.",
          path: ['adresseMail'],
        })
      }
      if (data?.parTelephone && !data.numeroTelephone) {
        refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Le numéro de téléphone est obligatoire.',
          path: ['numeroTelephone'],
        })
      }
    }),
  fraisACharge: z.array(z.string()).nullish(),
}

export const ModalitesAccesAuServiceValidation = z.object({
  id: z.string().uuid(),
  ...ModalitesAccesAuServiceShape,
})

export type ModalitesAccesAuServiceData = z.infer<
  typeof ModalitesAccesAuServiceValidation
>
