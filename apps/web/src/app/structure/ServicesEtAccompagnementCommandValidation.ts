import z from 'zod'

export const ServicesEtAccompagnementCommandValidation = z.object({
  services: z.array(z.string()).nullish(),
  modalitesAccompagnement: z.array(z.string()).nullish(),
})

export type ServicesEtAccompagnementData = z.infer<
  typeof ServicesEtAccompagnementCommandValidation
>
