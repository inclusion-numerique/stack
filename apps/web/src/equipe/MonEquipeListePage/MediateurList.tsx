import Link from 'next/link'
import { MediateurListItem } from './MediateurListItem'

export type MediateurListProps = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  isConseillerNumerique: boolean
  status: string
  finDeContrat?: string
}

export const MediateurList = ({
  mediateurs,
  canSeeMediateursDetails,
  baseHref,
}: {
  mediateurs: MediateurListProps[]
  canSeeMediateursDetails?: boolean
  baseHref: string
}) => (
  <ul className="fr-list-group fr-border--top fr-my-0">
    {mediateurs.map((mediateur) =>
      canSeeMediateursDetails ? (
        <li
          className="fr-border--bottom fr-link--background-on-hover"
          key={mediateur.email}
        >
          <Link href={`${baseHref}/${mediateur.id}`}>
            <MediateurListItem {...mediateur} />
          </Link>
        </li>
      ) : (
        <li className="fr-border--bottom" key={mediateur.email}>
          <MediateurListItem {...mediateur} />
        </li>
      ),
    )}
  </ul>
)
