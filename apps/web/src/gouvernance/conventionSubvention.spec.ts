import { writeFileSync } from 'node:fs'
import { createVarDirectory } from '@app/config/createVarDirectory'
import { varDirectory } from '@app/config/varDirectory'
import { generateConventionSubvention } from '@app/web/gouvernance/conventionSubvention'
import { MembreBeneficiaireDataForConvention } from '@app/web/gouvernance/getMembreBeneficiaireDataForConvention'

const outputName = (filename: string) =>
  `${varDirectory}/conventions/${filename}.odt`

const conventionDataMock = {
  beneficiaireFormation: true,
  membre: {
    id: '1',
    region: null,
    epci: null,
    departement: null,
    commune: null,
    siret: null,
    coporteur: false,
    modification: new Date(),
    creation: new Date(),
    nomStructure: null,
    formulaireGouvernanceId: '3',
    siretInformations: null,
    gouvernance: {
      id: '2',
      departement: {
        code: '42',
        nom: 'Loire',
      },
    },
    beneficiaireSubventions: [],
    beneficiaireDotationFormation: null,
  },
} satisfies MembreBeneficiaireDataForConvention

describe('generateConventionSubvention', () => {
  beforeAll(() => {
    createVarDirectory('/conventions')
  })

  it('Creates convention without formation', async () => {
    const data = await generateConventionSubvention({
      ...conventionDataMock,
      beneficiaireFormation: false,
    })
    expect(data).toBeInstanceOf(Buffer)
    writeFileSync(outputName('fne-convention_without-formation'), data)
  })

  it('Creates convention with formation', async () => {
    const data = await generateConventionSubvention(conventionDataMock)
    expect(data).toBeInstanceOf(Buffer)
    writeFileSync(outputName('fne-convention_with-formation'), data)
  })
})
