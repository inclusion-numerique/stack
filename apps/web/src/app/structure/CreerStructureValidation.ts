import z from 'zod'
import { DescriptionShape } from './DescriptionValidation'
import { InformationsGeneralesShape } from './InformationsGeneralesValidation'
import { InformationsPratiquesShape } from './InformationsPratiquesValidation'
import { ModalitesAccesAuServiceShape } from './ModalitesAccesAuServiceValidation'
import { ServicesEtAccompagnementShape } from './ServicesEtAccompagnementValidation'
import { TypesDePublicsAccueillisShape } from './TypesDePublicsAccueillisValidation'
import { VisiblePourCartographieNationaleShape } from './VisiblePourCartographieNationaleValidation'

export const CreerStructureValidation = z
  .object({
    // Créer un lieu d’activité pour un médiateur en meme temps que la structure
    lieuActiviteMediateurId: z.string().nullish(),
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

export type CreerStructureData = z.infer<typeof CreerStructureValidation>
