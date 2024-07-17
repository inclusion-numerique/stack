import z from 'zod'

export const ServicesEtAccompagnementValidation = z.object({
  id: z.string().uuid(),
  services: z.array(z.string()).nullish(),
  modalitesAccompagnement: z.array(z.string()).nullish(),
})

export type ServicesEtAccompagnementData = z.infer<
  typeof ServicesEtAccompagnementValidation
>
