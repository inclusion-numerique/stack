import { getOrCreateStructureEmployeuse } from '@app/web/server/rpc/inscription/getOrCreateStructureEmployeuse'
import { prismaClient } from '@app/web/prismaClient'

describe('getOrCreateStructureEmployeuse', () => {
  const testSiret = '93429789600011'

  beforeAll(async () => {
    await prismaClient.structure.deleteMany({
      where: {
        siret: testSiret,
      },
    })

    // Verify the cleanup was successful
    const result = await prismaClient.structure.findFirst({
      where: {
        siret: testSiret,
      },
    })
    if (result) {
      throw new Error(
        'Structure should have been deleted in beforeAll jest hook',
      )
    }
  })

  it('should create a structure employeuse for a [Non-Diffusible] siret and be idempotent', async () => {
    const input = {
      nom: '[Non-Diffusible]',
      adresse: '[Non-Diffusible]',
      commune: 'Villeurbanne',
      codeInsee: '69266',
      typologies: undefined,
      siret: testSiret,
    }
    const result = await getOrCreateStructureEmployeuse(input)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }))
    const { id } = result

    const result2 = await getOrCreateStructureEmployeuse(input)

    expect(result2).toEqual(expect.objectContaining({ id }))

    const count = await prismaClient.structure.count({
      where: {
        siret: testSiret,
      },
    })

    expect(count).toEqual(1)
  })
})
