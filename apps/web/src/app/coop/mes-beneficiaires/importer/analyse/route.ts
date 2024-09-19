import type { Stream } from 'node:stream'
import type { NextRequest } from 'next/server'
import { v4 } from 'uuid'
import ExcelJS from 'exceljs'
import * as Sentry from '@sentry/nextjs'
import {
  analyseImportBeneficiairesExcel,
  Analysis,
} from '@app/web/beneficiaire/import/analyseImportBeneficiairesExcel'

export type AnalyseResponse = {
  analysis: Analysis
  id: string
}

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return new Response(null, {
        status: 400,
        statusText: 'Veuillez sélectionner un fichier valide',
      })
    }

    const workbook = new ExcelJS.Workbook()
    // Typescript rejects the type of the stream, but it is correct
    await workbook.xlsx.read(file.stream() as unknown as Stream)

    const analysis = await analyseImportBeneficiairesExcel(workbook)

    if (analysis.status === 'error' && analysis.rows.length === 0) {
      throw new Error('Fichier invalide ou vide')
    }

    const responseData: AnalyseResponse = {
      analysis,
      id: v4(),
    }

    return new Response(JSON.stringify(responseData), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    Sentry.captureException(error)

    return new Response(null, {
      status: 400,
      statusText: 'Impossible de traiter le fichier',
    })
  }
}
