import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import RequiredFieldsDisclaimer from '@app/ui/components/Form/RequiredFieldsDisclaimer'
import AdresseBanFormField from '@app/web/components/form/AdresseBanFormField'
import RnaInputInfo from '@app/web/rna/RnaInputInfo'
import SiretInputInfo from '@app/web/siret/SiretInputInfo'
import { StructureInformationsGeneralesData } from '@app/web/app/structure/StructureInformationsGeneralesCommandValidation'
import { InformationsGeneralesProps } from './InformationsGeneralesProps'

export const InformationsGeneralesFields = ({
  nom,
  form,
}: InformationsGeneralesProps & {
  form: UseFormReturn<StructureInformationsGeneralesData>
}) => {
  const {
    control,
    formState: { isSubmitSuccessful, isSubmitting },
  } = form

  const isLoading = isSubmitting || isSubmitSuccessful

  return (
    <>
      <RequiredFieldsDisclaimer className="fr-mb-4v" />
      <InputFormField
        control={control}
        path="nom"
        label="Nom de la structure"
        disabled={isLoading}
        asterisk
      />
      <AdresseBanFormField
        label="adresse"
        path="adresseBan"
        placeholder="Rechercher l’adresse"
        control={control}
        disabled={isLoading}
      />
      <InputFormField
        control={control}
        path="complementAdresse"
        label="Complément d’adresse"
        disabled={isLoading}
      />
      <InputFormField
        control={control}
        path="siret"
        label="SIRET structure (ou RNA)"
        disabled={isLoading}
        className="fr-mb-0"
        info={
          <>
            <SiretInputInfo className="fr-mb-0" searchTerm={nom} />
            <RnaInputInfo />
          </>
        }
      />
    </>
  )
}
