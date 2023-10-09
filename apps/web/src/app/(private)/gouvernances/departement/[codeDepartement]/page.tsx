import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import Button from '@codegouvfr/react-dsfr/Button'
import StatistiquesGouvernances from '@app/web/app/(private)/gouvernances/StatistiquesGouvernances'
import { getStatistiquesGouvernanceDepartement } from '@app/web/app/(private)/gouvernances/getStatistiquesGouvernances'
import styles from '@app/web/app/(private)/gouvernances/Gouvernances.module.css'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateDepartementMetadata } from '@app/web/app/(private)/gouvernances/departement/generateDepartementMetadata'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { limiteModificationDesGouvernancesPressenties } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance-pressentie/gouvernancePressentieMetadata'
import { ajouterGouvernancePressentiePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { getListeGouvernanceDepartement } from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import GouvernanceCard from '@app/web/app/(private)/gouvernances/GouvernanceCard'
import { getGouvernanceScopeTitle } from '@app/web/app/(private)/gouvernances/gouvernanceScopeTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeDepartement })

  const statistiquesGouvernance =
    await getStatistiquesGouvernanceDepartement(codeDepartement)

  const gouvernances = await getListeGouvernanceDepartement(codeDepartement)

  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  return (
    <div className="fr-container fr-pb-20v">
      <Breadcrumb
        currentPageLabel={`Gouvernance - ${scopeTitle}`}
        segments={[
          {
            label: "Page d'accueil",
            linkProps: {
              href: '/',
            },
          },
        ]}
      />
      <StatistiquesGouvernances
        codeDepartement={codeDepartement}
        statistiquesGouvernance={statistiquesGouvernance}
        scopeTitle={scopeTitle}
      />
      <hr className="fr-separator-12v" />
      <h3 className="fr-mb-12v">
        Gouvernances et porteurs pressentis des feuilles de route locales France
        Numérique Ensemble au sein de votre département
      </h3>
      {gouvernances.length === 0 && (
        <p>Aucune gouvernance pressentie n’a été remontée pour le moment</p>
      )}
      {gouvernances.map((gouvernance) => (
        <GouvernanceCard
          key={gouvernance.id}
          gouvernance={gouvernance}
          scope={{ codeDepartement }}
          canEdit
        />
      ))}
      <div className={styles.gouvernancesCtaCard}>
        <span>
          {gouvernances.length === 0 && (
            <div className="fr-badge fr-badge--warning fr-mb-3v">
              À renseigner avant le{' '}
              {dateAsDay(limiteModificationDesGouvernancesPressenties)}
            </div>
          )}
          <p className="fr-mb-0">
            <strong>
              Une ou plusieurs gouvernances se dessinent sur votre territoire.
            </strong>
            <br />
            Faites remonter les porteurs de feuilles de route territoriale et
            les périmètres des gouvernances pressenties.
          </p>
        </span>
        <Button
          iconId="fr-icon-add-line"
          size="large"
          priority={gouvernances.length === 0 ? 'primary' : 'secondary'}
          linkProps={{
            href: ajouterGouvernancePressentiePath({ codeDepartement }),
          }}
        >
          Remonter une gouvernance pressentie
        </Button>
      </div>
    </div>
  )
}

export default Page
