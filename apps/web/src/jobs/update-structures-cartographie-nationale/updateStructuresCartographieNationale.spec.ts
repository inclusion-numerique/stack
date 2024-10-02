import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique'
import {
  ChangesToApply,
  updateStructures,
} from './updateStructuresCartographieNationale'

const COMMON_STRUCTURE_FIELDS = {
  adresse: '12 Rue Louise Leclercq',
  code_postal: '62100',
  commune: 'Calais',
  date_maj: '2024-04-02',
  nom: 'Anonymal',
  pivot: '43493312300029',
}

const COOP_NUMERIQUE_STRUCTURE_A_ID = '0812cbc6-49ab-48a8-b331-bc58a8351f25'
const COOP_NUMERIQUE_STRUCTURE_B_ID = '0478a966-490a-fb44-329d-36aafa83cb42'

const COOP_NUMERIQUE_STRUCTURE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: `Coop-numérique_${COOP_NUMERIQUE_STRUCTURE_A_ID}`,
  source: 'coop-numerique',
}

const MERGED_INTERNAL_STRUCTURE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: `Coop-numérique_${COOP_NUMERIQUE_STRUCTURE_A_ID}__Coop-numérique_${COOP_NUMERIQUE_STRUCTURE_B_ID}`,
  source: 'coop-numerique',
}

const CONSEILLER_NUMERIQUE_STRUCTURE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Conseiller-Numerique_65eec075991038075ed174b5',
  source: 'Conseiller Numérique',
}

const CONSEILLER_NUMERIQUE_STRUCTURE_HASH =
  '9bc48dfac97087cd0bdba7207cd521262c7664b30d64ec6f2759463c28df07ab'

const CONSEILLER_NUMERIQUE_STRUCTURE_UPDATED = {
  ...CONSEILLER_NUMERIQUE_STRUCTURE,
  adresse: '12 bis Rue Louise Leclercq',
}

const CONSEILLER_NUMERIQUE_STRUCTURE_UPDATED_HASH =
  'c52eafd20b79cf82330e083284633d7b9a0fcf9bbbac313e87da3b4cdf84f0c2'

const HINAURA_STRUCTURE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Hinaura_FablabVichyCommunaute3',
  source: 'Hinaura',
}

const HINAURA_STRUCTURE_HASH =
  '9f2630f7a23d662d473108f34f743f489ec5a9884afc943b85bd0162828979ec'

const AIDANTS_CONNECT_STRUCTURE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Aidants-Connect_0b05bd0c-09e5-404f-a4e4-56eadfc7e5da',
  source: 'Aidants Connect',
}

const AIDANTS_CONNECT_STRUCTURE_HASH =
  'd903f16c769d4e1ce1305aa47f047c93e61f27322e2e5003960387aaaa74f84d'

const MERGED_EXTERNAL_STRUCTURE = {
  ...CONSEILLER_NUMERIQUE_STRUCTURE,
  id: `${CONSEILLER_NUMERIQUE_STRUCTURE.id}__${HINAURA_STRUCTURE.id}`,
}

const MERGED_EXTERNAL_STRUCTURE_HASH =
  '0680f658bfeaf3edca4605e1402274d3ba09e5a11215468e5e3137e0323627df'

const MERGED_EXTERNAL_STRUCTURE_UPDATED = {
  ...MERGED_EXTERNAL_STRUCTURE,
  adresse: '12 bis Rue Louise Leclercq',
}

const MERGED_EXTERNAL_STRUCTURE_UPDATED_HASH =
  '66584be1d72aab96519022d984a43a433b2f95e57af7f3a4c4736a60d2cd5223'

const MERGED_TWICE_EXTERNAL_STRUCTURE = {
  ...AIDANTS_CONNECT_STRUCTURE,
  id: `${CONSEILLER_NUMERIQUE_STRUCTURE.id}__${HINAURA_STRUCTURE.id}__${AIDANTS_CONNECT_STRUCTURE.id}`,
}

const MERGED_TWICE_EXTERNAL_STRUCTURE_HASH =
  '6b3c49d0b2087792c14889e1ccda31277521e32a3ccd926330aaef52692fee31'

