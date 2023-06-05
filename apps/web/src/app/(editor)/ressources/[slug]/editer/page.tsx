import { notFound, redirect } from 'next/navigation'
import React from 'react'
import classNames from 'classnames'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import Edition from '@app/web/components/Resource/Edition/Edition'
import { getResource } from '@app/web/server/resources/getResource'
import { getResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import styles from './ResourceEditionPage.module.css'

const ResourceEditionPage = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/ressources/${params.slug}/editer`)
  }

  const [resource, draftResource] = await Promise.all([
    getResource({ slug: decodeURI(params.slug) }),
    getResourceProjectionWithContext({ slug: decodeURI(params.slug) }),
  ])

  if (!resource || !draftResource) {
    notFound()
  }

  return (
    <>
      <div className={classNames('fr-container', styles.container)}>
        <Breadcrumbs
          currentPage={resource.title}
          parents={[
            { label: 'Ressources', linkProps: { href: '/ressources' } },
          ]}
        />
      </div>
      <Edition resource={resource} draftResource={draftResource} user={user} />
    </>
  )
}
export default ResourceEditionPage
