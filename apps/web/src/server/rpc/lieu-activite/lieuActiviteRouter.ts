import { v4 } from 'uuid'
import z from 'zod'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import {
  DescriptionData,
  DescriptionValidation,
} from '@app/web/app/structure/DescriptionValidation'
import {
  InformationsGeneralesData,
  InformationsGeneralesValidation,
} from '@app/web/app/structure/InformationsGeneralesValidation'
import {
  InformationsPratiquesData,
  InformationsPratiquesValidation,
} from '@app/web/app/structure/InformationsPratiquesValidation'
import {
  ModalitesAccesAuServiceData,
  ModalitesAccesAuServiceValidation,
} from '@app/web/app/structure/ModalitesAccesAuServiceValidation'
import {
  itineranceStructureValues,
  modalitesAccesStructureValues,
} from '@app/web/app/structure/optionsStructure'
import {
  ServicesEtAccompagnementData,
  ServicesEtAccompagnementValidation,
} from '@app/web/app/structure/ServicesEtAccompagnementValidation'
import {
  TypesDePublicsAccueillisData,
  TypesDePublicsAccueillisValidation,
} from '@app/web/app/structure/TypesDePublicsAccueillisValidation'
import {
  VisiblePourCartographieNationaleData,
  VisiblePourCartographieNationaleValidation,
} from '@app/web/app/structure/VisiblePourCartographieNationaleValidation'
import { CreerLieuActiviteValidation } from '@app/web/app/lieu-activite/CreerLieuActiviteValidation'
import { lieuActiviteValidation } from './lieuActiviteValidation'

const lieuActiviteToUpdate = async (
  user: SessionUser,
  input: { id: string },
) => {
  if (user.mediateur == null) return null

  const lieuActivite = await prismaClient.mediateurEnActivite.findFirst({
    where: {
      mediateurId: user.mediateur.id,
      structureId: input.id,
    },
    select: {
      structure: true,
    },
  })

  return lieuActivite?.structure ?? null
}

const setInformationsGeneralesFields = ({
  nom,
  adresseBan,
  complementAdresse,
  siret,
  rna,
}: Omit<InformationsGeneralesData, 'id'>) => ({
  nom,
  adresse: adresseBan.nom,
  commune: adresseBan.commune,
  codePostal: adresseBan.codePostal,
  codeInsee: adresseBan.codeInsee,
  latitude: adresseBan.latitude,
  longitude: adresseBan.longitude,
  complementAdresse,
  siret,
  rna,
})

const setVisiblePourCartographieNationaleFields = ({
  visiblePourCartographieNationale,
}: Omit<VisiblePourCartographieNationaleData, 'id'>) => ({
  visiblePourCartographieNationale,
})

const setInformationsPratiquesFields = ({
  lieuItinerant,
  siteWeb,
  ficheAccesLibre,
  horaires,
  priseRdv,
}: Omit<InformationsPratiquesData, 'id'>) => ({
  itinerance:
    lieuItinerant == null
      ? undefined
      : lieuItinerant
        ? [itineranceStructureValues.Itinérant]
        : [itineranceStructureValues.Fixe],
  siteWeb: siteWeb ?? undefined,
  ficheAccesLibre: ficheAccesLibre ?? undefined,
  horaires: horaires ?? undefined,
  priseRdv: priseRdv ?? undefined,
})

const setDescriptionFields = ({
  typologies,
  presentationResume,
  presentationDetail,
}: Omit<DescriptionData, 'id'>) => ({
  typologies: typologies ?? undefined,
  presentationResume: presentationResume ?? undefined,
  presentationDetail: presentationDetail ?? undefined,
})

const setServicesEtAccompagnementFields = ({
  services,
  modalitesAccompagnement,
}: Omit<ServicesEtAccompagnementData, 'id'>) => ({
  services: services ?? undefined,
  modalitesAccompagnement: modalitesAccompagnement ?? undefined,
})

const setModalitesAccesAuServiceFields = ({
  modalitesAcces,
  fraisACharge,
}: Omit<ModalitesAccesAuServiceData, 'id'>) => ({
  telephone:
    modalitesAcces?.parTelephone && modalitesAcces?.numeroTelephone != null
      ? modalitesAcces?.numeroTelephone
      : '',
  courriels:
    modalitesAcces?.parMail && modalitesAcces?.adresseMail != null
      ? [modalitesAcces.adresseMail]
      : [],
  modalitesAcces: modalitesAcces
    ? [
        modalitesAcces.surPlace
          ? modalitesAccesStructureValues['Se présenter']
          : undefined,
        modalitesAcces.parTelephone
          ? modalitesAccesStructureValues.Téléphoner
          : undefined,
        modalitesAcces.parMail
          ? modalitesAccesStructureValues['Contacter par mail']
          : undefined,
      ].filter(onlyDefinedAndNotNull)
    : undefined,
  fraisACharge: fraisACharge ?? undefined,
})

