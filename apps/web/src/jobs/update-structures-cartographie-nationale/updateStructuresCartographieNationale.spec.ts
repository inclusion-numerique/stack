import {
  ChangesToApply,
  ExistingStructure,
} from './update-structures-actions/common'
import { updateStructures } from './updateStructuresCartographieNationale'

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
  source: 'Coop numérique',
}

const MERGED_INTERNAL_STRUCTURE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: `Coop-numérique_${COOP_NUMERIQUE_STRUCTURE_A_ID}__Coop-numérique_${COOP_NUMERIQUE_STRUCTURE_B_ID}`,
  source: 'Coop numérique',
}

const CONSEILLER_NUMERIQUE_STRUCTURE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Conseiller-Numerique_65eec075991038075ed174b5',
  source: 'Conseiller Numérique',
}

const CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT = {
  id: CONSEILLER_NUMERIQUE_STRUCTURE.id,
  hash: '9bc48dfac97087cd0bdba7207cd521262c7664b30d64ec6f2759463c28df07ab',
}

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

const HINAURA_STRUCTURE_FINGERPRINT = {
  id: HINAURA_STRUCTURE.id,
  hash: '9f2630f7a23d662d473108f34f743f489ec5a9884afc943b85bd0162828979ec',
}

const AIDANTS_CONNECT_STRUCTURE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Aidants-Connect_0b05bd0c-09e5-404f-a4e4-56eadfc7e5da',
  source: 'Aidants Connect',
}

const AIDANTS_CONNECT_STRUCTURE_FINGERPRINT = {
  id: AIDANTS_CONNECT_STRUCTURE.id,
  hash: 'd903f16c769d4e1ce1305aa47f047c93e61f27322e2e5003960387aaaa74f84d',
}
const MERGED_EXTERNAL_STRUCTURE = {
  ...CONSEILLER_NUMERIQUE_STRUCTURE,
  id: `${CONSEILLER_NUMERIQUE_STRUCTURE.id}__${HINAURA_STRUCTURE.id}`,
}

const MERGED_EXTERNAL_STRUCTURE_FINGERPRINT = {
  id: MERGED_EXTERNAL_STRUCTURE.id,
  hash: '0680f658bfeaf3edca4605e1402274d3ba09e5a11215468e5e3137e0323627df',
}

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

const MERGED_TWICE_EXTERNAL_STRUCTURE_FINGERPRINT = {
  id: MERGED_TWICE_EXTERNAL_STRUCTURE.id,
  hash: '6b3c49d0b2087792c14889e1ccda31277521e32a3ccd926330aaef52692fee31',
}

