import { createWriteStream } from 'node:fs'
import axios from 'axios'
import { Command } from '@commander-js/extra-typings'
import { varFile } from '@app/config/varDirectory'
import { StatistiquesResponse } from '@app/web/app/api/v1/statistiques/route'
import { now } from 'lodash-es'
import { getTotalCountsStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getTotalCountsStats'
import { output } from '@app/cli/output'

// const BASE_URL = 'http://localhost:3000/api/v1/statistiques'
const departements: string[] = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '2A',
  '2B',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
  '60',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '67',
  '68',
  '69',
  '70',
  '71',
  '72',
  '73',
  '74',
  '75',
  '76',
  '77',
  '78',
  '79',
  '80',
  '81',
  '82',
  '83',
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '90',
  '91',
  '92',
  '93',
  '94',
  '95',
  // DOM-TOM
  '971', // Guadeloupe
  '972', // Martinique
  '973', // Guyane
  '974', // La Réunion
  '976', // Mayotte
]

export const fetchAccompagnements = new Command()
  .command('stats:fetch-accompagnements')
  .description("Récupère les totaux d'accompagnements pour chaque département")
  .argument('<conum>', '0 = mediateur 1 = conum ')
  .argument('<date>', 'date limite')
  .action(async (conum, date) => {
    const results = await Promise.all(
      departements.map(async (departement) => {
        const total = await getTotalCountsStats({
          activitesFilters: {
            departement,
            conseiller_numerique: `${conum}`,
            au: `${date}`,
          },
        })
        return { departement, total: total.accompagnements.total }
      }),
    )

    const destination = varFile(
      `accompagnements-departements-${conum === '0' ? 'mediateur' : 'conum'}-jusquau${date}-${new Date().toISOString()}.csv`,
    )

    // Création du fichier CSV en assurant l'écrasement du contenu existant
    await new Promise<void>((resolve, reject) => {
      const writeStream = createWriteStream(destination)
      writeStream.on('finish', () => resolve())
      writeStream.on('error', reject)
      // En-tête du fichier CSV
      writeStream.write('Département,Total Accompagnements\n')
      for (const { departement, total } of results) {
        writeStream.write(`${departement},${total}\n`)
      }
      writeStream.end()
      // Note : writeStream.close() n'est pas toujours nécessaire.
    })

    output(`Fichier de sortie : ${destination}`)
  })
