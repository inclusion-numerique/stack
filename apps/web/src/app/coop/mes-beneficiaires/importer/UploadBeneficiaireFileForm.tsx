'use client'

import FileFormField from '@app/ui/components/Form/FileFormField'
import { useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { storeBeneficiaireImportAnalysis } from '@app/web/app/coop/mes-beneficiaires/importer/analyse/beneficiaireImportAnalysisStorage'
import type { AnalyseResponse } from '@app/web/app/coop/mes-beneficiaires/importer/analyse/route'

// Create zod validation so the file is required and of type Fil
// And the file must be an xlsx file

const UploadBeneficiaireFileFormValidation = z.object({
  file: z
    .instanceof(File, { message: 'Veuillez sélectionner un fichier' })
    .refine(
      (file) =>
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      {
        message:
          'Veuillez sélectionner un fichier Excel (.xlsx) basé sur le modèle',
      },
    ),
})

type UploadBeneficiaireFileFormData = z.infer<
  typeof UploadBeneficiaireFileFormValidation
>

const UploadBeneficiaireFileForm = () => {
  const { control, handleSubmit } = useForm<UploadBeneficiaireFileFormData>({
    resolver: zodResolver(UploadBeneficiaireFileFormValidation),
  })
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: UploadBeneficiaireFileFormData) => {
    setLoading(true)

    const formData = new FormData()
    formData.append('file', data.file)

    try {
      const response = await fetch('/coop/mes-beneficiaires/importer/analyse', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        router.push(
          `/coop/mes-beneficiaires/importer/erreur?message=${response.statusText}`,
        )
        return
      }

      const analysisData = (await response.json()) as AnalyseResponse

      storeBeneficiaireImportAnalysis(analysisData)

      router.push(`/coop/mes-beneficiaires/importer/analyse/${analysisData.id}`)
    } catch {
      router.push(`/coop/mes-beneficiaires/importer/erreur`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-5">
          <h2 className="fr-h5 fr-text-title--blue-france fr-mb-2v">
            3. Importer le fichier
          </h2>
          <p className="fr-text--sm">
            Une fois le fichier complété, vous pouvez l’importer en cliquant sur
            Parcourir, en le sélectionnant parmi vos dossiers puis en cliquant
            sur Importer.
          </p>
        </div>
        <div className="fr-col-12 fr-col-md-7">
          <div className="fr-border fr-border-radius--16 fr-p-4v">
            <FileFormField
              control={control}
              path="file"
              label="Importer le fichier"
              hint="Format Excel (.xlsx)"
              accept=".xlsx"
            />
          </div>
        </div>
      </div>
      <hr className="fr-separator-12v" />
      <div className="fr-btns-group">
        <Button
          type="submit"
          priority="primary"
          {...buttonLoadingClassname(loading)}
        >
          {loading ? 'Analyse en cours...' : 'Vérifier le fichier avant import'}
        </Button>
        <Button
          className={classNames('fr-ml-1v', loading && 'fr-btn--disabled')}
          priority="secondary"
          linkProps={{ href: '/coop/mes-beneficiaires' }}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}

export default UploadBeneficiaireFileForm
