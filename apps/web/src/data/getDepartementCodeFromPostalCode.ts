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
    return postalCode.slice(0, 3)
  }

  if (postalCode in exceptions) {
    return exceptions[postalCode]
  }

  return postalCode.slice(0, 2)
}
