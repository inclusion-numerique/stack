import React from 'react'
import { notFound } from 'next/navigation'
import classNames from 'classnames'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import { generateDepartementMetadata } from '@app/web/app/(private)/gouvernances/departement/generateDepartementMetadata'
import { gouvernanceHomePath } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { getGouvernancePressentieForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance-pressentie/getGouvernancePressentieForForm'
import WhiteCard from '@app/web/ui/WhiteCard'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import styles from '@app/web/app/(private)/gouvernances/Gouvernances.module.css'
import BackLink from '@app/web/components/BackLink'
import { nameOrEmail } from '@app/web/utils/nameOrEmail'
import {
  getPerimetreString,
  getPorteurString,
} from '@app/web/app/(private)/gouvernances/gouvernanceHelpers'
import PrintButton from '@app/web/app/(private-print)/PrintButton'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata(
  'Gouvernance pressentie',
)

const Page = async ({
  params: { codeDepartement, gouvernanceId },
}: {
  params: { codeDepartement: string; gouvernanceId: string }
}) => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ codeDepartement })

  const gouvernance = await getGouvernancePressentieForForm(gouvernanceId)

  if (!gouvernance) {
    notFound()
  }
  if (gouvernance.departement.code !== codeDepartement) {
    notFound()
  }

  const {
    createur,
    creation,
    modification,
    derniereModificationPar,
    organisationsRecruteusesCoordinateurs,
    noteDeContexte,
  } = gouvernance

  const porteurString = getPorteurString(gouvernance)
  const perimetreString = getPerimetreString(gouvernance)

  return (
    <div className="fr-container fr-container--medium fr-py-10v ">
      <Notice
        className="fr-hidden-print fr-mb-6v"
        title={
          <>
            Pour télécharger cette page au format .pdf, cliquez sur Imprimer,
            puis à la ligne <strong>Destination</strong> (sur Chrome) ou{' '}
            <strong>Nom de l’imprimante</strong> (sur Firefox), choisissez{' '}
            <strong>Enregistrer au format PDF</strong>
          </>
        }
      />

      <div className="fr-flex fr-align-items-center fr-justify-content-space-between fr-hidden-print">
        <BackLink href={gouvernanceHomePath({ codeDepartement })} />

        <PrintButton />
      </div>

      <WhiteCard className="fr-mt-6v">
        <div className="fr-flex fr-align-items-start fr-justify-content-space-between fr-flex-gap-2v fr-flex-wrap">
          <div>
            <h5 className="fr-mb-2v">Gouvernance pressentie</h5>
            <p className="fr-mb-0 fr-text--sm">
              Déposée le {dateAsDay(creation)} par {nameOrEmail(createur)} ·
              Modifiée le {dateAsDay(modification)} par{' '}
              {nameOrEmail(derniereModificationPar)}
            </p>
          </div>
        </div>
        <InfoLabelValue
          label="Périmètre de la gouvernance"
          value={perimetreString}
          labelClassName="fr-mt-6v"
        />
        <InfoLabelValue
          label="Porteur de la gouvernance"
          labelClassName="fr-mt-6v"
          value={porteurString}
        />
        <InfoLabelValue
          label="Recrutement coordinateur Conseillers Numériques"
          labelClassName="fr-mt-6v"
          value={
            <>
              {organisationsRecruteusesCoordinateurs.map(
                ({ siretInformations: { siret } }, index) => (
                  <span key={siret}>
                    {siret}
                    {index ===
                    organisationsRecruteusesCoordinateurs.length - 1 ? null : (
                      <br />
                    )}
                  </span>
                ),
              )}
            </>
          }
        />
        <p className="fr-text-mention--grey fr-mb-0 fr-mt-6v">
          Note de contexte
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: noteDeContexte,
          }}
          className={classNames(
            'fr-mb-0 fr-text--medium',
            styles.noteDeContexteContainer,
          )}
        />
      </WhiteCard>
    </div>
  )
}

export default Page
