import React from 'react'
import CustomTag, { TagColor } from '../../CustomTag'

const informations = {
  public: {
    label: 'Ressource publique',
    icon: 'fr-icon-earth-fill',
    color: TagColor.GREEN,
  },
  private: {
    label: 'Ressource privée',
    icon: 'fr-icon-lock-line',
    color: TagColor.GREY,
  },
}

const ResourcePublicStateBadge = ({
  isPublic,
  small,
}: {
  isPublic: boolean | null
  small?: boolean
}) => (
  <CustomTag
    {...(isPublic ? informations.public : informations.private)}
    small={small}
  />
)

export default ResourcePublicStateBadge
