import type { Prisma } from '@prisma/client'
import { fetchSiretData } from '@app/web/server/siret/fetchSiretData'
import { prismaClient } from '@app/web/prismaClient'
import { requiredSiretValidation } from '@app/web/validation/siretValidation'

/**
 * Takes a SIRET
 * If it exists in the database, update and returns corresponding data
 * If not, fetch from data Entreprise API, save it in database and returns it
 */
export const checkAndUpsertSiret = async (siret: string) => {
  const checkedData = requiredSiretValidation.safeParse(siret).success
    ? // Do not execute API call if siret is malformed
      await fetchSiretData(siret)
    : {
        siretInfo: null,
        error: {
          type: 'invalidSiret',
          message: 'Ce SIRET n’est pas valide',
        },
      }

  if (checkedData.error) {
    // Upsert siret, notifying the errors

    const updatedData = {
      verification: new Date(),
      erreurVerification: checkedData.error.message,
      status: 'Invalid' as const,
    } satisfies Prisma.InformationsSiretUpdateInput

    const upserted = await prismaClient.informationsSiret.upsert({
      where: {
        siret,
      },
      create: {
        siret,
        ...updatedData,
      },
      update: updatedData,
    })
    return upserted
  }

  // Upsert siret, including updated data

  const { nom, siren, formeJuridique, activitePrincipale } =
    checkedData.siretInfo

  const updatedData = {
    verification: new Date(),
    status: 'Valid' as const,
    erreurVerification: null,
    nom,
    siren,
    formeJuridiqueCode: formeJuridique.code,
    formeJuridiqueLibelle: formeJuridique.libelle,
    activitePrincipaleCode: activitePrincipale.code,
    activitePrincipaleLibelle: activitePrincipale.libelle,
    activitePrincipaleNomenclature: activitePrincipale.nomenclature,
  } satisfies Prisma.InformationsSiretUpdateInput

  const upserted = await prismaClient.informationsSiret.upsert({
    where: {
      siret,
    },
    create: {
      siret,
      ...updatedData,
    },
    update: updatedData,
  })
  return upserted
}
