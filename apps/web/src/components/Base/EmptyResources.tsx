import React from 'react'
import Link from 'next/link'
import { CreateResourceButton } from '../Resource/CreateResourceModal'
import EmptyBox from '../EmptyBox'

const EmptyResources = ({ isMember }: { isMember: boolean }) => (
  <EmptyBox
    title={
      isMember
        ? "Vous n'avez pas de ressources dans votre base."
        : `Aucune ressource n'est actuellement publiée sur cette base`
    }
  >
    {isMember ? (
      <>
        <div>
          Présentez, valorisez & publiez vos ressources afin qu’elles soient
          diffusées <br />
          auprès d’un large public.{' '}
          <Link href="/" className="fr-link wip">
            En savoir plus
          </Link>
        </div>
        <div data-testid="create-resource-button">
          <CreateResourceButton className="fr-mt-4w" />
        </div>
      </>
    ) : (
      'Revenez plus tard ou suivez cette base afin d’être tenu informé de ses prochaines publications.'
    )}
  </EmptyBox>
)

export default EmptyResources
