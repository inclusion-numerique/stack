import { notFound } from 'next/navigation'
import { getDepartementNameAndCode } from '@app/web/data/getDepartementNameAndCode'

export const generateDepartementMetadata =
  (pageTitle: string) =>
  async ({
    params: { codeDepartement },
  }: {
    params: { codeDepartement: string }
  }) => {
    const departement = await getDepartementNameAndCode(codeDepartement)
    if (!departement) {
      notFound()
    }

    return {
      title: `${departement.nom} · ${pageTitle}`,
    }
  }
