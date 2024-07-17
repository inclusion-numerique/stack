import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import { SessionUser } from '@app/web/auth/sessionUser'
import { VisiblePourCartographieNationaleValidation } from '@app/web/app/structure/VisiblePourCartographieNationaleValidation'
import { DescriptionValidation } from '@app/web/app/structure/DescriptionValidation'
import { InformationsPratiquesValidation } from '@app/web/app/structure/InformationsPratiquesValidation'
import { ModalitesAccesAuServiceValidation } from '@app/web/app/structure/ModalitesAccesAuServiceValidation'
import {
  itineranceStructureValues,
  modalitesAccesStructureValues,
} from '@app/web/app/structure/optionsStructure'
import { ServicesEtAccompagnementValidation } from '@app/web/app/structure/ServicesEtAccompagnementValidation'
import { TypesDePublicsAccueillisValidation } from '@app/web/app/structure/TypesDePublicsAccueillisValidation'
import { InformationsGeneralesValidation } from '@app/web/app/structure/InformationsGeneralesValidation'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
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

export const lieuActiviteRouter = router({
  delete: protectedProcedure
    .input(
      z.object({
        structureId: lieuActiviteValidation,
      }),
    )
    .mutation(async ({ input, ctx: { user } }) => {
      if (!user.mediateur) {
        throw forbiddenError("Cet utilisateur n'est pas un médiateur")
      }

      const lieuActivite = await prismaClient.mediateurEnActivite.findMany({
        where: {
          mediateurId: user.mediateur.id,
          structureId: input.structureId,
          suppression: null,
        },
      })

      if (!lieuActivite) {
        throw invalidError("Ce lieu d' activité n'existe pas")
      }

      const timestamp = new Date()
      return prismaClient.mediateurEnActivite.updateMany({
        where: {
          mediateurId: user.mediateur.id,
          structureId: input.structureId,
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
          modification: new Date(),
          nom: input.nom,
          adresse: input.adresseBan.nom,
          commune: input.adresseBan.commune,
          codePostal: input.adresseBan.codePostal,
          codeInsee: input.adresseBan.codeInsee,
          latitude: input.adresseBan.latitude,
          longitude: input.adresseBan.longitude,
          complementAdresse: input.complementAdresse,
          siret: input.siret,
          rna: input.rna,
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
          modification: new Date(),
          visiblePourCartographieNationale:
            input.visiblePourCartographieNationale,
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
          itinerance:
            typeof input.lieuItinerant === 'boolean'
              ? input.lieuItinerant
                ? [itineranceStructureValues.Itinérant]
                : [itineranceStructureValues.Fixe]
              : undefined,
          siteWeb: input.siteWeb ?? undefined,
          ficheAccesLibre: input.ficheAccesLibre ?? undefined,
          horaires: input.horaires ?? undefined,
          modification: new Date(),
        },
      })
    }),
  updateDescription: protectedProcedure
    .input(DescriptionValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const structure = await lieuActiviteToUpdate(user, input)

      if (structure == null) return

      console.log(input)

      return prismaClient.structure.update({
        where: { id: structure.id },
        data: {
          ...structure,
          typologies: input.typologies ?? undefined,
          presentationResume: input.presentationResume ?? undefined,
          presentationDetail: input.presentationDetail ?? undefined,
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
          services: input.services ?? undefined,
          modalitesAccompagnement: input.modalitesAccompagnement ?? undefined,
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
          telephone:
            input.modalitesAcces?.parTelephone &&
            input.modalitesAcces?.numeroTelephone != null
              ? input.modalitesAcces?.numeroTelephone
              : '',
          courriels:
            input.modalitesAcces?.parMail &&
            input.modalitesAcces?.adresseMail != null
              ? [input.modalitesAcces.adresseMail]
              : [],
          modalitesAcces: input.modalitesAcces
            ? [
                input.modalitesAcces.surPlace
                  ? modalitesAccesStructureValues['Se présenter']
                  : undefined,
                input.modalitesAcces.parTelephone
                  ? modalitesAccesStructureValues.Téléphoner
                  : undefined,
                input.modalitesAcces.parMail
                  ? modalitesAccesStructureValues['Contacter par mail']
                  : undefined,
              ].filter(isDefinedAndNotNull)
            : undefined,
          fraisACharge: input.fraisACharge ?? undefined,
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
          priseEnChargeSpecifique: input.priseEnChargeSpecifique ?? undefined,
          publicsSpecifiquementAdresses:
            input.publicsSpecifiquementAdresses ?? undefined,
          modification: new Date(),
        },
      })
    }),
})
