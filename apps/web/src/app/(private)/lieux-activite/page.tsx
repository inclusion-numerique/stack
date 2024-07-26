import { redirect } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { LieuActivite } from './_components/LieuActivite'

const LieuActiviteListPage = async () => {
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
    <div className="fr-container fr-container--800 fr-mb-16w">
      <span className="fr-flex fr-flex-wrap fr-direction-row fr-align-items-center fr-flex-gap-4v fr-my-5w">
        <span
          className="ri-home-office-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-alt--blue-france fr-p-2w fr-m-0 fr-border-radius--8"
          aria-hidden
        />
        <h1 className="fr-h3 fr-page-title fr-m-0">
          Mes lieux d’activités · {user.mediateur._count.enActivite}
        </h1>
        <Button
          className="fr-ml-auto"
          priority="secondary"
          linkProps={{
            href: '/lieux-activite/ajouter',
          }}
          iconId="fr-icon-add-line"
        >
          Ajouter un lieu d’activité
        </Button>
      </span>

      <div className="fr-flex fr-direction-column fr-flex-gap-4v">
        {lieuxActivite.map((lieuActivite) => (
          <LieuActivite
            key={lieuActivite.structure.id}
            canDelete={lieuxActivite.length > 1}
            {...lieuActivite.structure}
            creation={lieuActivite.creation}
            modification={lieuActivite.modification}
          />
        ))}
      </div>
    </div>
  )
}

export default LieuActiviteListPage
