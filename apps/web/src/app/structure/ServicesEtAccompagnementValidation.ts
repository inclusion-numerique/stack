import z from 'zod'

export const ServicesEtAccompagnementShape = {
  services: z.array(z.string()).nullish(),
  modalitesAccompagnement: z.array(z.string()).nullish(),
}

export const ServicesEtAccompagnementValidation = z.object({
  id: z.string().uuid(),
  ...ServicesEtAccompagnementShape,
})

export type ServicesEtAccompagnementData = z.infer<
  typeof ServicesEtAccompagnementValidation
>
