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
}: {
  mediateurs: MediateurListProps[]
}) => (
  <ul className="fr-list-group fr-border--top fr-my-0">
    {mediateurs.map((mediateur) => (
      <li
        className="fr-border--bottom fr-link--background-on-hover"
        key={mediateur.email}
      >
        <Link href={`mon-equipe/${mediateur.id}`}>
          <MediateurListItem {...mediateur} />
        </Link>
      </li>
    ))}
  </ul>
)
