import { createReadStream } from 'node:fs'
import csvParser from 'csv-parser'

export const parseCsvFile = async <Row>(
  csvFile: string,
  options?: csvParser.Options | ReadonlyArray<string>,
): Promise<Row[]> =>
  new Promise<Row[]>((resolve, reject) => {
    const result: Row[] = []

    createReadStream(csvFile)
      .pipe(csvParser(options))
      .on('data', (data: Row) => {
        result.push(data)
      })
      .on('end', () => {
        resolve(result)
      })
      .on('error', reject)
  })

export const parseCsvFileWithMapper = async <Row, MappedRow>(
  csvFile: string,
  mapRow: (row: Row) => MappedRow,
  options?: csvParser.Options | ReadonlyArray<string>,
): Promise<MappedRow[]> =>
  new Promise<MappedRow[]>((resolve, reject) => {
    const result: MappedRow[] = []

    createReadStream(csvFile)
      .pipe(csvParser(options))
      .on('data', (data: Row) => {
        result.push(mapRow(data))
      })
      .on('end', () => {
        resolve(result)
      })
      .on('error', reject)
  })
