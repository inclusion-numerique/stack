import { createWriteStream } from 'node:fs'
import { output } from '@app/cli/output'
import { varFile } from '@app/config/varDirectory'
import { conseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import { Command } from '@commander-js/extra-typings'

export const listV1Emails = new Command()
  .command('v1:list-emails')
  .action(async () => {
    const conseillersCollection =
      await conseillerNumeriqueMongoCollection('conseillers')

    const emails = await conseillersCollection
      .find(
        {
          emailPro: { $exists: true, $ne: null },
          'emailCN.address': { $exists: true, $ne: null },
        },
        {
          projection: {
            emailPro: true,
            emailCN: true,
          },
        },
      )
      .toArray()

    const destination = varFile('emails-conums.csv')

    // Create csv file (erase previous content)
    // 2 headers lines (email conseiller numérique, email pro)
    await new Promise((resolve, reject) => {
      const writeStream = createWriteStream(destination)
      writeStream.on('finish', () => resolve(true))
      writeStream.on('error', reject)
      writeStream.write('email conseiller numérique,email pro\n')
      for (const email of emails) {
        writeStream.write(`${email.emailCN.address},${email.emailPro}\n`)
      }
      writeStream.end()
      writeStream.close()
    })

    output(`Output file: ${destination}`)
  })
