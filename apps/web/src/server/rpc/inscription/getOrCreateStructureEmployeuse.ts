import { StructureCreationDataWithSiret } from '@app/web/app/structure/StructureValidation'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { searchAdresse } from '@app/web/external-apis/apiAdresse'
import { banFeatureToAdresseBanData } from '@app/web/external-apis/ban/banFeatureToAdresseBanData'
import { prismaClient } from '@app/web/prismaClient'
import { addMutationLog } from '@app/web/utils/addMutationLog'
import { v4 } from 'uuid'

export const getOrCreateStructureEmployeuse = async (
  structureEmployeuse: StructureCreationDataWithSiret,
  user?: SessionUser,
) => {
  const existingStructure = await prismaClient.structure.findFirst({
    where: {
      id: structureEmployeuse.id ?? undefined,
      siret: structureEmployeuse.siret,
      nom: structureEmployeuse.nom,
      adresse: structureEmployeuse.adresse,
      commune: structureEmployeuse.commune,
      codeInsee: structureEmployeuse.codeInsee,
      suppression: null,
    },
    select: {
      id: true,
    },
  })

  if (existingStructure) {
    return existingStructure
  }

  const adresseResult = await searchAdresse(structureEmployeuse.adresse)

  if (!adresseResult) {
    addMutationLog({
      userId: user?.id,
      nom: 'CreerStructure',
      duration: 0,
      data: structureEmployeuse,
    })
    return prismaClient.structure.create({
      data: {
        id: v4(),
        siret: structureEmployeuse.siret,
        codeInsee: structureEmployeuse.codeInsee,
        nom: structureEmployeuse.nom,
        adresse: structureEmployeuse.adresse,
        commune: structureEmployeuse.commune,
        codePostal: '',
      },
      select: {
        id: true,
      },
    })
  }

  const {
    commune,
    codePostal,
    longitude,
    latitude,
    nom: adresse,
  } = banFeatureToAdresseBanData(adresseResult)

  addMutationLog({
    userId: user?.id,
    nom: 'CreerStructure',
    duration: 0,
    data: {
      ...structureEmployeuse,
      commune,
      codePostal,
      longitude,
      latitude,
      nom: adresse,
    },
  })

  return prismaClient.structure.create({
    data: {
      id: v4(),
      siret: structureEmployeuse.siret,
      codeInsee: structureEmployeuse.codeInsee,
      nom: structureEmployeuse.nom,
      adresse,
      commune,
      codePostal,
      longitude,
      latitude,
    },
  })
}
