import { v4 } from 'uuid'
import {
  type Prisma,
  type StructureCartographieNationale,
} from '@prisma/client'
import { validateValidSiretDigits } from '@app/web/siret/siretValidation'
import { validateValidRnaDigits } from '@app/web/rna/rnaValidation'

/**
 * TODO check the more subtle fields like accessibility, typology ...
 */
export const cartoStructureToStructure = (
  cartoStructure: Pick<
    StructureCartographieNationale,
    | 'id'
    | 'nom'
    | 'adresse'
    | 'commune'
    | 'codePostal'
    | 'pivot'
    | 'codeInsee'
    | 'longitude'
    | 'latitude'
    | 'ficheAccesLibre'
    | 'presentationDetail'
    | 'presentationResume'
    | 'complementAdresse'
    | 'horaires'
    | 'siteWeb'
    | 'typologie'
    | 'modalitesAccompagnement'
  >,
) =>
  ({
    id: v4(),
    structureCartographieNationaleId: cartoStructure.id,
    nom: cartoStructure.nom,
    adresse: cartoStructure.adresse,
    commune: cartoStructure.commune,
    codePostal: cartoStructure.codePostal,
    siret:
      cartoStructure.pivot && validateValidSiretDigits(cartoStructure.pivot)
        ? cartoStructure.pivot
        : null,
    rna:
      cartoStructure.pivot && validateValidRnaDigits(cartoStructure.pivot)
        ? cartoStructure.pivot
        : null,
    codeInsee: cartoStructure.codeInsee,
    longitude: cartoStructure.longitude,
    latitude: cartoStructure.latitude,
    accessibilite: cartoStructure.ficheAccesLibre,
    presentationDetail: cartoStructure.presentationDetail,
    presentationResume: cartoStructure.presentationResume,
    visiblePourCartographieNationale: true,
    complementAdresse: cartoStructure.complementAdresse,
    horaires: cartoStructure.horaires,
    siteWeb: cartoStructure.siteWeb,
    typologie: cartoStructure.typologie,
    typesAccompagnement: cartoStructure.modalitesAccompagnement?.split('|'),
  }) satisfies Prisma.StructureCreateManyInput
