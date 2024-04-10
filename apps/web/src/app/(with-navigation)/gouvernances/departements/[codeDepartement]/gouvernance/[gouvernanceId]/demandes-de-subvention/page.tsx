import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound } from 'next/navigation'
import Badge from '@codegouvfr/react-dsfr/Badge'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import Link from 'next/link'
import { getDemandesSubventionsForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { generateDepartementMetadata } from '@app/web/app/(with-navigation)/gouvernances/departements/generateDepartementMetadata'
import {
  gouvernanceDemandesDeSubventionPath,
  gouvernanceHomePath,
} from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { canEditGouvernance } from '@app/web/security/securityRules'
import BackLink from '@app/web/components/BackLink'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'
import NoteDeContexteSubventionsForm from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/NoteDeContexteSubventionsForm'
import RedAsterisk from '@app/web/ui/RedAsterisk'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { limiteModicitaionDesDemandesDeSubvention } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/gouvernanceMetadata'
import { numberToEuros } from '@app/web/utils/formatNumber'
import {
  getDemandesDeSubventionsForGouvernance,
  getMontantDotationRestante,
} from '@app/web/gouvernance/gouvernanceStatus'
import DemandeDeSubventionCard from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/DemandeDeSubventionCard'
import { getStatutDemandesSubvention } from '@app/web/gouvernance/statutDemandesSubvention'
import BeneficiaireSubventionFormationForm from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/BeneficiaireSubventionFormationForm'
import { getSubventionBeneficiairesOptions } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getSubventionBeneficiairesOptions'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement, gouvernanceId },
}: {
  params: { codeDepartement: string; gouvernanceId: string }
}) => {
  console.log('PRE', { codeDepartement, gouvernanceId })
  const accessCheck = await checkAccessControl({
    check: (sessionUser) =>
      checkGouvernanceScopeWriteAccess({
        scope: { codeDepartement },
        user: sessionUser,
      }),
    signinNextPath: gouvernanceDemandesDeSubventionPath(
      { codeDepartement },
      gouvernanceId,
    ),
  })

  console.log('HERE', { codeDepartement, gouvernanceId, accessCheck })
  if (
    !canEditGouvernance(accessCheck.user, {
      departementCode: codeDepartement,
    })
  ) {
    notFound()
  }

  const gouvernance = await getDemandesSubventionsForForm({
    gouvernanceId,
  })

  if (!gouvernance) {
    notFound()
  }
  if (gouvernance.departement.code !== codeDepartement) {
    notFound()
  }

  const beneficiairesOptions = await getSubventionBeneficiairesOptions({
    gouvernanceId,
  })

  const beneficiaireFormationMembreNom =
    beneficiairesOptions.find(
      (option) =>
        option.value === gouvernance.beneficiaireDotationFormation?.id,
    )?.name ?? null

  const canValidate = !!gouvernance.noteDeContexteSubventions

  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  const demandesDeSubvention =
    getDemandesDeSubventionsForGouvernance(gouvernance)

  const canAddDemande =
    getMontantDotationRestante(gouvernance).montantRestant.gt(0)

  const canEditContexte =
    getStatutDemandesSubvention(gouvernance) !== 'Finalisé'
  const canEditBeneficiaireFormation =
    !gouvernance.beneficiaireDotationFormationValideEtEnvoye

  return (
    <>
      <div className="fr-container">
        <Breadcrumb
          currentPageLabel="Demandes de subvention"
          segments={[
            {
              label: 'Page d’accueil',
              linkProps: {
                href: '/',
              },
            },
            {
              label: `Gouvernance - ${scopeTitle}`,
              linkProps: {
                href: gouvernanceHomePath({ codeDepartement }),
              },
            },
          ]}
        />
      </div>
      <div className="fr-container fr-container--800 fr-pb-10v fr-mb-20v">
        <BackLink
          href={gouvernanceHomePath({ codeDepartement })}
          label={`Retour à la gouvernance · ${scopeTitle}`}
        />

        <h1 className="fr-text-title--blue-france fr-mt-6v fr-mb-2v">
          Mes actions et demandes de subventions
        </h1>
        <p className="fr-text--sm fr-hint-text fr-my-2v">
          Les champs avec <RedAsterisk /> sont obligatoires
        </p>
        <p className="fr-text--lg fr-text-default--grey fr-mb-12v">
          Cette page vous permet de faire vos demandes de subventions sur la
          base de la dotation à laquelle vous êtes éligibles. Vous êtes invités
          à remplir un formulaire par action que vous souhaitez faire financer.
          Une note précisant le contexte dans lequel ces demandes de subventions
          s’inscrivent vous est demandée.{' '}
          <Link
            className="fr-link"
            href="https://lesbases.anct.gouv.fr/ressources/pas-a-pas-espace-france-numerique-ensemble"
            target="_blank"
          >
            Vous pouvez retrouver ici un guide qui vous aidera à remplir vos
            formulaires de demande de subvention
          </Link>
          .
        </p>
        <div className="fr-border fr-p-8v fr-pb-10v">
          <NoteDeContexteSubventionsForm
            noteDeContexteSubventions={gouvernance.noteDeContexteSubventions}
            gouvernanceId={gouvernance.id}
            canEdit={canEditContexte}
          />
        </div>

        <div className="fr-border fr-p-8v fr-pb-10v fr-mt-4v">
          <Badge className="fr-mb-4v" small severity="new">
            À&nbsp;renseigner&nbsp;avant&nbsp;le&nbsp;
            {dateAsDay(limiteModicitaionDesDemandesDeSubvention)}
          </Badge>
          <h2 className="fr-h5 fr-flex fr-justify-content-space-between fr-align-items-center fr-flex-gap-3v fr-mb-0">
            <span>
              Dotation ingénierie{' '}
              <button
                type="button"
                className="fr-btn--tooltip fr-btn"
                aria-describedby="tooltip-dotation"
              >
                Information contextuelle
              </button>
              <span
                className="fr-tooltip fr-placement fr-text--medium"
                id="tooltip-dotation"
                role="tooltip"
                aria-hidden="true"
              >
                La dotation départementale a été calculée sur la base des
                indicateurs suivants&nbsp;:
                <ul>
                  <li>Part des pas ou peu diplômés</li>
                  <li>Taux de chômage</li>
                  <li>Taux de pauvreté</li>
                  <li>Indice démographique</li>
                  <li>Part des + de 65 ans</li>
                </ul>
                L’investissement total de l’Etat est de 5M d’euros.
              </span>
            </span>
            <span>{numberToEuros(gouvernance.departement.dotation202406)}</span>
          </h2>
          {demandesDeSubvention.length > 0 && (
            <p className="fr-text--lg fr-mt-2v fr-mb-0 fr-text-default--info fr-flex fr-justify-content-space-between fr-align-items-center fr-flex-gap-3v">
              <span>Montant de dotation restant</span>
              <span>
                {numberToEuros(
                  getMontantDotationRestante(gouvernance).montantRestant,
                )}
              </span>
            </p>
          )}
          {demandesDeSubvention.map((demandeDeSubvention) => (
            <>
              <hr
                key={`${demandeDeSubvention.id}_separator`}
                className="fr-separator-8v"
              />
              <DemandeDeSubventionCard
                key={demandeDeSubvention.id}
                demandeDeSubvention={demandeDeSubvention}
                codeDepartement={codeDepartement}
                gouvernanceId={gouvernanceId}
                canValidate={canValidate}
              />
            </>
          ))}
          {canAddDemande && (
            <>
              <hr className="fr-separator-8v" />
              <ButtonsGroup
                buttons={[
                  {
                    iconId: 'fr-icon-add-line',
                    children: 'Ajouter une action',
                    priority: 'secondary',
                    className: 'fr-mb-0',
                    linkProps: {
                      href: gouvernanceDemandesDeSubventionPath(
                        { codeDepartement },
                        gouvernanceId,
                        '/ajouter',
                      ),
                    },
                  },
                ]}
              />
            </>
          )}
        </div>

        <div className="fr-border fr-p-8v fr-mt-4v fr-pb-10v fr-mb-20v">
          <BeneficiaireSubventionFormationForm
            beneficiaireFormationMembreId={
              gouvernance.beneficiaireDotationFormation?.id
            }
            beneficiaireDotationFormationValideEtEnvoye={
              gouvernance.beneficiaireDotationFormationValideEtEnvoye
                ? dateAsDay(
                    gouvernance.beneficiaireDotationFormationValideEtEnvoye,
                  )
                : null
            }
            beneficiaireDotationFormationAccepte={
              gouvernance.beneficiaireDotationFormationAccepte
                ? dateAsDay(gouvernance.beneficiaireDotationFormationAccepte)
                : null
            }
            beneficiaireFormationMembreNom={beneficiaireFormationMembreNom}
            gouvernanceId={gouvernance.id}
            canEdit={canEditBeneficiaireFormation}
            beneficiairesOptions={beneficiairesOptions}
            mustEditContextBeforeValidate={
              !gouvernance.noteDeContexteSubventions
            }
          />
        </div>
      </div>
    </>
  )
}

export default Page
