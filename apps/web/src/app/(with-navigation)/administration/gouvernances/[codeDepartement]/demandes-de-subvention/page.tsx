import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound, redirect } from 'next/navigation'
import Badge from '@codegouvfr/react-dsfr/Badge'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import {
  getDemandesSubventionsForForm,
  getDemandesSubventionsForFormSelect,
  gouvernanceSelect,
} from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
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
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getStatutDemandesSubvention } from '@app/web/gouvernance/statutDemandesSubvention'
import BeneficiaireSubventionFormationForm from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/BeneficiaireSubventionFormationForm'
import { getSubventionBeneficiairesOptions } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getSubventionBeneficiairesOptions'
import { getMembreGouvernanceStringName } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getMembreGouvernanceStringName'
import { prismaClient } from '@app/web/prismaClient'
import styles from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/DemandeDeSubventionForm.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const departement = await prismaClient.departement.findUnique({
    where: {
      code: codeDepartement,
    },
    select: {
      nom: true,
      code: true,
      gouvernancesRemontees: {
        where: {
          v2Enregistree: {
            not: null,
          },
          supression: null,
        },
        select: getDemandesSubventionsForFormSelect,
      },
    },
  })

  if (!departement) {
    notFound()
  }

  const { gouvernancesRemontees } = departement
  const gouvernance = gouvernancesRemontees[0]

  if (!gouvernance) {
    notFound()
  }

  await checkAccessControl({
    check: (sessionUser) =>
      sessionUser?.role === 'Administrator' &&
      checkGouvernanceScopeWriteAccess({
        scope: { codeDepartement },
        user: sessionUser,
      }),
    signinNextPath: `/administration/gouvernances`,
  })
  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  const demandesDeSubvention =
    getDemandesDeSubventionsForGouvernance(gouvernance)

  const beneficiairesOptions = await getSubventionBeneficiairesOptions({
    gouvernanceId: gouvernance.id,
  })
  const beneficiaireFormationMembreNom =
    gouvernance.beneficiaireDotationFormation
      ? getMembreGouvernanceStringName(
          gouvernance.beneficiaireDotationFormation,
        )
      : null

  return (
    <div className="fr-container fr-container--800 fr-pb-10v fr-mb-20v">
      <Breadcrumb
        className="fr-mb-4v"
        currentPageLabel={`Demandes de subvention · ${scopeTitle}`}
        segments={[
          {
            label: 'Page d’accueil',
            linkProps: {
              href: '/',
            },
          },
          {
            label: 'Administration',
            linkProps: {
              href: '/administration',
            },
          },
          {
            label: 'Gouvernances',
            linkProps: {
              href: '/administration/gouvernances',
            },
          },
        ]}
      />

      <h1 className="fr-h3 fr-text-title--blue-france fr-mb-4v">
        Actions et demandes de subventions
      </h1>
      <h1 className="fr-h3 fr-text-title--blue-france fr-mb-12v">
        {codeDepartement}&nbsp;·&nbsp;{scopeTitle}
      </h1>

      <div className="fr-border--slim-grey fr-p-8v fr-pb-10v">
        <h2 className="fr-h5 fr-mb-8v">
          Contextualisation des demandes de subvention
        </h2>
        {gouvernance.noteDeContexteSubventions ? (
          <div
            className={styles.htmlContainer}
            dangerouslySetInnerHTML={{
              __html: gouvernance.noteDeContexteSubventions ?? '',
            }}
          />
        ) : (
          <Badge small severity="warning">
            Non renseigné
          </Badge>
        )}
      </div>

      <div className="fr-border--slim-grey fr-p-8v fr-pb-10v fr-mt-4v">
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
              gouvernanceId={gouvernance.id}
              canInstruct
              canValidate
            />
          </>
        ))}
      </div>

      <div className="fr-border--slim-grey fr-p-8v fr-mt-4v fr-pb-10v fr-mb-20v">
        <BeneficiaireSubventionFormationForm
          beneficiaireFormationMembreId={
            gouvernance.beneficiaireDotationFormation?.id
          }
          beneficiaireFormationMembreNom={beneficiaireFormationMembreNom}
          gouvernanceId={gouvernance.id}
          canEdit
          canInstruct
          beneficiairesOptions={beneficiairesOptions}
        />
      </div>
    </div>
  )
}

export default Page
