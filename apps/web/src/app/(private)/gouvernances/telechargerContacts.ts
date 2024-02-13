import { formatInTimeZone } from 'date-fns-tz'
import { stringify } from 'csv-stringify'
import {
  getContactsGouvernanceDepartement,
  getContactsGouvernanceNational,
  getContactsGouvernanceRegion,
} from '@app/web/app/(private)/gouvernances/getContactsGouvernances'
import { GouvernanceScope } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import {
  contactTableHeaders,
  contactToData,
} from '@app/web/app/(private)/gouvernances/gouvernanceContactsTable'

export const telechargerContacts = async (scope: GouvernanceScope) => {
  const { contacts, scopeKey } =
    'codeRegion' in scope && scope.codeRegion
      ? {
          scopeKey: `region-${scope.codeRegion}`,
          contacts: await getContactsGouvernanceRegion(scope.codeRegion),
        }
      : 'codeDepartement' in scope && scope.codeDepartement
        ? {
            scopeKey: `departement-${scope.codeDepartement}`,
            contacts: await getContactsGouvernanceDepartement(
              scope.codeDepartement,
            ),
          }
        : {
            scopeKey: 'national',
            contacts: await getContactsGouvernanceNational(),
          }

  const date = formatInTimeZone(new Date(), 'Europe/Paris', 'yy-MM-dd-HH-mm')
  const filename = `france-numerique-ensemble_contacts_${scopeKey}_${date}.csv`

  const stringifier = stringify({
    delimiter: ',',
    record_delimiter: '\r\n', // For Windows compatibility
  })

  const readableStream = new ReadableStream({
    start(controller) {
      stringifier.on('readable', () => {
        let row: string
        // eslint-disable-next-line no-cond-assign, @typescript-eslint/no-unsafe-assignment
        while ((row = stringifier.read()) !== null) {
          controller.enqueue(new Uint8Array(Buffer.from(row)))
        }
      })
      stringifier.on('error', (error) => {
        controller.error(error)
      })
      stringifier.on('finish', () => {
        controller.close()
      })
      stringifier.write(contactTableHeaders)
      for (const contact of contacts) {
        stringifier.write(contactToData(contact))
      }
      stringifier.end()
    },
  })

  return new Response(readableStream, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=${filename}`,
    },
  })
}
