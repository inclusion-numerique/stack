// eslint-disable-next-line unicorn/prevent-abbreviations
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Argument, Command } from '@commander-js/extra-typings'
import {
  projectStackSensitiveVariables,
  projectStackVariables,
} from '@app/cdk/ProjectStack'
import {
  webAppStackSensitiveVariables,
  webAppStackVariables,
} from '@app/cdk/WebAppStack'
import { output } from '@app/cli/output'

// See https://developer.hashicorp.com/terraform/language/values/variables#variable-definitions-tfvars-files
// eslint-disable-next-line unicorn/prevent-abbreviations
export const createTfVarsFileFromEnvironment = new Command()
  .command('terraform:vars-from-env')
  .addArgument(new Argument('<stack>', 'CDK Stack').choices(['web', 'project']))
  .action(async (stack) => {
    const variableNames =
      stack === 'web'
        ? [...webAppStackVariables, ...webAppStackSensitiveVariables]
        : stack === 'project'
        ? [...projectStackVariables, ...projectStackSensitiveVariables]
        : null

    if (!variableNames) {
      throw new Error('Invalid stack argument')
    }

    const variables = Object.fromEntries(
      variableNames.map((name) => {
        const value = process.env[name]
        if (!value) {
          throw new Error(
            `Variable ${name} is not present in environment but needed as a terraform variable for "${stack}" stack`,
          )
        }

        return [name, value]
      }),
    )

    const tfVariablesFile = resolve(
      // eslint-disable-next-line unicorn/prefer-module
      __dirname,
      '../../../../../packages/cdk/.tfvars.json',
    )
    await writeFile(tfVariablesFile, JSON.stringify(variables, null, 2))

    output(
      `The ${variableNames.length} terraform variables for stack ${stack} have been added to ${tfVariablesFile}`,
    )
  })
