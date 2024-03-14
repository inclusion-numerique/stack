import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { getGouvernanceForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { generateDepartementMetadata } from '@app/web/app/(with-navigation)/gouvernances/departements/generateDepartementMetadata'
import CreateBesoinsEnIngenierieFinanciereButton from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/intro/CreateBesoinsEnIngenierieFinanciereButton'
import {
  gouvernanceHomePath,
  modifierBesoinsIngenieriePath,
} from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { canEditGouvernance } from '@app/web/security/securityRules'
import BackLink from '@app/web/components/BackLink'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import WhiteCard from '@app/web/ui/WhiteCard'
import { getSessionUser } from '@app/web/auth/getSessionUser'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement, gouvernanceId },
}: {
  params: { codeDepartement: string; gouvernanceId: string }
}) => {
  const user = await getSessionUser()
  if (
    !canEditGouvernance(user, {
      departementCode: codeDepartement,
    })
  ) {
    notFound()
  }

  const gouvernance = await getGouvernanceForForm(gouvernanceId)

  if (!gouvernance) {
    notFound()
  }
  if (gouvernance.departement.code !== codeDepartement) {
    notFound()
  }
  if (gouvernance.besoinsEnIngenierieFinanciere?.priorisationEnregistree) {
    // Les besoins terminés ne sont plus éditables
    notFound()
  }
  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  return (
    <>
      <div className="fr-container">
        <Breadcrumb
          currentPageLabel="Besoins en ingénierie financière"
          segments={[
            {
              label: "Page d'accueil",
              linkProps: {
                href: '/',
              },
            },
            {
              label: `Gouvernance · ${scopeTitle}`,
              linkProps: {
                href: gouvernanceHomePath({ codeDepartement }),
              },
            },
          ]}
        />
      </div>
      <div className="fr-container fr-container--narrow fr-pb-10v fr-mb-20v">
        <BackLink href={gouvernanceHomePath({ codeDepartement })} />
        <WhiteCard className="fr-mt-12v">
          <h1 className="fr-text-title--blue-france">
            Besoins en ingénierie financière
          </h1>
          <p className="fr-text-mention--grey">
            Dans le cadre du développement de votre stratégie d’inclusion
            numérique, de la structuration de votre gouvernance et de la mise en
            en œuvre de vos feuilles de route territoriales, nous souhaitons
            connaître vos besoins de financement pour&nbsp;:
            <ul className="fr-my-6v fr-ml-1w">
              <li>
                Formaliser les feuilles de route territoriales France Numérique
                Ensemble
              </li>
              <li>
                Financer le déploiement des feuilles de route France Numérique
                Ensemble
              </li>
              <li>Outiller les acteurs du territoire</li>
              <li>Former les professionnels à l’inclusion numérique</li>
            </ul>
            Les items proposés peuvent correspondre à différents stades
            d’avancement de mise en place des feuilles de route. Vous pouvez
            ajouter un item qui ne figure pas dans la liste en cliquant sur
            “autre”. Dans une seconde étape du formulaire, il vous sera demandé
            de prioriser les besoins sélectionnés.
            <br />
            <br />
            Cette remontée a vocation à recenser les besoins de l’ensemble des
            membres de votre gouvernance dans le cadre de votre politique locale
            d’inclusion numérique. L’objectif est de formaliser une première
            photographie des besoins d’ici fin 2023 pour formaliser des
            propositions de financement dès janvier 2024. Les modalités de
            financement ne sont donc pas encore connues. A noter que les
            réponses ne constituent pas engagement de votre part, et{' '}
            <strong>sont modifiables jusqu’au 31 janvier 2024.</strong>
          </p>

          <div className="fr-btns-group fr-btns-group--icon-right fr-mb-0 fr-mt-8v">
            {gouvernance.besoinsEnIngenierieFinanciere ? (
              <Button
                linkProps={{
                  href: modifierBesoinsIngenieriePath(
                    { codeDepartement },
                    { gouvernanceId, step: 'selection' },
                  ),
                }}
                iconPosition="right"
                iconId="fr-icon-arrow-right-line"
              >
                Renseigner les besoins de ma gouvernance
              </Button>
            ) : (
              <CreateBesoinsEnIngenierieFinanciereButton
                codeDepartement={codeDepartement}
                gouvernanceId={gouvernanceId}
                className="fr-my-0"
              />
            )}
          </div>
        </WhiteCard>
      </div>
    </>
  )
}

export default Page
