import {
  allocatePercentages,
  allocatePercentagesFromRecords,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/allocatePercentages'

describe('allocatePercentages', () => {
  it('should allocate percentages correctly for an array of numbers', () => {
    const values = [1, 2, 3, 4]
    const result = allocatePercentages(values)
    expect(result).toEqual([10, 20, 30, 40]) // Exact fractions that sum to 100
  })

  it('should return an array of 0 when all values are 0', () => {
    const values = [0, 0, 0]
    const result = allocatePercentages(values)
    expect(result).toEqual([0, 0, 0])
  })

  it('should handle an array with one value correctly', () => {
    const values = [50]
    const result = allocatePercentages(values)
    expect(result).toEqual([100])
  })

  it('should handle cases where the numbers map to exact percentages like 25, 50, etc.', () => {
    const values = [2, 2, 4]
    const result = allocatePercentages(values)
    expect(result).toEqual([25, 25, 50]) // Values add up perfectly to 100%
  })
})

describe('allocatePercentagesFromRecords', () => {
  it('should allocate percentages based on a key in objects and add a new key with percentages', () => {
    const values = [
      { name: 'A', count: 1 },
      { name: 'B', count: 3 },
      { name: 'C', count: 4 },
    ]

    const result = allocatePercentagesFromRecords(values, 'count', 'proportion')
    expect(result).toEqual([
      { name: 'A', count: 1, proportion: 12.5 },
      { name: 'B', count: 3, proportion: 37.5 },
      { name: 'C', count: 4, proportion: 50 },
    ])
  })

  it('should handle null values by treating them as 0', () => {
    const values = [
      { name: 'A', count: 1 },
      { name: 'B', count: null },
      { name: 'C', count: 3 },
    ]

    const result = allocatePercentagesFromRecords(values, 'count', 'proportion')
    expect(result).toEqual([
      { name: 'A', count: 1, proportion: 25 },
      { name: 'B', count: null, proportion: 0 },
      { name: 'C', count: 3, proportion: 75 },
    ])
  })

  it('should return 0% for all when the total sum is 0', () => {
    const values = [
      { name: 'A', count: 0 },
      { name: 'B', count: 0 },
      { name: 'C', count: 0 },
    ]

    const result = allocatePercentagesFromRecords(values, 'count', 'proportion')
    expect(result).toEqual([
      { name: 'A', count: 0, proportion: 0 },
      { name: 'B', count: 0, proportion: 0 },
      { name: 'C', count: 0, proportion: 0 },
    ])
  })

  it('should work with a custom count key and proportion key', () => {
    const values = [
      { name: 'A', value: 1 },
      { name: 'B', value: 1 },
      { name: 'C', value: 2 },
    ]

    const result = allocatePercentagesFromRecords(values, 'value', 'percentage')
    expect(result).toEqual([
      { name: 'A', value: 1, percentage: 25 },
      { name: 'B', value: 1, percentage: 25 },
      { name: 'C', value: 2, percentage: 50 },
    ])
  })
})
