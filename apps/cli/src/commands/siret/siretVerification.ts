import { Command } from '@commander-js/extra-typings'
import { prismaClient } from '@app/web/prismaClient'
import { runPromisesInChunks } from '@app/web/utils/runPromisesInChunks'
import { checkAndUpsertSiret } from '@app/web/server/siret/checkAndUpsertSiret'
import { output } from '@app/cli/output'
import {
  configureDeploymentTarget,
  DeploymentTargetOption,
} from '@app/cli/deploymentTarget'

export const siretVerification = new Command()
  .command('siret:verification')
  .addOption(DeploymentTargetOption)
  .description(
    'Iterates over all "siret" model, check with API Entreprise their validity and update their status / data',
  )
  .action(async (args) => {
    await configureDeploymentTarget(args)

    const siretInformations = await prismaClient.informationsSiret.findMany({})

    const beforeCounts = {
      pending: siretInformations.filter(({ status }) => status === 'Pending'),
      valid: siretInformations.filter(({ status }) => status === 'Valid'),
      invalid: siretInformations.filter(({ status }) => status === 'Invalid'),
    }

    output(`Verification of ${siretInformations.length} sirets`)
    output(`Stats before : `)
    output(`- ${beforeCounts.pending.length} pending`)
    output(`- ${beforeCounts.valid.length} valid`)
    output(`- ${beforeCounts.invalid.length} invalid`)
    output(`Veryfing...`)
    const start = Date.now()
    const result = await runPromisesInChunks(
      siretInformations.map(({ siret }) => checkAndUpsertSiret(siret)),
      10,
    )

    const afterCounts = {
      pending: result.filter(({ status }) => status === 'Pending'),
      valid: result.filter(({ status }) => status === 'Valid'),
      invalid: result.filter(({ status }) => status === 'Invalid'),
    }

    output(`Verification done in ${(Date.now() - start) / 1000} s`)
    output(`Stats after : `)
    output(`- ${afterCounts.pending.length} pending`)
    output(`- ${afterCounts.valid.length} valid`)
    output(`- ${afterCounts.invalid.length} invalid`)
  })