const EMPTY_EXISTING_STRUCTURES: SchemaLieuMediationNumerique[] = []

describe('update structures cartographie nationale', () => {
  describe('with single structure from external source', () => {
    it('plans to insert new structure', () => {
      const structuresImportedFromCartographie = [
        CONSEILLER_NUMERIQUE_STRUCTURE,
      ]

      const changesToApply = updateStructures(
        EMPTY_EXISTING_STRUCTURES,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            CONSEILLER_NUMERIQUE_STRUCTURE.id,
            {
              ...CONSEILLER_NUMERIQUE_STRUCTURE,
              hash: CONSEILLER_NUMERIQUE_STRUCTURE_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('disregards already existing structure that has not been updated', () => {
      const existingStructures = [CONSEILLER_NUMERIQUE_STRUCTURE]
      const structuresImportedFromCartographie = [
        CONSEILLER_NUMERIQUE_STRUCTURE,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('plans to update an already existing structure that has been updated', () => {
      const existingStructures = [CONSEILLER_NUMERIQUE_STRUCTURE]
      const structuresImportedFromCartographie = [
        CONSEILLER_NUMERIQUE_STRUCTURE_UPDATED,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            CONSEILLER_NUMERIQUE_STRUCTURE.id,
            {
              ...CONSEILLER_NUMERIQUE_STRUCTURE_UPDATED,
              hash: CONSEILLER_NUMERIQUE_STRUCTURE_UPDATED_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('plans to remove deleted structure', () => {
      const existingStructures = [CONSEILLER_NUMERIQUE_STRUCTURE]

      const changesToApply = updateStructures(existingStructures, [])

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map(),
        structuresCartographieNationaleToDelete: [
          { id: CONSEILLER_NUMERIQUE_STRUCTURE.id },
        ],
        structuresToMerge: [],
      })
    })
  })

  describe('with multiple structures from external source', () => {
    it('plans to insert new merged structure without existing partial structure', () => {
      const structuresImportedFromCartographie = [MERGED_EXTERNAL_STRUCTURE]

      const changesToApply = updateStructures(
        EMPTY_EXISTING_STRUCTURES,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            MERGED_EXTERNAL_STRUCTURE.id,
            {
              ...MERGED_EXTERNAL_STRUCTURE,
              hash: MERGED_EXTERNAL_STRUCTURE_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('disregards already existing structure that has not been updated', () => {
      const existingStructures = [MERGED_EXTERNAL_STRUCTURE]
      const structuresImportedFromCartographie = [MERGED_EXTERNAL_STRUCTURE]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('plans to update already existing updated merged structure', () => {
      const existingStructures = [MERGED_EXTERNAL_STRUCTURE]
      const structuresImportedFromCartographie = [
        MERGED_EXTERNAL_STRUCTURE_UPDATED,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            MERGED_EXTERNAL_STRUCTURE_UPDATED.id,
            {
              ...MERGED_EXTERNAL_STRUCTURE_UPDATED,
              hash: MERGED_EXTERNAL_STRUCTURE_UPDATED_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('plans to insert new merged structure and remove previous partial structures', () => {
      const existingStructures = [
        CONSEILLER_NUMERIQUE_STRUCTURE,
        HINAURA_STRUCTURE,
      ]

      const structuresImportedFromCartographie = [MERGED_EXTERNAL_STRUCTURE]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            MERGED_EXTERNAL_STRUCTURE.id,
            {
              ...MERGED_EXTERNAL_STRUCTURE,
              hash: MERGED_EXTERNAL_STRUCTURE_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [
          {
            id: CONSEILLER_NUMERIQUE_STRUCTURE.id,
            replaceById: MERGED_EXTERNAL_STRUCTURE.id,
          },
          {
            id: HINAURA_STRUCTURE.id,
            replaceById: MERGED_EXTERNAL_STRUCTURE.id,
          },
        ],
        structuresToMerge: [],
      })
    })

    it('plans to only delete merged structure when all partial structures has been deleted', () => {
      const existingStructures = [MERGED_EXTERNAL_STRUCTURE]

      const changesToApply = updateStructures(existingStructures, [])

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map(),
        structuresCartographieNationaleToDelete: [
          { id: MERGED_EXTERNAL_STRUCTURE.id },
        ],
        structuresToMerge: [],
      })
    })

    it('plans to only delete merged structure reinsert partial structure and change structure ref id when there is at least one remaining partial structure', () => {
      const existingStructures = [MERGED_EXTERNAL_STRUCTURE]
      const structuresImportedFromCartographie = [HINAURA_STRUCTURE]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            HINAURA_STRUCTURE.id,
            { ...HINAURA_STRUCTURE, hash: HINAURA_STRUCTURE_HASH },
          ],
        ]),
        structuresCartographieNationaleToDelete: [
          {
            id: MERGED_EXTERNAL_STRUCTURE.id,
            replaceById: HINAURA_STRUCTURE.id,
          },
        ],
        structuresToMerge: [],
      })
    })

    it('plans to insert merged twice structure, remove merged structure and replace deleted structure id by merged twice structure id', () => {
      const existingStructures = [MERGED_EXTERNAL_STRUCTURE]
      const structuresImportedFromCartographie = [
        MERGED_TWICE_EXTERNAL_STRUCTURE,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            MERGED_TWICE_EXTERNAL_STRUCTURE.id,
            {
              ...MERGED_TWICE_EXTERNAL_STRUCTURE,
              hash: MERGED_TWICE_EXTERNAL_STRUCTURE_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [
          {
            id: MERGED_EXTERNAL_STRUCTURE.id,
            replaceById: MERGED_TWICE_EXTERNAL_STRUCTURE.id,
          },
        ],
        structuresToMerge: [],
      })
    })

    it('plans to insert merged twice structure, remove merged structure and partial structure and replace deleted structures ids by merged twice structure id', () => {
      const existingStructures = [
        MERGED_EXTERNAL_STRUCTURE,
        AIDANTS_CONNECT_STRUCTURE,
      ]
      const structuresImportedFromCartographie = [
        MERGED_TWICE_EXTERNAL_STRUCTURE,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            MERGED_TWICE_EXTERNAL_STRUCTURE.id,
            {
              ...MERGED_TWICE_EXTERNAL_STRUCTURE,
              hash: MERGED_TWICE_EXTERNAL_STRUCTURE_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [
          {
            id: MERGED_EXTERNAL_STRUCTURE.id,
            replaceById: MERGED_TWICE_EXTERNAL_STRUCTURE.id,
          },
          {
            id: AIDANTS_CONNECT_STRUCTURE.id,
            replaceById: MERGED_TWICE_EXTERNAL_STRUCTURE.id,
          },
        ],
        structuresToMerge: [],
      })
    })

    it('plans to remove twice merge structure, insert merged and partials structures and replace merged structure id with merged structure id', () => {
      const existingStructures = [MERGED_TWICE_EXTERNAL_STRUCTURE]
      const structuresImportedFromCartographie = [
        AIDANTS_CONNECT_STRUCTURE,
        MERGED_EXTERNAL_STRUCTURE,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            MERGED_EXTERNAL_STRUCTURE.id,
            {
              ...MERGED_EXTERNAL_STRUCTURE,
              hash: MERGED_EXTERNAL_STRUCTURE_HASH,
            },
          ],
          [
            AIDANTS_CONNECT_STRUCTURE.id,
            {
              ...AIDANTS_CONNECT_STRUCTURE,
              hash: AIDANTS_CONNECT_STRUCTURE_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [
          {
            id: MERGED_TWICE_EXTERNAL_STRUCTURE.id,
            replaceById: MERGED_EXTERNAL_STRUCTURE.id,
          },
        ],
        structuresToMerge: [],
      })
    })

    it('plans to remove twice merge structure, insert partials structures and replace merged structure id with first partial structure id', () => {
      const existingStructures = [MERGED_TWICE_EXTERNAL_STRUCTURE]
      const structuresImportedFromCartographie = [
        CONSEILLER_NUMERIQUE_STRUCTURE,
        HINAURA_STRUCTURE,
        AIDANTS_CONNECT_STRUCTURE,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            CONSEILLER_NUMERIQUE_STRUCTURE.id,
            {
              ...CONSEILLER_NUMERIQUE_STRUCTURE,
              hash: CONSEILLER_NUMERIQUE_STRUCTURE_HASH,
            },
          ],
          [
            HINAURA_STRUCTURE.id,
            {
              ...HINAURA_STRUCTURE,
              hash: HINAURA_STRUCTURE_HASH,
            },
          ],
          [
            AIDANTS_CONNECT_STRUCTURE.id,
            {
              ...AIDANTS_CONNECT_STRUCTURE,
              hash: AIDANTS_CONNECT_STRUCTURE_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [
          {
            id: MERGED_TWICE_EXTERNAL_STRUCTURE.id,
            replaceById: CONSEILLER_NUMERIQUE_STRUCTURE.id,
          },
        ],
        structuresToMerge: [],
      })
    })
  })

  describe('with structure from coop', () => {
    it('disregards single structure', () => {
      const structuresImportedFromCartographie = [COOP_NUMERIQUE_STRUCTURE]

      const changesToApply = updateStructures(
        EMPTY_EXISTING_STRUCTURES,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('disregards single coop structure merged with single structure form an external source', () => {
      const existingStructures = [CONSEILLER_NUMERIQUE_STRUCTURE]
      const structuresImportedFromCartographie = [
        {
          ...COOP_NUMERIQUE_STRUCTURE,
          id: `${CONSEILLER_NUMERIQUE_STRUCTURE.id}__${COOP_NUMERIQUE_STRUCTURE.id}`,
        },
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('plans to update structure without coop id when single coop structure is merged with single structure form an external source that contains latest changes', () => {
      const existingStructures = [CONSEILLER_NUMERIQUE_STRUCTURE]
      const structuresImportedFromCartographie = [
        {
          ...CONSEILLER_NUMERIQUE_STRUCTURE,
          id: `${CONSEILLER_NUMERIQUE_STRUCTURE.id}__${COOP_NUMERIQUE_STRUCTURE.id}`,
          adresse: '12 bis Rue Louise Leclercq',
        },
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            CONSEILLER_NUMERIQUE_STRUCTURE_UPDATED.id,
            {
              ...CONSEILLER_NUMERIQUE_STRUCTURE_UPDATED,
              hash: CONSEILLER_NUMERIQUE_STRUCTURE_UPDATED_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('disregards single coop structure merged with many structure form an external source', () => {
      const existingStructures = [
        CONSEILLER_NUMERIQUE_STRUCTURE,
        HINAURA_STRUCTURE,
      ]
      const structuresImportedFromCartographie = [
        {
          ...COOP_NUMERIQUE_STRUCTURE,
          id: `${CONSEILLER_NUMERIQUE_STRUCTURE.id}__${HINAURA_STRUCTURE.id}__${COOP_NUMERIQUE_STRUCTURE.id}`,
        },
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('plans to update structure without coop id when single coop structure is merged with multiple structures form an external source that contains latest changes', () => {
      const existingStructures = [
        CONSEILLER_NUMERIQUE_STRUCTURE,
        HINAURA_STRUCTURE,
      ]
      const structuresImportedFromCartographie = [
        {
          ...CONSEILLER_NUMERIQUE_STRUCTURE_UPDATED,
          id: `${CONSEILLER_NUMERIQUE_STRUCTURE.id}__${HINAURA_STRUCTURE.id}__${COOP_NUMERIQUE_STRUCTURE.id}`,
        },
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            MERGED_EXTERNAL_STRUCTURE_UPDATED.id,
            {
              ...MERGED_EXTERNAL_STRUCTURE_UPDATED,
              hash: MERGED_EXTERNAL_STRUCTURE_UPDATED_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [
          {
            id: CONSEILLER_NUMERIQUE_STRUCTURE.id,
            replaceById: MERGED_EXTERNAL_STRUCTURE_UPDATED.id,
          },
          {
            id: HINAURA_STRUCTURE.id,
            replaceById: MERGED_EXTERNAL_STRUCTURE_UPDATED.id,
          },
        ],
        structuresToMerge: [],
      })
    })

    it('plans to remove merge structure, insert merged and partials structures and replace merged structure id with merged structure id', () => {
      const existingStructures = [MERGED_EXTERNAL_STRUCTURE_UPDATED]
      const structuresImportedFromCartographie = [
        COOP_NUMERIQUE_STRUCTURE,
        CONSEILLER_NUMERIQUE_STRUCTURE,
        HINAURA_STRUCTURE,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            CONSEILLER_NUMERIQUE_STRUCTURE.id,
            {
              ...CONSEILLER_NUMERIQUE_STRUCTURE,
              hash: CONSEILLER_NUMERIQUE_STRUCTURE_HASH,
            },
          ],
          [
            HINAURA_STRUCTURE.id,
            {
              ...HINAURA_STRUCTURE,
              hash: HINAURA_STRUCTURE_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [
          {
            id: MERGED_EXTERNAL_STRUCTURE_UPDATED.id,
            replaceById: CONSEILLER_NUMERIQUE_STRUCTURE.id,
          },
        ],
        structuresToMerge: [],
      })
    })

    it('plans to merge structures with duplicate ids coming from coop', () => {
      const structuresImportedFromCartographie = [MERGED_INTERNAL_STRUCTURE]

      const changesToApply = updateStructures(
        EMPTY_EXISTING_STRUCTURES,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [
          {
            ids: [COOP_NUMERIQUE_STRUCTURE_A_ID, COOP_NUMERIQUE_STRUCTURE_B_ID],
            mergedStructure: MERGED_INTERNAL_STRUCTURE,
          },
        ],
      })
    })

    it('plans to merge structures with duplicate ids coming from coop and disregards other structures when there is multiple outdated structures from external sources', () => {
      const existingStructures = [
        CONSEILLER_NUMERIQUE_STRUCTURE,
        HINAURA_STRUCTURE,
      ]
      const structuresImportedFromCartographie = [
        {
          ...MERGED_INTERNAL_STRUCTURE,
          id: `${MERGED_INTERNAL_STRUCTURE.id}__${MERGED_EXTERNAL_STRUCTURE.id}`,
        },
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [
          {
            ids: [COOP_NUMERIQUE_STRUCTURE_A_ID, COOP_NUMERIQUE_STRUCTURE_B_ID],
            mergedStructure: MERGED_INTERNAL_STRUCTURE,
          },
        ],
      })
    })

    it('plans to merge structures with duplicate ids coming from coop and to insert merged structures from external source that contains latest changes', () => {
      const existingStructures = [
        CONSEILLER_NUMERIQUE_STRUCTURE,
        HINAURA_STRUCTURE,
      ]
      const structuresImportedFromCartographie = [
        {
          ...MERGED_EXTERNAL_STRUCTURE,
          id: `${MERGED_INTERNAL_STRUCTURE.id}__${MERGED_EXTERNAL_STRUCTURE.id}`,
        },
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToUpsert: new Map([
          [
            MERGED_EXTERNAL_STRUCTURE.id,
            {
              ...MERGED_EXTERNAL_STRUCTURE,
              hash: MERGED_EXTERNAL_STRUCTURE_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [
          {
            id: CONSEILLER_NUMERIQUE_STRUCTURE.id,
            replaceById: MERGED_EXTERNAL_STRUCTURE.id,
          },
          {
            id: HINAURA_STRUCTURE.id,
            replaceById: MERGED_EXTERNAL_STRUCTURE.id,
          },
        ],
        structuresToMerge: [
          {
            ids: [COOP_NUMERIQUE_STRUCTURE_A_ID, COOP_NUMERIQUE_STRUCTURE_B_ID],
            mergedStructure: {
              ...MERGED_EXTERNAL_STRUCTURE,
              id: MERGED_INTERNAL_STRUCTURE.id,
            },
          },
        ],
      })
    })
  })
})
