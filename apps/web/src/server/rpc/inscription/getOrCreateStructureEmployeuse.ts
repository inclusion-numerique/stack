import { v4 } from 'uuid'
import { StructureCreationDataWithSiret } from '@app/web/app/structure/StructureValidation'
import { prismaClient } from '@app/web/prismaClient'
import { searchAdresse } from '@app/web/external-apis/apiAdresse'
import { banFeatureToAdresseBanData } from '@app/web/external-apis/ban/banFeatureToAdresseBanData'

export const getOrCreateStructureEmployeuse = async (
  structureEmployeuse: StructureCreationDataWithSiret,
) => {
  const existingStructure = await prismaClient.structure.findFirst({
    where: {
      id: structureEmployeuse.id ?? undefined,
      siret: structureEmployeuse.siret,
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
