import { DescriptionShape } from '@app/web/app/structure/DescriptionValidation'
import { InformationsGeneralesShape } from '@app/web/app/structure/InformationsGeneralesValidation'
import { InformationsPratiquesShape } from '@app/web/app/structure/InformationsPratiquesValidation'
import { ModalitesAccesAuServiceShape } from '@app/web/app/structure/ModalitesAccesAuServiceValidation'
import { ServicesEtAccompagnementShape } from '@app/web/app/structure/ServicesEtAccompagnementValidation'
import { TypesDePublicsAccueillisShape } from '@app/web/app/structure/TypesDePublicsAccueillisValidation'
import { VisiblePourCartographieNationaleShape } from '@app/web/app/structure/VisiblePourCartographieNationaleValidation'
import z from 'zod'

export const CreerLieuActiviteValidation = z
  .object({
    ...InformationsGeneralesShape,
    ...VisiblePourCartographieNationaleShape,
    ...DescriptionShape,
    ...InformationsPratiquesShape,
    ...ModalitesAccesAuServiceShape,
    ...ServicesEtAccompagnementShape,
    ...TypesDePublicsAccueillisShape,
  })
  .refine(
    (data) =>
      !data.visiblePourCartographieNationale ||
      (data.services?.length ?? 0) > 0,
    {
      message:
        'Au moins un service doit être renseigné pour que le lieu d’activité soit visible sur la cartographie.',
      path: ['services'],
    },
  )

export type CreerLieuActiviteData = z.infer<typeof CreerLieuActiviteValidation>