const setTypesDePublicsAccueillisFields = ({
  priseEnChargeSpecifique,
  publicsSpecifiquementAdresses,
}: Omit<TypesDePublicsAccueillisData, 'id'>) => ({
  priseEnChargeSpecifique: priseEnChargeSpecifique ?? undefined,
  publicsSpecifiquementAdresses: publicsSpecifiquementAdresses ?? undefined,
})

export const lieuActiviteRouter = router({
  create: protectedProcedure
    .input(CreerLieuActiviteValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      if (!user.mediateur) {
        throw forbiddenError("Cet utilisateur n'est pas un médiateur")
      }

      return prismaClient.structure.create({
        data: {
          id: v4(),
          ...setInformationsGeneralesFields(input),
          ...setVisiblePourCartographieNationaleFields(input),
          ...setInformationsPratiquesFields(input),
          ...setDescriptionFields(input),
          ...setServicesEtAccompagnementFields(input),
          ...setModalitesAccesAuServiceFields(input),
          ...setTypesDePublicsAccueillisFields(input),
          mediateursEnActivite: {
            create: {
              id: v4(),
              mediateurId: user.mediateur.id,
            },
          },
        },
      })
    }),
  delete: protectedProcedure
    .input(
      z.object({
        mediateurEnActiviteId: lieuActiviteValidation,
      }),
    )
    .mutation(async ({ input: { mediateurEnActiviteId }, ctx: { user } }) => {
      if (!user.mediateur) {
        throw forbiddenError("Cet utilisateur n'est pas un médiateur")
      }

      const lieuActivite = await prismaClient.mediateurEnActivite.findUnique({
        where: {
          id: mediateurEnActiviteId,
          mediateurId: user.mediateur.id,
          suppression: null,
        },
      })

      if (!lieuActivite) {
        throw invalidError("Ce lieu d’activité n'existe pas pour ce médiateur")
      }

      const timestamp = new Date()
      return prismaClient.mediateurEnActivite.updateMany({
        where: {
          id: mediateurEnActiviteId,
        },
        data: {
          suppression: timestamp,
          modification: timestamp,
        },
      })
    }),
  updateInformationsGenerales: protectedProcedure
    .input(InformationsGeneralesValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const structure = await lieuActiviteToUpdate(user, input)

      if (structure == null) return

      return prismaClient.structure.update({
        where: { id: structure.id },
        data: {
          ...structure,
          ...setInformationsGeneralesFields(input),
          modification: new Date(),
        },
      })
    }),
  updateVisiblePourCartographieNationale: protectedProcedure
    .input(VisiblePourCartographieNationaleValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const structure = await lieuActiviteToUpdate(user, input)

      if (structure == null) return

      return prismaClient.structure.update({
        where: { id: structure.id },
        data: {
          ...structure,
          ...setVisiblePourCartographieNationaleFields(input),
          modification: new Date(),
        },
      })
    }),
  updateInformationsPratiques: protectedProcedure
    .input(InformationsPratiquesValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const structure = await lieuActiviteToUpdate(user, input)

      if (structure == null) return

      return prismaClient.structure.update({
        where: { id: structure.id },
        data: {
          ...structure,
          ...setInformationsPratiquesFields(input),
          modification: new Date(),
        },
      })
    }),
  updateDescription: protectedProcedure
    .input(DescriptionValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const structure = await lieuActiviteToUpdate(user, input)

      if (structure == null) return

      return prismaClient.structure.update({
        where: { id: structure.id },
        data: {
          ...structure,
          ...setDescriptionFields(input),
          modification: new Date(),
        },
      })
    }),
  updateServicesEtAccompagnement: protectedProcedure
    .input(ServicesEtAccompagnementValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const structure = await lieuActiviteToUpdate(user, input)

      if (structure == null) return

      return prismaClient.structure.update({
        where: { id: structure.id },
        data: {
          ...structure,
          ...setServicesEtAccompagnementFields(input),
          modification: new Date(),
        },
      })
    }),
  updateModalitesAccesAuService: protectedProcedure
    .input(ModalitesAccesAuServiceValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const structure = await lieuActiviteToUpdate(user, input)

      if (structure == null) return

      return prismaClient.structure.update({
        where: { id: structure.id },
        data: {
          ...structure,
          ...setModalitesAccesAuServiceFields(input),
          modification: new Date(),
        },
      })
    }),
  updateTypesDePublicsAccueillis: protectedProcedure
    .input(TypesDePublicsAccueillisValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const structure = await lieuActiviteToUpdate(user, input)

      if (structure == null) return

      return prismaClient.structure.update({
        where: { id: structure.id },
        data: {
          ...structure,
          ...setTypesDePublicsAccueillisFields(input),
          modification: new Date(),
        },
      })
    }),
})
