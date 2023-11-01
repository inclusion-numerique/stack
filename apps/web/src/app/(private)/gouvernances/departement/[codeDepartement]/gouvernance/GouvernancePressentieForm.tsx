'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Notice from '@codegouvfr/react-dsfr/Notice'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import Link from 'next/link'
import InputFormField from '@app/ui/components/Form/InputFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import React from 'react'
import RichTextFormField from '@app/ui/components/Form/RichText/RichTextFormField'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import {
  GouvernancePressentieData,
  GouvernancePressentieValidation,
  perimetreOptions,
} from '@app/web/gouvernance/GouvernancePressentie'
import WhiteCard from '@app/web/ui/WhiteCard'
import RedAsterisk from '@app/web/ui/RedAsterisk'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { limiteModificationDesGouvernancesPressenties } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernancePressentieMetadata'
import SiretInputInfo from '@app/web/components/SiretInputInfo'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const emptyValues: DefaultValues<GouvernancePressentieData> = {
  v1PorteurCode: '',
  siretsRecruteursCoordinateurs: [{ siret: '' }],
}

const GouvernancePressentieForm = ({
  className,
  gouvernancePressentie,
  optionsCollectivitesPorteur,
}: {
  className?: string
  // If editing existing
  gouvernancePressentie?: DefaultValues<GouvernancePressentieData>
  optionsCollectivitesPorteur: {
    label: string
    options: { label: string; value: string }[]
  }[]
}) => {
  const form = useForm<GouvernancePressentieData>({
    resolver: zodResolver(GouvernancePressentieValidation),
    defaultValues: { ...emptyValues, ...gouvernancePressentie },
  })
  const { control, setError, handleSubmit, formState } = form
  const siretsRecruteursCoordinateursFields = useFieldArray({
    control,
    keyName: 'id',
    name: 'siretsRecruteursCoordinateurs',
  })

  const mutation = trpc.gouvernance.gouvernancePressentie.useMutation()
  const router = useRouter()

  console.log('ERRORS', formState.errors)

  const onSubmit = async (data: GouvernancePressentieData) => {
    try {
      await mutation.mutateAsync(data)
      router.refresh()
      router.push(
        gouvernanceHomePath({ codeDepartement: data.departementCode }),
      )
    } catch (mutationError) {
      if (!applyZodValidationMutationErrorsToForm(mutationError, setError)) {
        // TODO Go over this kind of stuff and add Toast
        throw mutationError
      }
    }
  }

  const v1Perimetre = form.watch('v1Perimetre')
  const v1PorteurCode = form.watch('v1PorteurCode')
  const v1PorteurSiret = form.watch('v1PorteurSiret')
  const shouldProvidePorteurSiret = v1Perimetre === 'autre'

  if (
    // We switch from SIRET to collectivity, reset the value for input to display ok
    shouldProvidePorteurSiret &&
    !!v1PorteurCode
  ) {
    setTimeout(() => {
      form.setValue('v1PorteurCode', '')
    })
  } else if (!shouldProvidePorteurSiret && !!v1PorteurSiret) {
    setTimeout(() => {
      form.setValue('v1PorteurSiret', '')
    })
  }

  const isLoading =
    (formState.isSubmitting || formState.isSubmitSuccessful) && !mutation.error

  const defaultPorteurValue = gouvernancePressentie?.v1PorteurCode
    ? Object.values(optionsCollectivitesPorteur)
        .flatMap((group) => group.options)
        .find((option) => option.value === gouvernancePressentie?.v1PorteurCode)
    : undefined

  return (
    <WhiteCard className={className}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="fr-text-title--blue-france fr-mb-2v">
          Gouvernances et porteurs pressentis des feuilles de route au sein de
          votre département
        </h3>
        <p className="fr-text--sm fr-text--medium fr-mb-6v">
          Les champs avec <RedAsterisk /> sont obligatoires
        </p>
        <Notice
          className="fr-mb-10v"
          title={`Proposition modifiable jusqu’au ${dateAsDay(
            limiteModificationDesGouvernancesPressenties,
          )}`}
        />
        <h6 className="fr-mb-4v">Périmètre de la gouvernance</h6>
        <RadioFormField
          control={control}
          asterisk
          label="Quel est le périmètre géographique de la gouvernance ?"
          path="v1Perimetre"
          options={perimetreOptions}
        />
        <hr className="fr-separator-10v" />
        <h6 className="fr-mb-4v">Porteur de la feuille de route</h6>
        {shouldProvidePorteurSiret ? (
          <InputFormField
            label="SIRET de la collectivité/structure"
            path="v1PorteurSiret"
            asterisk
            control={control}
            info={<SiretInputInfo />}
            disabled={isLoading}
          />
        ) : (
          <CustomSelectFormField
            label="Qui sera le porteur de la feuille de route ?"
            path="v1PorteurCode"
            asterisk
            control={control}
            options={optionsCollectivitesPorteur}
            placeholder="Rechercher la collectivité"
            disabled={isLoading}
            defaultValue={defaultPorteurValue}
          />
        )}
        <hr className="fr-separator-10v" />
        <h6 className="fr-mb-4v">
          Recrutement coordinateur Conseillers Numériques
        </h6>
        <p className="fr-mb-8v">
          La phase de déploiement du dispositif Conseiller numérique laisse
          place à une phase de structuration où le diagnostic des besoins et
          l’accompagnement des conseillers numériques au niveau local peut
          permettre d’organiser l’action de la médiation numérique, et de
          l’intégrer aux politiques publiques territoriales. C’est en ce sens
          qu’un appel à candidatures à été lancé pour identifier des structures
          souhaitant avoir une action de coordination de l’action des
          conseillers numériques et des médiateurs numériques de leur territoire
          :{' '}
          <Link
            href="https://societenumerique.gouv.fr/fr/actualite/appel-a-candidatures-conseillers-numeriques-coordinateurs/"
            target="_blank"
          >
            https://societenumerique.gouv.fr/fr/actualite/appel-a-candidatures-conseillers-numeriques-coordinateurs/
          </Link>
          . Ces projets de coordination doivent s’articuler avec les projets de
          gouvernances pressenties.
          <br />
          <br />
          Par ailleurs, l’instruction des candidatures doit être faite sur la{' '}
          <Link
            href="https://admin.conseiller-numerique.gouv.fr/login?role=prefet"
            target="_blank"
          >
            plateforme dédiée au dispositif Conseiller Numérique
          </Link>{' '}
          avant le 10 décembre 2023.
          <br />
          <br />
          Veuillez renseigner quelle collectivité/structure va recruter un
          coordinateur Conseillers Numériques au sein de la gouvernance :
        </p>
        {siretsRecruteursCoordinateursFields.fields.map((siretField, index) => (
          <InputFormField
            control={control}
            key={siretField.id}
            path={`siretsRecruteursCoordinateurs.${index}.siret`}
            disabled={isLoading}
            label={
              index === 0 ? (
                <>
                  SIRET de la collectivité/structure <RedAsterisk />
                </>
              ) : (
                <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
                  <span>
                    SIRET de la collectivité/structure <RedAsterisk />
                  </span>
                  <Button
                    type="button"
                    priority="tertiary no outline"
                    size="small"
                    iconId="fr-icon-delete-bin-line"
                    onClick={() =>
                      siretsRecruteursCoordinateursFields.remove(index)
                    }
                  >
                    Supprimer
                  </Button>
                </div>
              )
            }
            info={<SiretInputInfo />}
            className="fr-mb-8v"
          />
        ))}
        <div className="fr-btns-group fr-btns-group--icon-left">
          <Button
            type="button"
            priority="secondary"
            className="fr-mb-0"
            iconId="fr-icon-add-line"
            disabled={isLoading}
            onClick={() =>
              siretsRecruteursCoordinateursFields.append({ siret: '' })
            }
          >
            Ajouter une collectivité/structure recruteuse
          </Button>
        </div>

        <hr className="fr-separator-10v" />
        <h6 className="fr-mb-4v">Note de contexte</h6>
        <RichTextFormField
          form={form}
          asterisk
          path="noteDeContexte"
          disabled={isLoading}
          label="Précisez, au sein d'une note qualitative, la composition pressentie de la gouvernance dans votre département et les éventuelles difficultés que vous rencontreriez dans les échanges avec les collectivités territoriales et leurs groupements"
        />
        <div className="fr-btns-group fr-mt-10v">
          <Button
            type="submit"
            className={classNames(isLoading && 'fr-btn--loading')}
          >
            Confirmer et envoyer
          </Button>
        </div>
        {mutation.error && (
          <p className="fr-error-text fr-mt-2v">
            Une erreur est survenue, veuillez réessayer.
          </p>
        )}
      </form>
    </WhiteCard>
  )
}

export default withTrpc(GouvernancePressentieForm)
