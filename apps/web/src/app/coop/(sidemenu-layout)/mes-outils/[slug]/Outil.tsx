import { ComingSoon } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/[slug]/_components/ComingSoon'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import BackButton from '@app/web/components/BackButton'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import React from 'react'
import { OutilPageData } from '../outilPageData'
import { Access } from './_components/Access'
import { Features } from './_components/Features'
import { Hero } from './_components/Hero'

export const Outil = ({
  notice,
  title,
  illustration,
  illustrationWidth,
  logo,
  description,
  website,
  features,
  access,
  accessComponent,
  more,
}: OutilPageData) => (
  <CoopPageContainer size={894}>
    <CoopBreadcrumbs
      parents={[
        { label: 'Mes outils', linkProps: { href: '/coop/mes-outils' } },
      ]}
      currentPage={title}
    />
    <SkipLinksPortal links={defaultSkipLinks} />
    <main id={contentId}>
      <BackButton href="/coop/mes-outils">Retour aux outils</BackButton>
      {notice ? <ComingSoon text={notice} /> : null}
      <Hero
        title={title}
        illustration={illustration}
        illustrationWidth={illustrationWidth}
        logo={logo}
        description={description}
        website={website}
      />
      <section className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-xl-7 fr-col-12">
          <div className="fr-border fr-border-radius--8 fr-p-4w fr-height-full">
            {features != null && <Features features={features} />}
          </div>
        </div>
        <div className="fr-col-xl-5 fr-col-12">
          <div className="fr-border fr-border-radius--8 fr-px-3w fr-py-4w fr-height-full">
            {accessComponent || (access ? <Access {...access} /> : null)}
          </div>
        </div>
        {!!more && <div className=" fr-col-12">{more}</div>}
      </section>
    </main>
  </CoopPageContainer>
)
