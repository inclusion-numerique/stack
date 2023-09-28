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
import { runPromisesSequentially } from '@app/web/utils/runPromisesSequentially'

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
  // Executing transaction
  await prismaClient.$transaction(
    async (transaction) => {
      // Deferring constraints for this transaction
      await transaction.$executeRaw`SET CONSTRAINTS ALL DEFERRED;`
      // Avoiding multiple delete queries (first select all then delete where id in) with raw query
      await transaction.$executeRaw`DELETE
                                    FROM cra_conseiller_numerique_par_departement`
      await transaction.$executeRaw`DELETE
                                    FROM ifn_commune`
      await transaction.$executeRaw`DELETE
                                    FROM ifn_epci`
      await transaction.$executeRaw`DELETE
                                    FROM coordinateur_conseiller_numerique`
      await transaction.$executeRaw`DELETE
                                    FROM conseillers_numeriques_en_permanence`
      await transaction.$executeRaw`DELETE
                                    FROM conseiller_numerique`
      await transaction.$executeRaw`DELETE
                                    FROM permanences_conseiller_numerique`
      await transaction.$executeRaw`DELETE
                                    FROM structures_aidants_connect`
      await transaction.$executeRaw`DELETE
                                    FROM structures_cartographie_nationale`
      await transaction.codesPostaux.deleteMany({
        where: {
          OR: [...communes.codePostauxJoinToDelete.values()].map(
            ({ code, codeCommune }) => ({
              code,
              codeCommune,
            }),
          ),
        },
      })
      await transaction.codePostal.deleteMany({
        where: {
          code: {
            in: [...communes.codePostalToDelete.values()],
          },
        },
      })
      await transaction.commune.deleteMany({
        where: {
          code: {
            in: [...communes.communesToDelete.values()],
          },
        },
      })
      await transaction.epci.deleteMany({
        where: {
          code: {
            in: [...epcis.toDelete.values()],
          },
        },
      })
      await transaction.departement.deleteMany({
        where: {
          code: {
            in: [...departements.toDelete.values()],
          },
        },
      })
      await transaction.region.deleteMany({
        where: {
          code: {
            in: [...regions.toDelete.values()],
          },
        },
      })

      // Recreating data from sources
      await transaction.region.createMany({
        data: regions.toCreate,
      })

      await runPromisesSequentially(
        regions.toUpdate.map((toUpdate) => transaction.region.update(toUpdate)),
      )

      await transaction.departement.createMany({
        data: departements.toCreate,
      })

      await runPromisesSequentially(
        departements.toUpdate.map((toUpdate) =>
          transaction.departement.update(toUpdate),
        ),
      )

      await transaction.epci.createMany({
        data: epcis.toCreate,
      })
      await runPromisesSequentially(
        epcis.toUpdate.map((toUpdate) => prismaClient.epci.update(toUpdate)),
      )

      await transaction.codePostal.createMany({
        data: communes.codePostalToCreate,
      })

      await transaction.commune.createMany({
        data: communes.communesToCreate,
      })
      await runPromisesSequentially(
        communes.communesToUpdate.map((toUpdate) =>
          transaction.commune.update(toUpdate),
        ),
      )

      await transaction.codesPostaux.createMany({
        data: communes.codePostauxJoinToCreate,
      })
      await transaction.structureCartographieNationale.createMany({
        data: structuresCartographieNationale.data,
      })
      await transaction.structureAidantsConnect.createMany({
        data: structuresAidantsConnect.data,
      })
      await transaction.conseillerNumerique.createMany({
        data: permanencesConum.conseillerNumeriqueData,
      })
      await transaction.coordinateurConseillerNumerique.createMany({
        data: coordinateursConum.data,
      })
      await transaction.permanenceConseillerNumerique.createMany({
        data: permanencesConum.permanenceData,
      })
      await transaction.conseillerNumeriqueEnPermanence.createMany({
        data: permanencesConum.conseillersEnPermanenceData,
      })
      await transaction.ifnEpci.createMany({ data: ifn.ifnEpciData })
      await transaction.ifnCommune.createMany({ data: ifn.ifnCommuneData })
      await transaction.craConseillerNumeriqueParDepartement.createMany({
        data: conumCras.data,
      })
    },
    {
      maxWait: 5000,
      timeout: 120_000,
    },
  )
  output(`Transaction done in ${(Date.now() - transactionStart) / 1000}s`)

  output('Done')
}
