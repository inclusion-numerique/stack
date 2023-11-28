import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { BesoinsEnIngenierieFinanciereData } from '@app/web/gouvernance/BesoinsEnIngenierieFinanciere'
import { besoinsLabels } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/besoinsLabels'

export type BesoinFormation =
  | 'formerLesAgentsPublics'
  | 'formerLesSalariesAssociatifs'
  | 'appuyerLaCertificationQualiopi'
  | 'formerLesProfessionnelsAutre'

const BesoinsFormationForm = ({
  form: { control, watch },
  besoin,
}: {
  form: UseFormReturn<BesoinsEnIngenierieFinanciereData>
  besoin: BesoinFormation
}) => {
  const besoinChecked = watch(besoin)

  return (
    <>
      <CheckboxFormField
        control={control}
        path={besoin}
        label={
          besoin === 'formerLesSalariesAssociatifs' ? (
            <>
              {besoinsLabels[besoin]}
              <br />
              <span className="fr-text--xs fr-my-0 fr-text-mention--grey">
                Les salariés des structures adhérentes à l‘OPCO Uniformation
                peuvent déjà demander un financement de formation sur les enjeux
                d’inclusion numérique (la page d’uniformation sur le financement
                de formation pour les structures privées adhérentes à l’OPCO est
                à jour{' '}
                <a
                  target="_blank"
                  className="fr-text-action-high--blue-france fr-text--break-all"
                  href="https://www.uniformation.fr/entreprise/actualites/comment-favoriser-la-formation-des-aidants-numeriques"
                >
                  https://www.uniformation.fr/entreprise/actualites/comment-favoriser-la-formation-des-aidants-numeriques
                </a>
                , adressez-vous à votre référent régional Uniformation)
              </span>
            </>
          ) : (
            besoinsLabels[besoin]
          )
        }
        className="fr-mb-0"
      />
      <div className="fr-mx-4w fr-pb-2v">
        {besoinChecked && besoin === 'formerLesProfessionnelsAutre' && (
          <InputFormField
            control={control}
            asterisk
            path={`${besoin}Precisions`}
            label="Précisez votre besoin"
          />
        )}
        {besoinChecked &&
          (besoin === 'formerLesAgentsPublics' ||
            besoin === 'formerLesSalariesAssociatifs') && (
            <InputFormField
              type="number"
              asterisk
              control={control}
              path={`${besoin}Nombre`}
              label="Combien de personnes estimez-vous devoir former ?"
            />
          )}
      </div>
    </>
  )
}

export default BesoinsFormationForm
