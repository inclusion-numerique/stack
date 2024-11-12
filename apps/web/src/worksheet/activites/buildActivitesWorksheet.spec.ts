import {
  buildActivitesWorksheet,
  BuildActivitesWorksheetInput,
} from './buildActivitesWorksheet'

describe('buildActivitesWorksheet', () => {
  let mockInput: BuildActivitesWorksheetInput

  beforeEach(() => {
    mockInput = {
      user: {
        firstName: 'John',
        lastName: 'Doe',
        role: 'Admin',
        id: '1',
        coordinateur: {
          id: '1',
          conseillerNumeriqueId: '2',
          mediateursCoordonnes: [],
        },
        mediateur: {
          id: '1',
          conseillerNumerique: { id: '3' },
        },
      },
      mediateur: {
        firstName: 'Jane',
        lastName: 'Doe',
        role: 'User',
        id: '2',
        mediateur: {
          id: '2',
          conseillerNumerique: { id: '4' },
        },
        coordinateur: null,
      },
      filters: {
        du: '01/01/2023',
        au: '31/01/2023',
        periode: null, // unused in worksheet
        typeLieu: 'Commune',
        nomLieu: 'Lyon',
        lieu: null, // unused in worksheet
        type: 'Accompagnement',
        beneficiaire: 'Beneficiaire Name',
        mediateur: null,
      },
      activites: [], // empty activities for now
    } satisfies BuildActivitesWorksheetInput
  })

  it('should create a workbook with correct structure', () => {
    const workbook = buildActivitesWorksheet(mockInput)
    const worksheet = workbook.getWorksheet('Activités')

    expect(worksheet).toBeDefined()
    expect(worksheet).not.toBeNull()
    if (!worksheet) return

    // Check if the worksheet contains "Informations export" title
    const exportTitleCell = worksheet.getCell('A1')
    expect(exportTitleCell.value).toBe('Informations export')
    expect(exportTitleCell.font?.bold).toBe(true)

    // Check if the worksheet contains "Nom: John" in the first section
    const nomCell = worksheet.getCell('A2')
    const nomValueCell = worksheet.getCell('B2')
    expect(nomCell.value).toBe('Nom')
    expect(nomValueCell.value).toBe('Doe')

    // Check if "Filtres" section is present
    const filtersTitleCell = worksheet.getCell('A9')
    expect(filtersTitleCell.value).toBe('Filtres')
    expect(filtersTitleCell.font?.bold).toBe(true)

    // Check a specific filter, e.g., "Type de lieu: Commune"
    const filterTypeLieuCell = worksheet.getCell('A12')
    const filterTypeLieuValueCell = worksheet.getCell('B12')
    expect(filterTypeLieuCell.value).toBe('Type de lieu')
    expect(filterTypeLieuValueCell.value).toBe('Commune')
  })

  it('should include the mediateur if different from user', () => {
    // The default mockInput as a mediateur different from the user
    const workbook = buildActivitesWorksheet(mockInput)
    const rows = workbook.getWorksheet('Activités')?.getRows(1, 20)
    if (!rows) {
      throw new Error('Worksheet or rows not found')
    }
    // Ensure there is no mediateur row in the worksheet
    const mediateurRow = rows.find(
      (row) => row.getCell(1).value === 'Médiateur',
    )

    // Check if the worksheet contains the "Médiateur" row
    const mediateurValueCell = mediateurRow?.getCell(2)

    expect(mediateurValueCell?.value).toBe('Jane Doe')
  })

  it('should not include the mediateur if the mediateur is the same as the user', () => {
    mockInput.mediateur = mockInput.user // Make mediateur the same as the user
    const workbook = buildActivitesWorksheet(mockInput)
    const rows = workbook.getWorksheet('Activités')?.getRows(1, 20)
    if (!rows) {
      throw new Error('Worksheet or rows not found')
    }
    // Ensure there is no mediateur row in the worksheet
    const mediateurRow = rows.find(
      (row) => row.getCell(1).value === 'Médiateur',
    )
    expect(mediateurRow).toBeUndefined()
  })
})
