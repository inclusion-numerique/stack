import { ResourceReportReason } from '@prisma/client'
import z from 'zod'
import { labelsToOptions } from '@app/web/utils/options'

export const resourceReportReasonLabels: {
  [key in ResourceReportReason]: string
} = {
  [ResourceReportReason.Inappropriate]: 'Le contenu est inapproprié',
  [ResourceReportReason.Outdated]: 'Le contenu est obsolète',
  [ResourceReportReason.Errors]: 'Il y a des erreurs',
  [ResourceReportReason.Duplicate]: 'C’est le doublon d’une autre ressource',
}

export const resourceReportReasonOptions = labelsToOptions(
  resourceReportReasonLabels,
)

export const ResourceReportValidation = z.object({
  resourceId: z.string().uuid(),
  reason: z.nativeEnum(ResourceReportReason, {
    required_error: 'Veuillez renseigner un motif',
  }),
  comment: z.string().min(1, 'Veuillez renseigner une description'),
})

export type ResourceReportData = z.infer<typeof ResourceReportValidation>
