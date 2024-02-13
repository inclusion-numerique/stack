'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import BesoinForm from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/selection/BesoinForm'
import BesoinsFormationForm from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/selection/BesoinsFormationForm'
import ActionBar from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/ActionBar'
import { useEraseBesoinsIngenierieFinanciere } from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/useEraseBesoinsIngenierieFinanciere'
import {
  BesoinsEnIngenierieFinanciereData,
  BesoinsEnIngenierieFinanciereValidation,
} from '@app/web/gouvernance/BesoinsEnIngenierieFinanciere'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import WhiteCard from '@app/web/ui/WhiteCard'
import { trpc } from '@app/web/trpc'
import { modifierBesoinsIngenieriePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'

const BesoinsIngenierieFinanciereSelectionForm = ({
  codeDepartement,
  defaultValue,
}: {
  codeDepartement: string
  defaultValue: DefaultValues<BesoinsEnIngenierieFinanciereData> & {
    gouvernanceId: string
  }
}) => {
  const mutation = trpc.besoinsIngenierieFinanciere.selection.useMutation()

  const form = useForm<BesoinsEnIngenierieFinanciereData>({
    resolver: zodResolver(BesoinsEnIngenierieFinanciereValidation),
    defaultValues: defaultValue,
  })

  const router = useRouter()

  const onSubmit = async (data: BesoinsEnIngenierieFinanciereData) => {
    await mutation.mutateAsync(data)
    router.refresh()
    router.push(
      modifierBesoinsIngenieriePath(
        { codeDepartement },
        {
          gouvernanceId: data.gouvernanceId,
          step: 'priorisation',
        },
      ),
    )
  }

  const { onCancel, eraseMutation } = useEraseBesoinsIngenierieFinanciere({
    codeDepartement,
    gouvernanceId: defaultValue.gouvernanceId,
  })

  const loading =
    mutation.isPending ||
    mutation.isSuccess ||
    eraseMutation.isPending ||
    eraseMutation.isSuccess

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <WhiteCard className="fr-pb-10v">
        <p className="fr-text--bold">
          Besoins relatifs à la formalisation des feuilles de route
        </p>
        <BesoinForm form={form} besoin="faireUnDiagnosticTerritorial" />
        <BesoinForm form={form} besoin="coConstruireLaFeuilleDeRoute" />
        <BesoinForm form={form} besoin="redigerLaFeuilleDeRoute" />
        <BesoinForm form={form} besoin="creerUnVehiculeJuridique" />
        <BesoinForm form={form} besoin="formaliserLaFeuilleDeRouteAutre" />
        <p className="fr-text--bold">
          Besoins relatifs au financement du déploiement de la/des feuille(s) de
          route
        </p>
        <BesoinForm form={form} besoin="structurerUnFondsLocal" />
        <BesoinForm form={form} besoin="monterDesDossiersDeSubvention" />
        <BesoinForm form={form} besoin="animerEtMettreEnOeuvre" />
        <BesoinForm form={form} besoin="financerLeDeploiementAutre" />
        <p className="fr-text--bold">
          Besoins relatifs à l’outillage des acteurs de votre territoire
        </p>
        <BesoinForm
          form={form}
          besoin="structurerUneFiliereDeReconditionnement"
        />
        <BesoinForm form={form} besoin="collecterDesDonneesTerritoriales" />
        <BesoinForm form={form} besoin="sensibiliserLesActeurs" />
        <BesoinForm form={form} besoin="outillerLesActeursAutre" />
        <p className="fr-text--bold">
          Besoins relatifs à la formation des professionnels de l’inclusion
          numérique
          <Button
            type="button"
            className="fr-display-inline-block fr-ml-1w fr-btn--tooltip fr-mb-negative-2v"
            id="besoins-formation-tooltip"
            aria-describedby="besoins-formation-tooltip_tooltip"
          >
            Information contextuelle
          </Button>
          <span
            className="fr-tooltip fr-placement fr-text--regular"
            id="besoins-formation-tooltip_tooltip"
            role="tooltip"
            aria-hidden="true"
          >
            Posture de l’aidant, accompagner les publics, orienter vers les
            acteurs des territoires, Aidants Connect…
          </span>
        </p>
        <BesoinsFormationForm form={form} besoin="formerLesAgentsPublics" />
        <BesoinsFormationForm
          form={form}
          besoin="formerLesSalariesAssociatifs"
        />
        <BesoinsFormationForm
          form={form}
          besoin="appuyerLaCertificationQualiopi"
        />
        <BesoinsFormationForm
          form={form}
          besoin="formerLesProfessionnelsAutre"
        />
      </WhiteCard>
      <ActionBar
        onCancel={onCancel}
        submitLabel="Etape suivante"
        loading={loading}
      >
        {mutation.error && (
          <p className="fr-text-default--error fr-my-0">
            {mutation.error.message}
          </p>
        )}
      </ActionBar>
    </form>
  )
}

export default withTrpc(BesoinsIngenierieFinanciereSelectionForm)
