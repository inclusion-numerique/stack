import React from 'react'
import { redirect } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { prismaClient } from '@app/web/prismaClient'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import IconInSquare from '@app/web/components/IconInSquare'
import LieuxActiviteForm from './_components/LieuxActiviteForm'

const AjouterLieuPage = async () => {
  const user = await getAuthenticatedSessionUser()

  if (!user.mediateur || user.mediateur._count.enActivite === 0) {
    return redirect('/')
  }

  const lieuxActivite = await prismaClient.mediateurEnActivite.findMany({
    where: {
      mediateurId: user.mediateur.id,
      suppression: null,
    },
    select: {
      creation: true,
      modification: true,
      structure: {
        select: {
          id: true,
          nom: true,
          adresse: true,
          commune: true,
          codePostal: true,
          complementAdresse: true,
          siret: true,
          rna: true,
          visiblePourCartographieNationale: true,
          structureCartographieNationaleId: true,
          typologies: true,
        },
      },
    },
  })

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <main
        id={contentId}
        className="fr-container fr-container--narrow fr-mb-30v"
      >
        <Button
          priority="tertiary no outline"
          size="small"
          linkProps={{
            href: '/lieux-activite',
          }}
          className="fr-mt-12v fr-mb-10v"
          iconId="fr-icon-arrow-left-line"
        >
          Retour aux lieux d’activité
        </Button>
        <span className="fr-flex fr-direction-row fr-align-items-center fr-flex-gap-6v fr-mb-5w">
          <IconInSquare iconId="ri-home-office-line" />
          <h1 className="fr-page-title fr-m-0 fr-h2">
            Ajouter un lieu d’activité
          </h1>
        </span>
        <div className="fr-border fr-border-radius--8 fr-p-4w">
          <p className="fr-mb-6w">
            Rechercher dans les lieux déjà référencés. Si vous ne trouvez pas
            vos lieux, vous pouvez les créer afin d’être référencé.
          </p>
          <LieuxActiviteForm
            nextHref="/lieux-activite"
            createStructureHref="/lieux-activite/creer"
            defaultValues={{
              lieuxActivite: lieuxActivite.map(({ structure }) => structure),
              userId: user.id,
            }}
          />
        </div>
      </main>
    </>
  )
}

export default AjouterLieuPage
