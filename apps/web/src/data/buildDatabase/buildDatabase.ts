import { output } from '@app/cli/output'
import { buildRegions } from '@app/web/data/buildDatabase/buildRegions'
import { buildDepartements } from '@app/web/data/buildDatabase/buildDepartements'
import { buildEpcis } from '@app/web/data/buildDatabase/buildEpcis'
import { buildCommunes } from '@app/web/data/buildDatabase/buildCommunes'
import { buildStructuresCartographieNationale } from '@app/web/data/buildDatabase/buildStructuresCartographieNationale'
import { buildStructuresAidantsConnect } from '@app/web/data/buildDatabase/buildStructuresAidantsConnect'
import { buildPermanencesConum } from '@app/web/data/buildDatabase/buildPermanencesConum'
import { buildIfn } from '@app/web/data/buildDatabase/buildIfn'
import { buildCoordinateursConum } from '@app/web/data/buildDatabase/buildCoordinateursConum'
import { buildConumCras } from '@app/web/data/buildDatabase/buildConumCras'
import { prismaClient } from '@app/web/prismaClient'

export const buildDatabase = async () => {
  output(
    'Building database from geo data, data inclusion, mednum, conum and aidantsconnect',
  )

  output('Building regions...')
  const regions = await buildRegions()

  output('Building departements...')
  const departements = await buildDepartements()

  output('Building epcis...')
  const epcis = await buildEpcis()

  output('Building communes...')
  const communes = await buildCommunes({ departements })

  output('Building structures cartographie nationale...')
  const structuresCartographieNationale =
    await buildStructuresCartographieNationale({ communes })

  output('Building structures Aidants connect...')
  const structuresAidantsConnect = await buildStructuresAidantsConnect({
    structuresCartographieNationale,
  })

  output('Building permanences Conseillers numerique...')
  const permanencesConum = await buildPermanencesConum({
    structuresCartographieNationale,
  })

  output('Building IFN...')
  const ifn = await buildIfn({ epcis, communes })

  output('Building Conum Cras...')
  const conumCras = await buildConumCras({ departements })

  output('Building coordination conums...')
  const coordinateursConum = await buildCoordinateursConum()

  const transactionStart = Date.now()
  output('Starting transaction...')
  // Executing transaction
  await prismaClient.$transaction([
    // Delete all data in order of dependencies
    prismaClient.craConseillerNumeriqueParDepartement.deleteMany(),
    prismaClient.ifnCommune.deleteMany(),
    prismaClient.ifnEpci.deleteMany(),
    prismaClient.coordinateurConseillerNumerique.deleteMany(),
    prismaClient.conseillerNumeriqueEnPermanence.deleteMany(),
    prismaClient.conseillerNumerique.deleteMany(),
    prismaClient.permanenceConseillerNumerique.deleteMany(),
    prismaClient.structureAidantsConnect.deleteMany(),
    prismaClient.permanenceConseillerNumerique.deleteMany(),
    prismaClient.structureCartographieNationale.deleteMany(),
    prismaClient.codesPostaux.deleteMany(),
    prismaClient.codePostal.deleteMany(),
    prismaClient.commune.deleteMany(),
    prismaClient.epci.deleteMany(),
    prismaClient.departement.deleteMany(),
    prismaClient.region.deleteMany(),
    // Recreating data from sources
    prismaClient.region.createMany({ data: regions.data }),
    prismaClient.departement.createMany({ data: departements.data }),
    prismaClient.epci.createMany({ data: epcis.data }),
    prismaClient.codePostal.createMany({ data: communes.codePostalData }),
    prismaClient.commune.createMany({ data: communes.communesData }),
    prismaClient.codesPostaux.createMany({ data: communes.codesPostauxData }),
    prismaClient.structureCartographieNationale.createMany({
      data: structuresCartographieNationale.data,
    }),
    prismaClient.structureAidantsConnect.createMany({
      data: structuresAidantsConnect.data,
    }),
    prismaClient.conseillerNumerique.createMany({
      data: permanencesConum.conseillerNumeriqueData,
    }),
    prismaClient.coordinateurConseillerNumerique.createMany({
      data: coordinateursConum.data,
    }),
    prismaClient.permanenceConseillerNumerique.createMany({
      data: permanencesConum.permanenceData,
    }),
    prismaClient.conseillerNumeriqueEnPermanence.createMany({
      data: permanencesConum.conseillersEnPermanenceData,
    }),
    prismaClient.ifnEpci.createMany({ data: ifn.ifnEpciData }),
    prismaClient.ifnCommune.createMany({ data: ifn.ifnCommuneData }),
    prismaClient.craConseillerNumeriqueParDepartement.createMany({
      data: conumCras.data,
    }),
  ])
  output(`Transaction done in ${(Date.now() - transactionStart) / 1000}s`)
  output('Done')
}
