import type { Prisma } from '@prisma/client'
import type { LieuStandardMediationNumerique } from '@app/web/data/standard-mediation-numerique/LieuStandardMediationNumerique'

export const structureToPrismaModel = (
  structure: LieuStandardMediationNumerique,
  now: Date,
): Prisma.StructureCreateManyInput => ({
  nom: structure.nom,
  latitude: structure.latitude,
  longitude: structure.longitude,
  presentationDetail: structure.presentation_detail,
  presentationResume: structure.presentation_resume,
  siteWeb: structure.site_web,
  telephone: structure.telephone,
  typologies: structure.typologie?.split('|'),
  adresse: structure.adresse,
  autresFormationsLabels: structure.autres_formations_labels?.split('|'),
  codeInsee: structure.code_insee,
  codePostal: structure.code_postal,
  commune: structure.commune,
  complementAdresse: structure.complement_adresse,
  courriels: structure.courriels?.split('|'),
  dispositifProgrammesNationaux:
    structure.dispositif_programmes_nationaux?.split('|'),
  ficheAccesLibre: structure.fiche_acces_libre,
  formationsLabels: structure.formations_labels?.split('|'),
  fraisACharge: structure.frais_a_charge?.split('|'),
  horaires: structure.horaires,
  itinerance: structure.itinerance?.split('|'),
  modalitesAcces: structure.modalites_acces?.split('|'),
  modalitesAccompagnement: structure.modalites_accompagnement?.split('|'),
  priseEnChargeSpecifique: structure.prise_en_charge_specifique?.split('|'),
  priseRdv: structure.prise_rdv,
  publicsSpecifiquementAdresses:
    structure.publics_specifiquement_adresses?.split('|'),
  services: structure.services?.split('|'),
  structureParente: structure.structure_parente,
  structureCartographieNationaleId: structure.id === '' ? null : structure.id,
  modification: now,
})
