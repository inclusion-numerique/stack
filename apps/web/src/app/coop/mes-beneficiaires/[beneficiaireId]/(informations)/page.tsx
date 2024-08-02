import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { prismaClient } from '@app/web/prismaClient'
import { notFound } from 'next/navigation'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import BeneficiairePageNavigationBar from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/BeneficiairePageNavigationBar'
import {
  beneficiaireCrasCounts,
  beneficiaireCrasCountSelect,
  countThematiques,
} from '@app/web/beneficiaire/beneficiaireQueries'

const BeneficiaireInformationsPage = async ({
  params: { beneficiaireId },
}: {
  params: { beneficiaireId: string }
}) => {
  const user = await getAuthenticatedMediateur()

  const beneficiaire = await prismaClient.beneficiaire.findUnique({
    where: {
      id: beneficiaireId,
      mediateurId: user.mediateur.id,
      suppression: null,
    },
    select: {
      id: true,
      prenom: true,
      nom: true,
      email: true,
      anneeNaissance: true,
      ...beneficiaireCrasCountSelect,
    },
  })
  if (!beneficiaire) {
    notFound()
    return null
  }

  const [
    thematiquesIndividuel,
    thematiquesAdministratif,
    thematiquesCollectif,
  ] = await Promise.all([
    prismaClient.craIndividuel.groupBy({
      by: 'thematiques',
    }),
  ])

  const { anneeNaissance } = beneficiaire
  const displayName = getBeneficiaireDisplayName(beneficiaire)
  const { totalCrasCount } = beneficiaireCrasCounts(beneficiaire)

  const countThematiquesResult = await countThematiques({ beneficiaireId })

  return (
    <>
      <BeneficiairePageNavigationBar
        beneficiaireId={beneficiaireId}
        accompagnementsCount={totalCrasCount}
        current="informations"
      />
      <div className="fr-border-radius--8 fr-border  fr-pt-8v fr-px-7v fr-pb-10v fr-mt-6v">
        <h2 className="fr-h6 fr-mb-1v">Thématiques d’accompagnements</h2>
        <p className="fr-text--xs fr-text-mention--grey">
          Retrouvez les thématiques d’accompagnements vues avec ce bénéficiaire.
        </p>
      </div>
    </>
  )
}

export default BeneficiaireInformationsPage
