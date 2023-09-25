import * as process from 'node:process'
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
import { getDomainDataForDataIntegrity } from '@app/web/data/buildDatabase/getDomainDataForDataIntegrity'

export const buildDatabase = async () => {
  output(
    'Building database from geo data, data inclusion, mednum, conum and aidantsconnect',
  )

  output('Gathering domain data to ensure data integrity...')
  const domainData = await getDomainDataForDataIntegrity()

  output('Building regions...')
  const regions = await buildRegions({ domainData })

  output('Building departements...')
  const departements = await buildDepartements({ domainData })

  output('Building epcis...')
  const epcis = await buildEpcis({ domainData })

  output('Building communes...')
  const communes = await buildCommunes({ departements, domainData })

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
  console.log('ON', process.env.DATABASE_URL)
  // Executing transaction
  await prismaClient.$transaction([
    // Deferring constraints for this transaction
    prismaClient.$executeRaw`SET CONSTRAINTS ALL DEFERRED;`,

    // Avoiding multiple delete queries (first select all then delete where id in) with raw query
    prismaClient.$executeRaw`DELETE FROM cra_conseiller_numerique_par_departement`,
    prismaClient.$executeRaw`DELETE FROM ifn_commune`,
    prismaClient.$executeRaw`DELETE FROM ifn_epci`,
    prismaClient.$executeRaw`DELETE FROM coordinateur_conseiller_numerique`,
    prismaClient.$executeRaw`DELETE FROM conseillers_numeriques_en_permanence`,
    prismaClient.$executeRaw`DELETE FROM conseiller_numerique`,
    prismaClient.$executeRaw`DELETE FROM permanences_conseiller_numerique`,
    prismaClient.$executeRaw`DELETE FROM structures_aidants_connect`,
    prismaClient.$executeRaw`DELETE FROM structures_cartographie_nationale`,
    prismaClient.codesPostaux.deleteMany({
      where: {
        OR: [...communes.codePostauxJoinToDelete.values()].map(
          ({ code, codeCommune }) => ({
            code,
            codeCommune,
          }),
        ),
      },
    }),
    prismaClient.codePostal.deleteMany({
      where: {
        code: {
          in: [...communes.codePostalToDelete.values()],
        },
      },
    }),
    prismaClient.commune.deleteMany({
      where: {
        code: {
          in: [...communes.communesToDelete.values()],
        },
      },
    }),
    prismaClient.epci.deleteMany({
      where: {
        code: {
          in: [...epcis.toDelete.values()],
        },
      },
    }),
    prismaClient.departement.deleteMany({
      where: {
        code: {
          in: [...departements.toDelete.values()],
        },
      },
    }),
    prismaClient.region.deleteMany({
      where: {
        code: {
          in: [...regions.toDelete.values()],
        },
      },
    }),

    // Recreating data from sources
    prismaClient.region.createMany({
      data: regions.toCreate,
    }),
    ...regions.toUpdate.map((toUpdate) => prismaClient.region.update(toUpdate)),

    prismaClient.departement.createMany({
      data: departements.toCreate,
    }),
    ...departements.toUpdate.map((toUpdate) =>
      prismaClient.departement.update(toUpdate),
    ),

    prismaClient.epci.createMany({
      data: epcis.toCreate,
    }),
    ...epcis.toUpdate.map((toUpdate) => prismaClient.epci.update(toUpdate)),

    prismaClient.codePostal.createMany({
      data: communes.codePostalToCreate,
    }),

    prismaClient.commune.createMany({
      data: communes.communesToCreate,
    }),
    ...communes.communesToUpdate.map((toUpdate) =>
      prismaClient.commune.update(toUpdate),
    ),

    prismaClient.codesPostaux.createMany({
      data: communes.codePostauxJoinToCreate,
    }),
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
