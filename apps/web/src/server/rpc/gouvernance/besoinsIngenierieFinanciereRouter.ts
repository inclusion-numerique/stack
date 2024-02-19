import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import { getBesoinsEnIngenieriePriorisationDefaultValues } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/besoinsEnIngenieriePriorisationDefaultValues'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { prismaClient } from '@app/web/prismaClient'
import { invalidError, notFoundError } from '@app/web/server/rpc/trpcErrors'
import { GouvernanceIdValidation } from '@app/web/gouvernance/GouvernanceIdValidation'
import { checkSecurityForGouvernanceMutation } from '@app/web/server/rpc/gouvernance/gouvernanceSecurity'
import {
  BesoinsEnIngenierieFinancierePrioriteValidation,
  BesoinsEnIngenierieFinanciereValidation,
} from '@app/web/gouvernance/BesoinsEnIngenierieFinanciere'

export const besoinsIngenierieFinanciereRouter = router({
  create: protectedProcedure
    .input(GouvernanceIdValidation)
    .mutation(async ({ input: { gouvernanceId }, ctx: { user } }) => {
      const gouvernance = await prismaClient.gouvernance.findUnique({
        where: {
          id: gouvernanceId,
        },
        select: {
          id: true,
          departementCode: true,
          besoinsEnIngenierieFinanciereId: true,
        },
      })

      if (!gouvernance) {
        throw notFoundError()
      }

      await checkSecurityForGouvernanceMutation(
        user,
        gouvernance.departementCode,
      )

      if (gouvernance.besoinsEnIngenierieFinanciereId) {
        throw invalidError('Besoins en ingénierie financière déjà créés')
      }

      const result = await prismaClient.besoinsEnIngenierieFinanciere.create({
        data: {
          id: v4(),
          gouvernance: { connect: { id: gouvernance.id } },
          createurId: user.id,
          derniereModificationParId: user.id,
          totalEtp: 0,
          texteIntroductionLu: new Date(),
        },
      })

      return result
    }),
  selection: protectedProcedure
    .input(BesoinsEnIngenierieFinanciereValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const {
        gouvernanceId,
        coConstruireLaFeuilleDeRoute,
        redigerLaFeuilleDeRoute,
        formaliserLaFeuilleDeRouteAutre,
        creerUnVehiculeJuridique,
        faireUnDiagnosticTerritorial,
        financerLeDeploiementAutre,
        formerLesProfessionnelsAutre,
        formerLesProfessionnelsAutrePrecisions,
        outillerLesActeursAutre,
        sensibiliserLesActeurs,
        formerLesSalariesAssociatifs,
        formerLesSalariesAssociatifsNombre,
        formerLesAgentsPublicsNombre,
        formerLesAgentsPublics,
        appuyerLaCertificationQualiopi,
        monterDesDossiersDeSubvention,
        collecterDesDonneesTerritoriales,
        structurerUnFondsLocal,
        structurerUneFiliereDeReconditionnement,
        animerEtMettreEnOeuvre,
      } = input

      const gouvernance = await prismaClient.gouvernance.findUnique({
        where: {
          id: gouvernanceId,
        },
        select: {
          id: true,
          departementCode: true,
          besoinsEnIngenierieFinanciere: {
            select: {
              id: true,
              texteIntroductionLu: true,
              selectionEnregistree: true,
              priorisationEnregistree: true,
            },
          },
        },
      })

      if (!gouvernance || !gouvernance.besoinsEnIngenierieFinanciere) {
        throw notFoundError()
      }

      await checkSecurityForGouvernanceMutation(
        user,
        gouvernance.departementCode,
      )

      const data = {
        derniereModificationParId: user.id,
        selectionEnregistree: new Date(),
        totalEtp: 0,

        // Formaliser la feuille de route
        faireUnDiagnosticTerritorial:
          faireUnDiagnosticTerritorial.besoin ?? false,
        faireUnDiagnosticTerritorialEtp: faireUnDiagnosticTerritorial.besoin
          ? faireUnDiagnosticTerritorial.etp
          : null,
        faireUnDiagnosticTerritorialPrestation:
          faireUnDiagnosticTerritorial.besoin
            ? faireUnDiagnosticTerritorial.prestation
            : false,

        coConstruireLaFeuilleDeRoute:
          coConstruireLaFeuilleDeRoute.besoin ?? false,
        coConstruireLaFeuilleDeRouteEtp: coConstruireLaFeuilleDeRoute.besoin
          ? coConstruireLaFeuilleDeRoute.etp
          : null,
        coConstruireLaFeuilleDeRoutePrestation:
          coConstruireLaFeuilleDeRoute.besoin
            ? coConstruireLaFeuilleDeRoute.prestation
            : false,

        redigerLaFeuilleDeRoute: redigerLaFeuilleDeRoute.besoin ?? false,
        redigerLaFeuilleDeRouteEtp: redigerLaFeuilleDeRoute.besoin
          ? redigerLaFeuilleDeRoute.etp
          : null,
        redigerLaFeuilleDeRoutePrestation: redigerLaFeuilleDeRoute.besoin
          ? redigerLaFeuilleDeRoute.prestation
          : false,

        creerUnVehiculeJuridique: creerUnVehiculeJuridique.besoin ?? false,
        creerUnVehiculeJuridiqueEtp: creerUnVehiculeJuridique.besoin
          ? creerUnVehiculeJuridique.etp
          : null,
        creerUnVehiculeJuridiquePrestation: creerUnVehiculeJuridique.besoin
          ? creerUnVehiculeJuridique.prestation
          : false,

        formaliserLaFeuilleDeRouteAutre: formaliserLaFeuilleDeRouteAutre.besoin,
        formaliserLaFeuilleDeRouteAutrePrecisions:
          formaliserLaFeuilleDeRouteAutre.besoin
            ? formaliserLaFeuilleDeRouteAutre.precisions
            : null,
        formaliserLaFeuilleDeRouteAutreEtp:
          formaliserLaFeuilleDeRouteAutre.besoin
            ? formaliserLaFeuilleDeRouteAutre.etp
            : null,
        formaliserLaFeuilleDeRouteAutrePrestation:
          formaliserLaFeuilleDeRouteAutre.besoin
            ? formaliserLaFeuilleDeRouteAutre.prestation
            : false,

        // Financer le déploiement de la feuille de route
        structurerUnFondsLocal: structurerUnFondsLocal.besoin ?? false,
        structurerUnFondsLocalEtp: structurerUnFondsLocal.besoin
          ? structurerUnFondsLocal.etp
          : null,
        structurerUnFondsLocalPrestation: structurerUnFondsLocal.besoin
          ? structurerUnFondsLocal.prestation
          : false,

        monterDesDossiersDeSubvention:
          monterDesDossiersDeSubvention.besoin ?? false,
        monterDesDossiersDeSubventionEtp: monterDesDossiersDeSubvention.besoin
          ? monterDesDossiersDeSubvention.etp
          : null,
        monterDesDossiersDeSubventionPrestation:
          monterDesDossiersDeSubvention.besoin
            ? monterDesDossiersDeSubvention.prestation
            : false,

        animerEtMettreEnOeuvre: animerEtMettreEnOeuvre.besoin ?? false,
        animerEtMettreEnOeuvreEtp: animerEtMettreEnOeuvre.besoin
          ? animerEtMettreEnOeuvre.etp
          : null,
        animerEtMettreEnOeuvrePrestation: animerEtMettreEnOeuvre.besoin
          ? animerEtMettreEnOeuvre.prestation
          : false,

        financerLeDeploiementAutre: financerLeDeploiementAutre.besoin ?? false,
        financerLeDeploiementAutrePrecisions: financerLeDeploiementAutre.besoin
          ? financerLeDeploiementAutre.precisions
          : null,
        financerLeDeploiementAutreEtp: financerLeDeploiementAutre.besoin
          ? financerLeDeploiementAutre.etp
          : null,
        financerLeDeploiementAutrePrestation: financerLeDeploiementAutre.besoin
          ? financerLeDeploiementAutre.prestation
          : false,

        // Outiller les acteurs du territoire
        structurerUneFiliereDeReconditionnement:
          structurerUneFiliereDeReconditionnement.besoin ?? false,
        structurerUneFiliereDeReconditionnementEtp:
          structurerUneFiliereDeReconditionnement.besoin
            ? structurerUneFiliereDeReconditionnement.etp
            : null,
        structurerUneFiliereDeReconditionnementPrestation:
          structurerUneFiliereDeReconditionnement.besoin
            ? structurerUneFiliereDeReconditionnement.prestation
            : false,

        collecterDesDonneesTerritoriales:
          collecterDesDonneesTerritoriales.besoin ?? false,
        collecterDesDonneesTerritorialesEtp:
          collecterDesDonneesTerritoriales.besoin
            ? collecterDesDonneesTerritoriales.etp
            : null,
        collecterDesDonneesTerritorialesPrestation:
          collecterDesDonneesTerritoriales.besoin
            ? collecterDesDonneesTerritoriales.prestation
            : false,

        sensibiliserLesActeurs: sensibiliserLesActeurs.besoin ?? false,
        sensibiliserLesActeursEtp: sensibiliserLesActeurs.besoin
          ? sensibiliserLesActeurs.etp
          : null,
        sensibiliserLesActeursPrestation: sensibiliserLesActeurs.besoin
          ? sensibiliserLesActeurs.prestation
          : false,

        outillerLesActeursAutre: outillerLesActeursAutre.besoin ?? false,
        outillerLesActeursAutrePrecisions: outillerLesActeursAutre.besoin
          ? outillerLesActeursAutre.precisions
          : null,
        outillerLesActeursAutreEtp: outillerLesActeursAutre.besoin
          ? outillerLesActeursAutre.etp
          : null,
        outillerLesActeursAutrePrestation: outillerLesActeursAutre.besoin
          ? outillerLesActeursAutre.prestation
          : false,

        // Former les professionnels à l’inclusion numérique
        formerLesAgentsPublics: formerLesAgentsPublics ?? false,
        formerLesAgentsPublicsNombre: formerLesAgentsPublics
          ? formerLesAgentsPublicsNombre
          : null,

        formerLesSalariesAssociatifs: formerLesSalariesAssociatifs ?? false,
        formerLesSalariesAssociatifsNombre: formerLesSalariesAssociatifs
          ? formerLesSalariesAssociatifsNombre
          : null,

        appuyerLaCertificationQualiopi: appuyerLaCertificationQualiopi ?? false,

        formerLesProfessionnelsAutre: formerLesProfessionnelsAutre ?? false,
        formerLesProfessionnelsAutrePrecisions: formerLesProfessionnelsAutre
          ? formerLesProfessionnelsAutrePrecisions
          : null,
      } satisfies Prisma.BesoinsEnIngenierieFinanciereUncheckedUpdateInput

      // TODO Sum ETPs
      for (const [key, value] of Object.entries(data)) {
        // If key ends with "Etp" and value is not null, add to totalEtp
        if (key.endsWith('Etp') && typeof value === 'number') {
          data.totalEtp += value
        }
      }

      const updatedBesoins =
        await prismaClient.besoinsEnIngenierieFinanciere.update({
          where: {
            id: gouvernance.besoinsEnIngenierieFinanciere.id,
          },
          data,
        })

      // Update priority values for new besoins

      const defaultPrioriteValues =
        getBesoinsEnIngenieriePriorisationDefaultValues({
          id: gouvernance.id,
          besoinsEnIngenierieFinanciere: updatedBesoins,
        })

      const { priorites } = defaultPrioriteValues

      const updatedBesoinsWithMissingPriorities =
        await prismaClient.besoinsEnIngenierieFinanciere.update({
          where: {
            id: updatedBesoins.id,
          },
          data: priorites,
        })
      return updatedBesoinsWithMissingPriorities
    }),

  priorisation: protectedProcedure
    .input(BesoinsEnIngenierieFinancierePrioriteValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const {
        gouvernanceId,
        priorites: {
          coConstruireLaFeuilleDeRoutePrestationPriorite,
          redigerLaFeuilleDeRoutePrestationPriorite,
          formaliserLaFeuilleDeRouteAutrePrestationPriorite,
          financerLeDeploiementAutrePrestationPriorite,
          formerLesProfessionnelsAutrePriorite,
          formerLesAgentsPublicsPriorite,
          formerLesSalariesAssociatifsPriorite,
          outillerLesActeursAutrePrestationPriorite,
          sensibiliserLesActeursPrestationPriorite,
          appuyerLaCertificationQualiopiPriorite,
          creerUnVehiculeJuridiquePrestationPriorite,
          faireUnDiagnosticTerritorialPrestationPriorite,
          collecterDesDonneesTerritorialesPrestationPriorite,
          monterDesDossiersDeSubventionPrestationPriorite,
          structurerUnFondsLocalPrestationPriorite,
          structurerUneFiliereDeReconditionnementPrestationPriorite,
          totalEtpPriorite,
          animerEtMettreEnOeuvrePrestationPriorite,
        },
      } = input

      const gouvernance = await prismaClient.gouvernance.findUnique({
        where: {
          id: gouvernanceId,
        },
        select: {
          id: true,
          departementCode: true,
          besoinsEnIngenierieFinanciere: {
            select: {
              id: true,
              texteIntroductionLu: true,
              selectionEnregistree: true,
              priorisationEnregistree: true,
            },
          },
        },
      })

      if (!gouvernance || !gouvernance.besoinsEnIngenierieFinanciere) {
        throw notFoundError()
      }

      await checkSecurityForGouvernanceMutation(
        user,
        gouvernance.departementCode,
      )

      const data = {
        derniereModificationParId: user.id,
        priorisationEnregistree: new Date(),

        // Erase all priorites that are not in the input
        coConstruireLaFeuilleDeRoutePrestationPriorite:
          coConstruireLaFeuilleDeRoutePrestationPriorite ?? null,
        redigerLaFeuilleDeRoutePrestationPriorite:
          redigerLaFeuilleDeRoutePrestationPriorite ?? null,
        formaliserLaFeuilleDeRouteAutrePrestationPriorite:
          formaliserLaFeuilleDeRouteAutrePrestationPriorite ?? null,
        financerLeDeploiementAutrePrestationPriorite:
          financerLeDeploiementAutrePrestationPriorite ?? null,
        formerLesProfessionnelsAutrePriorite:
          formerLesProfessionnelsAutrePriorite ?? null,
        formerLesAgentsPublicsPriorite: formerLesAgentsPublicsPriorite ?? null,
        formerLesSalariesAssociatifsPriorite:
          formerLesSalariesAssociatifsPriorite ?? null,
        outillerLesActeursAutrePrestationPriorite:
          outillerLesActeursAutrePrestationPriorite ?? null,
        sensibiliserLesActeursPrestationPriorite:
          sensibiliserLesActeursPrestationPriorite ?? null,
        appuyerLaCertificationQualiopiPriorite:
          appuyerLaCertificationQualiopiPriorite ?? null,
        creerUnVehiculeJuridiquePrestationPriorite:
          creerUnVehiculeJuridiquePrestationPriorite ?? null,
        faireUnDiagnosticTerritorialPrestationPriorite:
          faireUnDiagnosticTerritorialPrestationPriorite ?? null,
        collecterDesDonneesTerritorialesPrestationPriorite:
          collecterDesDonneesTerritorialesPrestationPriorite ?? null,
        monterDesDossiersDeSubventionPrestationPriorite:
          monterDesDossiersDeSubventionPrestationPriorite ?? null,
        structurerUnFondsLocalPrestationPriorite:
          structurerUnFondsLocalPrestationPriorite ?? null,
        structurerUneFiliereDeReconditionnementPrestationPriorite:
          structurerUneFiliereDeReconditionnementPrestationPriorite ?? null,
        totalEtpPriorite: totalEtpPriorite ?? null,
        animerEtMettreEnOeuvrePrestationPriorite:
          animerEtMettreEnOeuvrePrestationPriorite ?? null,
      } satisfies Prisma.BesoinsEnIngenierieFinanciereUncheckedUpdateInput

      const result = await prismaClient.besoinsEnIngenierieFinanciere.update({
        where: {
          id: gouvernance.besoinsEnIngenierieFinanciere.id,
        },
        data,
      })
      return result
    }),
  erase: protectedProcedure
    .input(GouvernanceIdValidation)
    .mutation(async ({ input: { gouvernanceId }, ctx: { user } }) => {
      const gouvernance = await prismaClient.gouvernance.findUnique({
        where: {
          id: gouvernanceId,
        },
        select: {
          id: true,
          departementCode: true,
          besoinsEnIngenierieFinanciereId: true,
        },
      })

      if (!gouvernance) {
        throw notFoundError()
      }

      await checkSecurityForGouvernanceMutation(
        user,
        gouvernance.departementCode,
      )

      if (!gouvernance.besoinsEnIngenierieFinanciereId) {
        throw invalidError('Besoins en ingénierie financière non créés')
      }

      await prismaClient.besoinsEnIngenierieFinanciere.delete({
        where: {
          id: gouvernance.besoinsEnIngenierieFinanciereId,
        },
      })

      // Recreate empty besoin to skip intro (like create)
      const result = await prismaClient.besoinsEnIngenierieFinanciere.create({
        data: {
          id: v4(),
          gouvernance: { connect: { id: gouvernance.id } },
          createurId: user.id,
          derniereModificationParId: user.id,
          totalEtp: 0,
          texteIntroductionLu: new Date(),
        },
      })

      return result
    }),
})