const EMPTY_EXISTING_STRUCTURES: ExistingStructure[] = []

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
        structuresCartographieNationaleToInsert: new Map([
          [
            CONSEILLER_NUMERIQUE_STRUCTURE.id,
            {
              ...CONSEILLER_NUMERIQUE_STRUCTURE,
              ...CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT,
            },
          ],
        ]),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('plans to insert multiple new structures', () => {
      const STRUCTURE_1 = {
        id: 'Conseiller-Numerique_62c2b5893e465606de19c422',
        nom: 'ASSOCIATION DU GRAND CANET',
        pivot: '83809964600013',
        commune: 'Marseille',
        code_postal: '13014',
        adresse: '1 Place des etats unis',
        source: 'Conseiller Numerique',
        date_maj: '2022-07-04',
      }

      const STRUCTURE_2 = {
        id: 'Aidants-Connect_37c2d924-7f7f-401e-ab3f-8368fb06c39b__Les-Assembleurs_1528',
        nom: 'Centre Social Eclaté',
        pivot: '00000000000000',
        commune: 'Saint-Martin-Boulogne',
        code_postal: '62280',
        adresse: '6/8 Résidence Descartes',
        source: 'Les Assembleurs',
        date_maj: '2021-06-23',
      }

      const STRUCTURE_3 = {
        id: 'Conseiller-Numerique_66431a3e531d5c075e8c9907',
        nom: 'Maison de l’Accès Aux Droits',
        pivot: '00000000000000',
        commune: 'Arpajon',
        code_postal: '91290',
        adresse: '4 RUE DU DOCTEUR VERDIE',
        source: 'Conseiller Numerique',
        date_maj: '2024-05-14',
      }

      const STRUCTURE_4 = {
        id: 'Aidants-Connect_5325296e-6318-40b3-8e5f-9b6689f03948__Conseiller-Numerique_62bb6a3edd51e705b180bb22',
        nom: 'MAIRIE DU PRÊCHEUR',
        pivot: '21972219600017',
        commune: 'Le Prêcheur',
        code_postal: '97250',
        adresse: 'BOURG',
        source: 'Conseiller Numerique',
        date_maj: '2022-06-28',
      }

      const structuresImportedFromCartographie = [
        STRUCTURE_1,
        STRUCTURE_2,
        STRUCTURE_3,
        STRUCTURE_4,
      ]

      const existingStructures = [
        {
          id: STRUCTURE_1.id,
          hash: 'd2c11ea04f12f112b1c489a6607a639382af624df038e5c0a7e09ceca36ca3d1',
        },
        {
          id: STRUCTURE_2.id,
          hash: '459e77b0315eeee2ebdaeb21abb22cca47ed2deb225fda463691a53ed436999d',
        },
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map([
          [
            'Aidants-Connect_5325296e-6318-40b3-8e5f-9b6689f03948__Conseiller-Numerique_62bb6a3edd51e705b180bb22',
            {
              ...STRUCTURE_4,
              hash: '4d76cb7f0a2125adf07b5ca7e19b1377144b817be052e336d6a6338e05b44d4a',
            },
          ],
          [
            'Conseiller-Numerique_66431a3e531d5c075e8c9907',
            {
              ...STRUCTURE_3,
              hash: '69051486d3412517ec517bc86d65ccf3f85492b3bd4b5f4b8a2793da03504d9f',
            },
          ],
        ]),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('disregards already existing structure that has not been updated', () => {
      const existingStructures = [CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT]
      const structuresImportedFromCartographie = [
        CONSEILLER_NUMERIQUE_STRUCTURE,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('plans to update an already existing structure that has been updated', () => {
      const existingStructures = [CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT]

      const structuresImportedFromCartographie = [
        CONSEILLER_NUMERIQUE_STRUCTURE_UPDATED,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map([
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
      const existingStructures = [CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT]
      const changesToApply = updateStructures(existingStructures, [])

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map(),
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
        structuresCartographieNationaleToInsert: new Map([
          [
            MERGED_EXTERNAL_STRUCTURE.id,
            {
              ...MERGED_EXTERNAL_STRUCTURE,
              ...MERGED_EXTERNAL_STRUCTURE_FINGERPRINT,
            },
          ],
        ]),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('disregards already existing structure that has not been updated', () => {
      const existingStructures = [MERGED_EXTERNAL_STRUCTURE_FINGERPRINT]
      const structuresImportedFromCartographie = [MERGED_EXTERNAL_STRUCTURE]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('plans to update already existing updated merged structure', () => {
      const existingStructures = [MERGED_EXTERNAL_STRUCTURE_FINGERPRINT]
      const structuresImportedFromCartographie = [
        MERGED_EXTERNAL_STRUCTURE_UPDATED,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map([
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
        CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT,
        HINAURA_STRUCTURE_FINGERPRINT,
      ]

      const structuresImportedFromCartographie = [MERGED_EXTERNAL_STRUCTURE]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map([
          [
            MERGED_EXTERNAL_STRUCTURE.id,
            {
              ...MERGED_EXTERNAL_STRUCTURE,
              ...MERGED_EXTERNAL_STRUCTURE_FINGERPRINT,
            },
          ],
        ]),
        structuresCartographieNationaleToUpdate: new Map(),
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
      const existingStructures = [MERGED_EXTERNAL_STRUCTURE_FINGERPRINT]

      const changesToApply = updateStructures(existingStructures, [])

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [
          { id: MERGED_EXTERNAL_STRUCTURE.id },
        ],
        structuresToMerge: [],
      })
    })

    it('plans to only delete merged structure reinsert partial structure and change structure ref id when there is at least one remaining partial structure', () => {
      const existingStructures = [MERGED_EXTERNAL_STRUCTURE_FINGERPRINT]
      const structuresImportedFromCartographie = [HINAURA_STRUCTURE]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map([
          [
            HINAURA_STRUCTURE.id,
            { ...HINAURA_STRUCTURE, ...HINAURA_STRUCTURE_FINGERPRINT },
          ],
        ]),
        structuresCartographieNationaleToDelete: [
          {
            id: MERGED_EXTERNAL_STRUCTURE.id,
            replaceById: HINAURA_STRUCTURE.id,
          },
        ],
        structuresCartographieNationaleToUpdate: new Map(),
        structuresToMerge: [],
      })
    })

    it('plans to insert merged twice structure, remove merged structure and replace deleted structure id by merged twice structure id', () => {
      const existingStructures = [MERGED_EXTERNAL_STRUCTURE_FINGERPRINT]
      const structuresImportedFromCartographie = [
        MERGED_TWICE_EXTERNAL_STRUCTURE,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map([
          [
            MERGED_TWICE_EXTERNAL_STRUCTURE.id,
            {
              ...MERGED_TWICE_EXTERNAL_STRUCTURE,
              ...MERGED_TWICE_EXTERNAL_STRUCTURE_FINGERPRINT,
            },
          ],
        ]),
        structuresCartographieNationaleToUpdate: new Map(),
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
        MERGED_EXTERNAL_STRUCTURE_FINGERPRINT,
        AIDANTS_CONNECT_STRUCTURE_FINGERPRINT,
      ]
      const structuresImportedFromCartographie = [
        MERGED_TWICE_EXTERNAL_STRUCTURE,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map([
          [
            MERGED_TWICE_EXTERNAL_STRUCTURE.id,
            {
              ...MERGED_TWICE_EXTERNAL_STRUCTURE,
              ...MERGED_TWICE_EXTERNAL_STRUCTURE_FINGERPRINT,
            },
          ],
        ]),
        structuresCartographieNationaleToUpdate: new Map(),
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
      const existingStructures = [MERGED_TWICE_EXTERNAL_STRUCTURE_FINGERPRINT]
      const structuresImportedFromCartographie = [
        AIDANTS_CONNECT_STRUCTURE,
        MERGED_EXTERNAL_STRUCTURE,
      ]

      const changesToApply = updateStructures(
        existingStructures,
        structuresImportedFromCartographie,
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map([
          [
            MERGED_EXTERNAL_STRUCTURE.id,
            {
              ...MERGED_EXTERNAL_STRUCTURE,
              ...MERGED_EXTERNAL_STRUCTURE_FINGERPRINT,
            },
          ],
          [
            AIDANTS_CONNECT_STRUCTURE.id,
            {
              ...AIDANTS_CONNECT_STRUCTURE,
              ...AIDANTS_CONNECT_STRUCTURE_FINGERPRINT,
            },
          ],
        ]),
        structuresCartographieNationaleToUpdate: new Map(),
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
      const existingStructures = [MERGED_TWICE_EXTERNAL_STRUCTURE_FINGERPRINT]
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
        structuresCartographieNationaleToInsert: new Map([
          [
            CONSEILLER_NUMERIQUE_STRUCTURE.id,
            {
              ...CONSEILLER_NUMERIQUE_STRUCTURE,
              ...CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT,
            },
          ],
          [
            HINAURA_STRUCTURE.id,
            {
              ...HINAURA_STRUCTURE,
              ...HINAURA_STRUCTURE_FINGERPRINT,
            },
          ],
          [
            AIDANTS_CONNECT_STRUCTURE.id,
            {
              ...AIDANTS_CONNECT_STRUCTURE,
              ...AIDANTS_CONNECT_STRUCTURE_FINGERPRINT,
            },
          ],
        ]),
        structuresCartographieNationaleToUpdate: new Map(),
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
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('disregards single coop structure merged with single structure form an external source', () => {
      const existingStructures = [CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT]
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
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('plans to update structure without coop id when single coop structure is merged with single structure form an external source that contains latest changes', () => {
      const existingStructures = [CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT]
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
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map([
          [
            CONSEILLER_NUMERIQUE_STRUCTURE_UPDATED.id,
            {
              ...CONSEILLER_NUMERIQUE_STRUCTURE_UPDATED,
              hash: 'c52eafd20b79cf82330e083284633d7b9a0fcf9bbbac313e87da3b4cdf84f0c2',
            },
          ],
        ]),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('disregards single coop structure merged with many structure form an external source', () => {
      const existingStructures = [
        CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT,
        HINAURA_STRUCTURE_FINGERPRINT,
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
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('plans to update structure without coop id when single coop structure is merged with multiple structures form an external source that contains latest changes', () => {
      const MERGED_HASH =
        '66584be1d72aab96519022d984a43a433b2f95e57af7f3a4c4736a60d2cd5223'
      const existingStructures = [
        CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT,
        HINAURA_STRUCTURE_FINGERPRINT,
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
        structuresCartographieNationaleToInsert: new Map([
          [
            MERGED_EXTERNAL_STRUCTURE_UPDATED.id,
            { ...MERGED_EXTERNAL_STRUCTURE_UPDATED, hash: MERGED_HASH },
          ],
        ]),
        structuresCartographieNationaleToUpdate: new Map(),
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
      const existingStructures = [MERGED_EXTERNAL_STRUCTURE_FINGERPRINT]
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
        structuresCartographieNationaleToInsert: new Map([
          [
            CONSEILLER_NUMERIQUE_STRUCTURE.id,
            {
              ...CONSEILLER_NUMERIQUE_STRUCTURE,
              ...CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT,
            },
          ],
          [
            HINAURA_STRUCTURE.id,
            {
              ...HINAURA_STRUCTURE,
              ...HINAURA_STRUCTURE_FINGERPRINT,
            },
          ],
        ]),
        structuresCartographieNationaleToUpdate: new Map(),
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
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [
          {
            ids: [COOP_NUMERIQUE_STRUCTURE_A_ID, COOP_NUMERIQUE_STRUCTURE_B_ID],
            mergedStructure: {
              ...MERGED_INTERNAL_STRUCTURE,
              id: '',
            },
          },
        ],
      })
    })

    it('disregards single coop structure merged with many structure form an external source that have already been imported and merged', () => {
      const MERGED_STRUCTURE = {
        id: 'Conseiller-Numerique_65eb31b5991038075ed16ca5__Coop-numérique_a54c324c-b579-45c8-9d2a-962c99aeb1b7__Hinaura_LaboM3',
        nom: 'Mairie Annexe',
        pivot: '81990097800035',
        commune: 'Montélimar',
        code_postal: '26200',
        adresse: '1 Place Leopold Blanc',
        source: 'Coop numérique',
        date_maj: '2024-09-25',
      }

      const changesToApply = updateStructures(
        [
          {
            id: 'Conseiller-Numerique_65eb31b5991038075ed16ca5__Hinaura_LaboM3',
            hash: '110b51519d17b5b7043f4d1c7e90d4511147736cfc1236c48b0a11dbe6bba34f',
          },
        ],
        [MERGED_STRUCTURE],
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [],
      })
    })

    it('disregards update for multiple coop structures merged with many structure form an external source that have already been imported and merged', () => {
      const MERGED_STRUCTURE = {
        id: 'Conseiller-Numerique_65f00c4f991038075ed188b9__Coop-numérique_6ec82e9d-233f-424f-aaa6-ac1eee1dc01e__Coop-numérique_98bcc353-87ea-4d6b-8510-3e9203c9e97d__Hinaura_CampusMontelimarAgglo',
        nom: 'Campus Montélimar Agglo',
        pivot: '20004045900014',
        commune: 'Montélimar',
        code_postal: '26200',
        adresse: '3 Chemin de Nocaze',
        source: 'Coop numérique',
        date_maj: '2024-09-26',
      }

      const changesToApply = updateStructures(
        [
          {
            id: 'Conseiller-Numerique_65f00c4f991038075ed188b9__Hinaura_CampusMontelimarAgglo',
            hash: '9e04ee80b4ce6c340409991c4015b485447d19673dee36deee518b10bcd9f07e',
          },
        ],
        [MERGED_STRUCTURE],
      )

      expect(changesToApply).toStrictEqual<ChangesToApply>({
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [
          {
            ids: [
              '6ec82e9d-233f-424f-aaa6-ac1eee1dc01e',
              '98bcc353-87ea-4d6b-8510-3e9203c9e97d',
            ],
            mergedStructure: {
              adresse: '3 Chemin de Nocaze',
              code_postal: '26200',
              commune: 'Montélimar',
              date_maj: '2024-09-26',
              id: 'Conseiller-Numerique_65f00c4f991038075ed188b9__Hinaura_CampusMontelimarAgglo',
              nom: 'Campus Montélimar Agglo',
              pivot: '20004045900014',
              source: 'Coop numérique',
            },
          },
        ],
      })
    })

    it('plans to merge structures with duplicate ids coming from coop and disregards other structures when there is multiple outdated structures from external sources', () => {
      const existingStructures = [
        CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT,
        HINAURA_STRUCTURE_FINGERPRINT,
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
        structuresCartographieNationaleToInsert: new Map(),
        structuresCartographieNationaleToUpdate: new Map(),
        structuresCartographieNationaleToDelete: [],
        structuresToMerge: [
          {
            ids: [COOP_NUMERIQUE_STRUCTURE_A_ID, COOP_NUMERIQUE_STRUCTURE_B_ID],
            mergedStructure: {
              ...MERGED_INTERNAL_STRUCTURE,
              id: MERGED_EXTERNAL_STRUCTURE.id,
            },
          },
        ],
      })
    })

    it('plans to merge structures with duplicate ids coming from coop and to insert merged structures from external source that contains latest changes', () => {
      const MERGED_HASH =
        '0680f658bfeaf3edca4605e1402274d3ba09e5a11215468e5e3137e0323627df'

      const existingStructures = [
        CONSEILLER_NUMERIQUE_STRUCTURE_FINGERPRINT,
        HINAURA_STRUCTURE_FINGERPRINT,
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
        structuresCartographieNationaleToInsert: new Map([
          [
            MERGED_EXTERNAL_STRUCTURE.id,
            {
              ...MERGED_EXTERNAL_STRUCTURE,
              hash: MERGED_HASH,
            },
          ],
        ]),
        structuresCartographieNationaleToUpdate: new Map(),
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
            mergedStructure: MERGED_EXTERNAL_STRUCTURE,
          },
        ],
      })
    })
  })
})
