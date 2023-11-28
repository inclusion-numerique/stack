import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { BesoinsEnIngenierieFinanciereData } from '@app/web/gouvernance/BesoinsEnIngenierieFinanciere'
import { besoinsLabels } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/besoinsLabels'

/**
 * Type for each keyh of this object:
 * faireUnDiagnosticTerritorial: BesoinStandard,
 *
 *     coConstruireLaFeuilleDeRoute: BesoinStandard,
 *
 *     redigerLaFeuilleDeRoute: BesoinStandard,
 *
 *     creerUnVehiculeJuridique: BesoinStandard,
 *
 *     formaliserLaFeuilleDeRouteAutre: BesoinAPreciser,
 *
 *     structurerUnFondsLocal: BesoinStandard,
 *
 *     monterDesDossiersDeSubvention: BesoinStandard,
 *
 *     animerEtMettreEnOeuvre: BesoinStandard,
 *
 *     financerLeDeploiementAutre: BesoinAPreciser,
 *
 *     structurerUneFiliereDeReconditionnement: BesoinStandard,
 *
 *     collecterDesDonneesTerritoriales: BesoinStandard,
 *
 *     sensibiliserLesActeurs: BesoinStandard,
 *
 *     outillerLesActeursAutre: BesoinAPreciser,
 */
export type Besoin =
  | 'faireUnDiagnosticTerritorial'
  | 'coConstruireLaFeuilleDeRoute'
  | 'redigerLaFeuilleDeRoute'
  | 'creerUnVehiculeJuridique'
  | 'formaliserLaFeuilleDeRouteAutre'
  | 'structurerUnFondsLocal'
  | 'monterDesDossiersDeSubvention'
  | 'animerEtMettreEnOeuvre'
  | 'financerLeDeploiementAutre'
  | 'structurerUneFiliereDeReconditionnement'
  | 'collecterDesDonneesTerritoriales'
  | 'sensibiliserLesActeurs'
  | 'outillerLesActeursAutre'

const BesoinForm = ({
  form: { control, watch },
  besoin,
}: {
  form: UseFormReturn<BesoinsEnIngenierieFinanciereData>
  besoin: Besoin
}) => {
  const besoinChecked = watch(`${besoin}.besoin`)
  const rhChecked = watch(`${besoin}.rh`)

  return (
    <>
      <CheckboxFormField
        control={control}
        path={`${besoin}.besoin`}
        label={besoinsLabels[besoin]}
        className="fr-mb-0"
      />
      <div className="fr-mx-4w fr-pb-2v">
        {besoinChecked &&
          (besoin === 'outillerLesActeursAutre' ||
            besoin === 'formaliserLaFeuilleDeRouteAutre' ||
            besoin === 'financerLeDeploiementAutre') && (
            <InputFormField
              asterisk
              control={control}
              path={`${besoin}.precisions`}
              label="Précisez votre besoin"
            />
          )}
        {besoinChecked && (
          <CheckboxFormField
            className="fr-mb-0"
            control={control}
            path={`${besoin}.rh`}
            label="Ressource humaine"
            small
          />
        )}
        {besoinChecked && rhChecked && (
          <InputFormField
            type="number"
            asterisk
            control={control}
            path={`${besoin}.etp`}
            label="De combien d’ETP estimez-vous avoir besoin ?"
          />
        )}
        {besoinChecked && (
          <CheckboxFormField
            small
            control={control}
            path={`${besoin}.prestation`}
            label="Prestation de service"
          />
        )}
      </div>
    </>
  )
}

export default BesoinForm
