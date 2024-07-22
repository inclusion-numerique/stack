import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import RequiredFieldsDisclaimer from '@app/ui/components/Form/RequiredFieldsDisclaimer'
import AdresseBanFormField from '@app/web/components/form/AdresseBanFormField'
import RnaInputInfo from '@app/web/rna/RnaInputInfo'
import SiretInputInfo from '@app/web/siret/SiretInputInfo'
import { InformationsGeneralesData } from '@app/web/app/structure/InformationsGeneralesValidation'

export const InformationsGeneralesFields = ({
  nom,
  form: { control, formState },
}: {
  nom: string
  form: UseFormReturn<InformationsGeneralesData>
}) => (
  <>
    <RequiredFieldsDisclaimer className="fr-mb-4v" />
    <InputFormField
      asterisk
      path="nom"
      label="Nom de la structure"
      control={control}
      disabled={formState.isSubmitting}
    />
    <AdresseBanFormField
      asterisk
      path="adresseBan"
      label="Adresse"
      placeholder="Rechercher l’adresse"
      control={control}
      disabled={formState.isSubmitting}
    />
    <InputFormField
      path="complementAdresse"
      label="Complément d’adresse"
      control={control}
      disabled={formState.isSubmitting}
    />
    <InputFormField
      path="siret"
      label="SIRET structure (ou RNA)"
      control={control}
      disabled={formState.isSubmitting}
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
