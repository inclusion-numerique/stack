import z from 'zod'
import { DescriptionShape } from '@app/web/app/structure/DescriptionValidation'
import { InformationsGeneralesShape } from '@app/web/app/structure/InformationsGeneralesValidation'
import { InformationsPratiquesShape } from '@app/web/app/structure/InformationsPratiquesValidation'
import { ModalitesAccesAuServiceShape } from '@app/web/app/structure/ModalitesAccesAuServiceValidation'
import { ServicesEtAccompagnementShape } from '@app/web/app/structure/ServicesEtAccompagnementValidation'
import { TypesDePublicsAccueillisShape } from '@app/web/app/structure/TypesDePublicsAccueillisValidation'
import { VisiblePourCartographieNationaleShape } from '@app/web/app/structure/VisiblePourCartographieNationaleValidation'

export const CreerLieuActiviteValidation = z.object({
  ...InformationsGeneralesShape,
  ...VisiblePourCartographieNationaleShape,
  ...DescriptionShape,
  ...InformationsPratiquesShape,
  ...ModalitesAccesAuServiceShape,
  ...ServicesEtAccompagnementShape,
  ...TypesDePublicsAccueillisShape,
})

export type CreerLieuActiviteData = z.infer<typeof CreerLieuActiviteValidation>
