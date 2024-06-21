import { v4 } from 'uuid'
import {
  type Prisma,
  type StructureCartographieNationale,
} from '@prisma/client'
import { validateValidSiretDigits } from '@app/web/siret/siretValidation'
import { validateValidRnaDigits } from '@app/web/rna/rnaValidation'

export const cartoStructureToStructure = ({
  adresse,
  codeInsee,
  codePostal,
  commune,
  complementAdresse,
  courriels,
  ficheAccesLibre,
  fraisACharge,
  horaires,
  id,
  itinerance,
  latitude,
  longitude,
  modalitesAcces,
  modalitesAccompagnement,
  nom,
  pivot,
  presentationDetail,
  presentationResume,
  priseEnChargeSpecifique,
  publicsSpecifiquementAdresses,
  services,
  siteWeb,
  telephone,
  typologie,
}: Pick<
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
  | 'services'
  | 'modalitesAcces'
  | 'fraisACharge'
  | 'itinerance'
  | 'priseEnChargeSpecifique'
  | 'publicsSpecifiquementAdresses'
  | 'courriels'
  | 'telephone'
>) =>
  ({
    id: v4(),
    structureCartographieNationaleId: id,
    nom,
    adresse,
    complementAdresse,
    commune,
    codePostal,
    siret: pivot && validateValidSiretDigits(pivot) ? pivot : null,
    rna: pivot && validateValidRnaDigits(pivot) ? pivot : null,
    codeInsee,
    longitude,
    latitude,
    ficheAccesLibre,
    services: services?.split('|'),
    horaires,
    typologie,
    presentationResume,
    presentationDetail,
    courriels: courriels?.split('|'),
    telephone,
    siteWeb,
    modalitesAccompagnement: modalitesAccompagnement?.split('|'),
    modalitesAcces: modalitesAcces?.split('|'),
    fraisACharge: fraisACharge?.split('|'),
    itinerance: itinerance?.split('|'),
    priseEnChargeSpecifique: priseEnChargeSpecifique?.split('|'),
    publicsSpecifiquementAdresses: publicsSpecifiquementAdresses?.split('|'),
  }) satisfies Prisma.StructureCreateManyInput
