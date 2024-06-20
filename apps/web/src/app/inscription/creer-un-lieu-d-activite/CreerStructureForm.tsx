'use client'

import { DefaultValues, useForm } from 'react-hook-form'
import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import { zodResolver } from '@hookform/resolvers/zod'
import InputFormField from '@app/ui/components/Form/InputFormField'
import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import SiretInputInfo from '@app/web/siret/SiretInputInfo'
import RnaInputInfo from '@app/web/rna/RnaInputInfo'
import { typologieStructureOptions } from '@app/web/app/structure/typologieStructure'
import IconInSquare from '@app/web/components/IconInSquare'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  CreerStructureData,
  CreerStructureValidation,
  descriptionMaxLength,
} from '@app/web/app/structure/CreerStructureValidation'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { validateValidRnaDigits } from '@app/web/rna/rnaValidation'
import AdresseBanFormField from '@app/web/components/form/AdresseBanFormField'
import { useEffect } from 'react'
import RichTextFormField from '@app/ui/components/Form/RichText/RichTextFormField'
import ToggleFormField from '@app/ui/components/Form/ToggleFormField'

const descriptionInfo = (description?: string | null) =>
  `${description?.length ?? 0}/${descriptionMaxLength} caractères`

const CreerStructureForm = ({
  lieuActiviteMediateurId,
  backLinkHref,
  onVisiblePourCartographieNationaleChange,
  defaultValues,
}: {
  lieuActiviteMediateurId?: string
  backLinkHref: string
  onVisiblePourCartographieNationaleChange?: (visible: boolean) => void
  defaultValues?: DefaultValues<CreerStructureData>
}) => {
  const form = useForm<CreerStructureData>({
    resolver: zodResolver(CreerStructureValidation),
    defaultValues: {
      ...defaultValues,
      lieuActiviteMediateurId,
      visiblePourCartographieNationale: false,
    },
  })

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitSuccessful, isSubmitting },
  } = form

  const mutation = trpc.structures.create.useMutation()

  const router = useRouter()

  const onSubmit = async (data: CreerStructureData) => {
    // We have only one field SIRET for both SIRET and RNA so we need to check if the value is a SIRET or a RNA
    // Replace SIRET by RNA if it's a valid RNA
    if (data.siret && validateValidRnaDigits(data.siret)) {
      // eslint-disable-next-line no-param-reassign
      data.rna = data.siret
      // eslint-disable-next-line no-param-reassign
      data.siret = undefined
    }

    try {
      await mutation.mutateAsync(data)

      createToast({
        priority: 'success',
        message: 'Le lieu d’activité a bien été créé.',
      })

      router.push(backLinkHref)
      router.refresh()
    } catch (mutationError) {
      if (applyZodValidationMutationErrorsToForm(mutationError, setError)) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }
  const isLoading = isSubmitting || isSubmitSuccessful

  const visiblePourCartographieNationale = form.watch(
    'visiblePourCartographieNationale',
  )

  const nom = form.watch('nom')

  useEffect(() => {
    onVisiblePourCartographieNationaleChange?.(visiblePourCartographieNationale)
  }, [
    onVisiblePourCartographieNationaleChange,
    visiblePourCartographieNationale,
  ])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fr-border fr-border-radius--8" id="informations">
        <div className="fr-px-8v fr-pt-10v">
          <h2 className="fr-h5 fr-text-title--blue-france fr-mb-0">
            Informations générales
          </h2>
        </div>
        <hr className="fr-separator-8v" />
        <div className="fr-px-8v fr-pb-10v">
          <RequiredFieldsDisclamer className="fr-mb-4v" />
          <InputFormField
            control={control}
            path="nom"
            label="Nom de la structure"
            disabled={isLoading}
            asterisk
          />

          <AdresseBanFormField control={control} />

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
            info={
              <>
                <SiretInputInfo className="fr-mb-0" searchTerm={nom} />
                <RnaInputInfo />
              </>
            }
          />
        </div>
      </div>

      <div className="fr-border fr-border-radius--8 fr-mt-6v">
        <div className="fr-px-8v fr-py-10v fr-background-alt--blue-france fr-border-radius-top--8">
          <div className="fr-flex fr-flex-gap-6v fr-align-items-center">
            <img
              src="/images/services/cartographie-logo.svg"
              alt="Cartographie Nationale"
            />
            <p className="fr-text--lg fr-mb-0 fr-text-title--blue-france fr-text--bold">
              Vous souhaitez apparaître sur la cartographie nationale des lieux
              d’inclusion numérique&nbsp;?
            </p>
          </div>
          <div className="fr-flex fr-mt-8v fr-flex-gap-3v fr-align-items-center">
            <span className="fr-icon-edit-line fr-icon--sm fr-text-title--blue-france" />
            <p className="fr-text--sm fr-mb-0">
              Renseignez des informations sur le lieu et les services
              d’inclusion numérique qui y sont proposés
            </p>
          </div>
          <div className="fr-flex fr-mt-4v fr-mb-8v fr-flex-gap-3v fr-align-items-center">
            <span className="fr-icon-compass-3-line fr-icon--sm fr-text-title--blue-france" />
            <p className="fr-text--sm fr-mb-0">
              Gagnez en visibilité et orientez les bénéficiaires grâce à la
              cartographie
            </p>
          </div>
          <Link
            href="https://cartographie.societenumerique.gouv.fr/presentation"
            target="_blank"
            className="fr-link fr-link--sm fr-mb-0"
          >
            En savoir plus sur la cartographie
          </Link>
        </div>
        <hr className="fr-separator fr-separator-1px" />
        <div className="fr-pt-8v fr-pb-6v fr-px-8v">
          <ToggleFormField
            control={control}
            path="visiblePourCartographieNationale"
            disabled={isLoading}
            label="Rendre mon lieu d’activité visible sur la cartographie"
            labelPosition="left"
          />
        </div>
        {visiblePourCartographieNationale && (
          <>
            <hr className="fr-separator fr-separator-1px" id="accueil-public" />
            <div className="fr-p-8v">
              <IconInSquare iconId="fr-icon-map-pin-2-line" />
              <h3 className="fr-h4 fr-mt-4v fr-mb-1v fr-text-title--blue-france">
                Lieu accueillant du public
              </h3>
              <p className="fr-text--sm fr-mb-0">
                Renseignez ici des informations supplémentaires permettant
                d’ajouter du contexte sur le lieu et de faciliter l’accès au
                public.
              </p>
            </div>
            <hr className="fr-separator fr-separator-1px" id="description" />
            <div className="fr-p-8v">
              <h4 className="fr-h6 fr-mb-1v">Description du lieu</h4>
              <p className="fr-text--sm fr-mb-0">
                Décrivez ici le lieu et les activités qu’il propose.
              </p>
              <p className="fr-my-8v fr-text--sm fr-text-mention--grey">
                Ces champs sont optionnels
              </p>
              <SelectFormField
                control={control}
                path="typologie"
                label="Typologie de la structure"
                disabled={isLoading}
                options={typologieStructureOptions}
                placeholder=" "
              />
              <InputFormField
                type="textarea"
                label="Résumé de l’activité du lieu"
                hint="Ce résumé permet d’introduire brièvement l’activité du lieu."
                control={control}
                rows={3}
                info={descriptionInfo}
                path="presentationResume"
              />
              <RichTextFormField
                form={form}
                asterisk
                path="presentationDetail"
                disabled={isLoading}
                label="Description complète du lieu"
              />
              <hr
                className="fr-separator fr-separator-8v"
                id="informations-pratiques"
              />
              <h4 className="fr-h6 fr-mt-4v fr-mb-1v">
                Informations pratiques
              </h4>
              <p className="fr-text--sm fr-mb-0">
                Horaires, accès et site internet du lieu.
              </p>
              <p className="fr-my-8v fr-text--sm fr-text-mention--grey">
                Ces champs sont optionnels
              </p>
              <InputFormField
                control={control}
                path="horaires"
                label="Site internet du lieu"
                hint="Exemple: https://mastructure.fr"
                disabled={isLoading}
              />
              <CheckboxFormField
                className="fr-mt-6v fr-mb-2v"
                control={control}
                path="lieuItinerant"
                label="Lieu d’activité itinérant (exemple : bus)"
              />

              <InputFormField
                control={control}
                path="accessibilite"
                label="Accessibilité"
                hint={
                  <>
                    Afin de renseigner les informations d’accessibilité sur la
                    structure, retrouvez-la via la plateforme{' '}
                    <Link
                      href="https://acceslibre.beta.gouv.fr"
                      target="_blank"
                      className="fr-link fr-link--xs"
                    >
                      accès libre
                    </Link>{' '}
                    et copiez l’url dans le champs ci-dessous.
                  </>
                }
                placeholder="https://acceslibre.beta.gouv.fr/..."
                disabled={isLoading}
              />
              <hr
                className="fr-separator fr-separator-8v"
                id="informations-pratiques"
              />
              <p className="wip-outline">Horaires d’ouverture du lieu</p>
              <p>🚧</p>
              <InputFormField
                control={control}
                path="horaires"
                label="Détail horaires"
                hint="Vous pouvez renseigner ici des informations spécifiques concernant les horaires."
                disabled={isLoading}
              />
            </div>
            <hr className="fr-separator fr-separator-1px" />
            <div className="fr-p-8v">
              <IconInSquare iconId="fr-icon-heart-line" />
              <h3 className="fr-h4 fr-mt-4v fr-mb-1v fr-text-title--blue-france">
                Services d’inclusion numérique
              </h3>
              <p className="fr-text--sm fr-mb-0">
                Renseignez des informations sur les services d’inclusion
                numérique proposés dans ce lieu afin d’orienter les
                bénéficiaires.
              </p>
            </div>
            <hr className="fr-separator fr-separator-1px" />
            <div className="fr-p-8v wip">🚧</div>
          </>
        )}
      </div>
      <div className="fr-btns-group">
        <Button
          type="submit"
          {...buttonLoadingClassname(
            isLoading,
            'fr-width-full fr-mt-10v fr-mb-4v',
          )}
        >
          Créer le lieu d’activité
        </Button>
        <Button
          className="fr-mb-20v"
          priority="secondary"
          linkProps={{
            href: backLinkHref,
            'aria-disabled': isLoading,
          }}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(CreerStructureForm)
