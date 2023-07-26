// https://fr.wikipedia.org/wiki/Liste_des_communes_de_France_dont_le_code_postal_ne_correspond_pas_au_département
const exceptions: Record<string, string> = {
  '42620': '03',
  '05110': '04',
  '05130': '04',
  '05160': '04',
  '06260': '04',
  '48250': '07',
  '43450': '15',
  '33220': '24',
  '05700': '26',
  '01410': '39',
  '39310': '39',
  '01590': '39',
  '52100': '51',
  '21340': '71',
  '01200': '74',
  '13780': '83',
  '37160': '86',
  '94390': '91',
  '91550': '91',
}

const departementCodes = new Set([
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
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '2A',
  '2B',
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
  '971',
  '972',
  '973',
  '974',
  '975',
  '976',
  '977',
  '978',
  '986',
  '987',
  '988',
  '989',
])

export const getDepartementCodeFromPostalCode = (postalCode: string) => {
  if (postalCode.startsWith('20')) {
    // Special case for Corsica
    // https://fr.wikipedia.org/wiki/Code_postal_en_France#:~:text=Corse%20(20),-En%201976%2C%20le&text=Les%20deux%20premiers%20chiffres%20des,a%20conservé%20le%2020000%E2%80%8B%20.

    if (
      postalCode === '20600' ||
      postalCode === '20620' ||
      postalCode === '20000' ||
      postalCode === '20090'
    ) {
      return '2B'
    }

    if (postalCode.startsWith('201')) {
      return '2A'
    }

    if (postalCode.startsWith('202')) {
      return '2B'
    }

    throw new Error(`Invalid Corsica postal code ${postalCode}`)
  }

  if (postalCode.startsWith('97')) {
    // Special case for overseas departments
    const slice = postalCode.slice(0, 3)
    if (!departementCodes.has(slice)) {
      throw new Error(`Invalid overseas postal code ${postalCode}`)
    }
    return slice
  }

  if (postalCode in exceptions) {
    return exceptions[postalCode]
  }
  const slice = postalCode.slice(0, 2)
  if (!departementCodes.has(slice)) {
    throw new Error(`Invalid postal code ${postalCode}`)
  }
  return slice
}
