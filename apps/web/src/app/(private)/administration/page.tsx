import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import classNames from 'classnames'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import WorkInProgressNotice from '@app/web/components/WorkInProgressNotice'
import styles from './Administration.module.css'

export const generateMetadata = () => ({
  title: `Administration`,
})

export const dynamic = 'force-dynamic'
export const revalidate = 0
const Page = async () => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ national: true })

  return (
    <div
      className={classNames(
        'fr-container fr-flex fr-direction-column',
        styles.pageContainer,
      )}
    >
      <Breadcrumb
        currentPageLabel="Administration"
        segments={[
          {
            label: "Page d'accueil",
            linkProps: {
              href: '/',
            },
          },
        ]}
      />
      <h3 className="fr-mb-6v fr-text-title--blue-france">Administration</h3>
      <WorkInProgressNotice />
      <div className={styles.metabaseContainer}>
        <iframe
          title="Statistiques d’utilisation du service"
          src="https://metabase.inclusion-numerique.anct.gouv.fr/public/dashboard/38891b8c-dc4e-4e56-a42c-af27865722e4"
          width="100%"
          height="100%"
          style={{
            overflow: 'hidden',
            overflowX: 'hidden',
            overflowY: 'hidden',
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
          }}
        />
      </div>
    </div>
  )
}

export default Page
