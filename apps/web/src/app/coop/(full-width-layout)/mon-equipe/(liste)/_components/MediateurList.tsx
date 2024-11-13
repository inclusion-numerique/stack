import { MediateurListItem, MediateurListItemProps } from './MediateurListItem'

export const MediateurList = ({
  mediateurs,
}: {
  mediateurs: MediateurListItemProps[]
}) => (
  <ul className="fr-list-group fr-border--top fr-my-0">
    {mediateurs.map((mediateur) => (
      <li className="fr-border--bottom" key={mediateur.email}>
        <MediateurListItem {...mediateur} />
      </li>
    ))}
  </ul>
)
